/**
 * create uuid 
 * github https://github.com/kelektiv/node-uuid
 * author zhanleiwu
 */
import uuidv1 from 'uuid/v1';
import uuidv4 from 'uuid/v4';

class UUID {

    /**
     * create version 1 uuid
     */
    static uuidv1() {
        return uuidv1();
    }

    /**
     * create version 4 uuid
     */
    static uuidv4() {
        return uuidv4();
    }

}

export default UUID;