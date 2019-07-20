import vue from 'vue';
import { Message } from 'element-ui';
import VueResource from 'vue-resource';
if(!vue.http){
    vue.use(VueResource);
}

const defaultErr = '接口发生错误';
export function httpGet(url, options = {}) {
    const { params, showErr = true} = options;
    delete options.showErr;
    delete options.cache;
    // 兼容get请求不传params字段参数
    options = params
        ? {
            ...options
        } : {
            params: {
                ...options
            }
        };
    return new Promise((resolve, reject) => {
        vue.http.get(url, options).then(({ body }) => {
            const { code, message, data } = body;
            if (code === 0) {
                resolve(data);
            } else {
                if (showErr) Message.error(message || defaultErr);
                reject(body);
            }
        }, (err) => {
            if (showErr) Message.error((err.body && err.body.message) || defaultErr);
            reject(defaultErr);
        });
    });
}