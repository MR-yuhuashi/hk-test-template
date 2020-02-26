/**
 * oss登陆服务
 * 
 * 统一登陆文档地址：http://conf.ctripcorp.com/pages/viewpage.action?pageId=159191759
 */
import { parseQuery } from './url';
import { getCookie, setCookie, delCookie, setStorage, getStorage, delStorage } from './cookie';
import { encode, decode } from './encry';
import { getEnvCode, getSiteDemain, getProtocol } from './env';
import UUID from './uuid';

import axios from 'axios';
class OssAuth {
    constructor() {
        this._setLoginDemon();
    }

    oss = {
        prodDemon: 'https://cas.ctripcorp.com',
        uatDemon: 'https://cas.uat.qa.nt.ctripcorp.com',
        fwsDemon: 'https://cas.fat358.qa.nt.ctripcorp.com',
        cookie_client: 'principal_js',
        cookie_server: 'principal',
        keyStr: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/='
    }

    /**
     * 
     * @param {Object} config default config，{appId} appId为必填 
     */
    init(config = {}) {
        const { cookie_client, cookie_server } = this.oss;
        const { appId } = config;
        this.oss.appId = appId;
        const principalJs = getStorage(cookie_client) && getCookie(cookie_server);
        const { ticket } = parseQuery(window.location.href);
        /**从登陆跳回来的时候会携带ticket */
        if (!ticket && !principalJs) {
            this.login();
        }
        else if (ticket && !principalJs) {
            this.setUserInfo();
        }
        else {
            this.linkAuthToUserInfo();
        }
    }

    /**
     * 根据当前域名，设置auth认证的域名
     * setting the demon to certification  by current demon 
     */
    _setLoginDemon() {
        const { prodDemon, uatDemon, fwsDemon } = this.oss;
        const envCode = getEnvCode();
        if (envCode === 0) {
            this.oss.demon = fwsDemon;
        } else if (envCode === 2) {
            this.oss.demon = uatDemon;
        } else {
            this.oss.demon = prodDemon;
        }
    }

    /**
     * function to handle error
     */
    _errorHandle(err) {
        console.log('err:', err);
    }

    /**
    * get a new uuid ticket
    */
    _createUUIDticket() {
        return `${this.oss.appId}_${UUID.uuidv4()}`
    }

    /**
     * go login
     */
    async login() {
        const { demon, cookie_client, cookie_server } = this.oss;
        
        this.logoutSite();
        //清理cookie先
        delStorage(cookie_client);
        delCookie(cookie_server);
        await this._sleep();
        let service = this.getUrlWithoutTicket();
        const url = `${demon}/caso/login?service=${encodeURIComponent(service)}`;
        window.location.href = url;
    }

    /**
     * request for userinfo
     */
    async reqUserInfo() {
        const { demon } = this.oss;
        const { ticket } = parseQuery(window.location.href);
        const service = this.getUrlWithoutTicket();
        const url = `${demon}/caso/serviceValidate?ticket=${ticket}&service=${encodeURIComponent(service)}&response_type=JSON`;
        const data = await axios.get(url)
            .catch(err => {
                this._errorHandle(err);
                return null;
            })
        const { code, result } = data.data;

        if (code === 0) {
            return result;
        }
        else if (code === 40001) {
            this.login();
            return null;
        }
    }

    /**
     * log out
     */
    logout() {
        const { demon, cookie_client, cookie_server } = this.oss;

        //退出内部页面
        this.logoutSite();
        //清理cookie先
        delStorage(cookie_client);
        delCookie(cookie_server);
        this._sleep()
            .then(() => {
                const service = this.getUrlWithoutTicket();
                const url = `${demon}/caso/logout?service=${encodeURIComponent(service)}`
                window.location = url;
            })
    }

    logoutSite() {
        const envCode = getEnvCode();
        const siteDemon = getSiteDemain(envCode);
        const protocol = getProtocol();
        //退出内部页面
        const innerUrl = `${protocol}://${siteDemon}/logout`;
        const iframe = document.createElement('iframe');
        iframe.src = innerUrl;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
    }

    /**
     * setting local userInfo to cookie
     */
    async setUserInfo() {
        const { cookie_client, cookie_server, keyStr } = this.oss;
        let info = await this.reqUserInfo();

        if (!info || !info.employee) {
            return this.login();
        }
        const authVal = encode(keyStr, JSON.stringify(info));
        let uuid = this._createUUIDticket();
        setStorage(cookie_client, authVal);
        setCookie(cookie_server, uuid);
        this.linkAuthToUserInfo();
    }

    /**
     * get local userInfo from cookie
     *  */
    _getUserInfo(time = 0, callback) {
        const { cookie_client, cookie_server, keyStr } = this.oss;
        let clientAuth = getStorage(cookie_client);
        let serverAuth = getCookie(cookie_server)
        if (time > 8) {
            return this.login();
        }
        if (!clientAuth || !serverAuth) {
            return setTimeout(() => {
                this._getUserInfo(time + 1, callback)
            }, 500)
        }
        callback && callback(JSON.parse(decode(keyStr, clientAuth)) || {});
    }

    getUserInfo() {
        return new Promise(resolve => {
            this._getUserInfo(0, (userInfo) => {
                return resolve(userInfo);
            })
        })
    }

    /**
     * get the complete location without ticket
     *  */
    getUrlWithoutTicket() {
        let service = window.location.href;
        const idx = window.location.href.lastIndexOf('?');
        if (idx > 0) {
            service = window.location.href.substr(0, idx);
            let params = parseQuery(window.location.href);
            let paramArr = [];
            for (let key in params) {
                if (key !== 'ticket') {
                    paramArr.push(key + '=' + params[key]);
                }
            }
            if (paramArr.length > 0) {
                service += '?' + paramArr.join('&');
            }
        }

        return service;
    }

    /**
     * link auth ticket in cookie to server userinfo
     */
    async linkAuthToUserInfo() {
        const { demon, cookie_client, cookie_server, keyStr } = this.oss;
        let uuid = getCookie(cookie_server);
        let info = decode(keyStr, getStorage(cookie_client));
        const url = `${demon}/caso/client/principal`;
        await axios.post(url, { id: uuid, principal: info, expire: 60 * 60 * 24 * 30 })
        this.addWatermark();
    }

    /**
     * add watermark
     */
    addWatermark() {
        var script = document.createElement('script');
        script.src = "//webresint.sh.ctriptravel.com/ares2/infosec/ifs/*/default/lab.min.js?expires=1s"
        document.getElementsByTagName('head')[0].appendChild(script)
    }

    _sleep(time = 200) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
            }, time);
        })
    }
}

export default new OssAuth();