import axios from "axios";
import qs from "qs";
import {Message} from "element-ui";
import router from "../router/index";

var instance = axios.create({
    baseURL: 'http://zhimma.ma:8080/api',
    timeout: 5000,
    responseType: "json",
    withCredentials: true, // 是否允许带cookie这些
    headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
    }
});

instance.interceptors.request.use(
    config => {
        // 在发送请求之前做某件事
        if (
            config.method === "post"
        ) {
            // 序列化
            config.data = qs.stringify(config.data);
            // 温馨提示,若是贵公司的提交能直接接受json 格式,可以不用 qs 来序列化的
        }

        // 若是有做鉴权token , 就给头部带上token
        // 若是需要跨站点,存放到 cookie 会好一点,限制也没那么多,有些浏览环境限制了 localstorage 的使用
        if (localStorage.token) {
            config.headers.Authorization = localStorage.token;
        }
        return config;
    },
    error => {
        // error 的回调信息,看贵公司的定义
        Message({
            //  饿了么的消息弹窗组件,类似toast
            showClose: true,
            message: error,
            type: "error.data.error.message"
        });
        return Promise.reject(error.data.error.message);
    }
);

//返回状态判断(添加响应拦截器)
instance.interceptors.response.use(
    res => {
        //对响应数据做些事
        if (res.data && !res.data.success) {
            Message({
                //  饿了么的消息弹窗组件,类似toast
                showClose: true,
                message: res.data.error.message.message
                    ? res.data.error.message.message
                    : res.data.error.message,
                type: "error"
            });
            return Promise.reject(res.data.error.message);
        }
        return res;
    },
    error => {
        // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
        // 直接丢localStorage或者sessionStorage
        if (!window.localStorage.getItem("loginUserBaseInfo")) {
            // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
            router.push({
                path: "/login"
            });
        } else {
            // 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
            // 乖乖的返回去登录页重新登录
            let lifeTime =
                JSON.parse(window.localStorage.getItem("loginUserBaseInfo")).lifeTime *
                1000;
            let nowTime = new Date().getTime(); // 当前时间的时间戳
            console.log(nowTime, lifeTime);
            console.log(nowTime > lifeTime);
            if (nowTime > lifeTime) {
                Message({
                    showClose: true,
                    message: "登录状态信息过期,请重新登录",
                    type: "error"
                });
                router.push({
                    path: "/login"
                });
            } else {
                // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
                if (error.response.status === 403) {
                    router.push({
                        path: "/error/403"
                    });
                }
                if (error.response.status === 500) {
                    router.push({
                        path: "/error/500"
                    });
                }
                if (error.response.status === 502) {
                    router.push({
                        path: "/error/502"
                    });
                }
                if (error.response.status === 404) {
                    router.push({
                        path: "/error/404"
                    });
                }
            }
        }
        // 返回 response 里的错误信息
        let errorInfo = error.data.error ? error.data.error.message : error.data;
        return Promise.reject(errorInfo);
    }
);
/*
/!**
 * get 请求方法
 * @param url
 * @param params
 * @returns {Promise}
 *!/
export function get(url, params = {}) {
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: params
        })
            .then(response => {
                resolve(response.data);
            })
            .catch(err => {
                reject(err)
            })
    })
}
/!**
 * post 请求方法
 * @param url
 * @param data
 * @returns {Promise}
 *!/
export function post(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
    })
}

/!**
 * patch 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 *!/
export function patch(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.patch(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
    })
}

/!**
 * put 方法封装
 * @param url
 * @param data
 * @returns {Promise}
 *!/
export function put(url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.put(url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            })
    })
}*/

// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
export default {
    install: function (Vue, Option) {
        Object.defineProperty(Vue.prototype, "$http", {value: instance });
    }
};

