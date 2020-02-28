import axios from 'axios';

export default class BaseModel {
    timeout = 5 * 1000;

    cancelToken = null;

    /** error handle function */
    _handleError(errors = {}) {
        console.log(errors);
        // const { errMsg, errNo, params } = errors;
        //错误统一处理
    }

    /**
   * cancel
   */
    cancel() {
        if (typeof this.cancelToken === 'function') {
            this.cancelToken('cancel request by bussiness code');
        }
    }


    /** request body */
    async fetch(method, params) {
        const _params = {
            method,
            url: this.url,
            data: params,
            timeout: this.timeout || 5 * 1000,
            cancelToken: new axios.CancelToken((c) => {
                this.cancelToken = c;
            })
        };
        return axios(_params).then((res) => {
            return res.data;
        }).catch(err => {
            const { data, status } = err.response;
            return {
                errMsg: data,
                errStatus: status
            };
        });

        // return axios(_params)
        //     .then((res) => {
        //         const { data, data: { resultCode, resultMsg } } = res;
        //         if (resultCode === 0) {
        //             console.log('data', data);
        //             return Promise.resolve(data);
        //         }
        //         return Promise.reject({ errNo: resultCode, errMsg: resultMsg, params: _params });
        //     })
        //     .catch((res) => {
        //         const { status, statusText } = res;
        //         this._handleError({ errNo: status, errMsg: statusText, params: _params });
        //         return Promise.resolve();
        //     });
    }

    /**
     * get
     * @param {Object} params
     */
    async get(params) {
        return this.fetch('get', params);
    }

    /**
     * post
     * @param {Object} params
     */
    async post(params) {
        return this.fetch('post', params);
    }
}
