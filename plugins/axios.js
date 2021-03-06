import Axios from 'axios';
import { Message } from 'element-ui';
const instance = new Axios.create({
    baseURL: process.env.baseUrl
});

instance.interceptors.response.use(
    response => {
        if (response.status >= 200 && response.status < 300) {
            if (response.data.status === 0) {
                Message({
                    type: `success`,
                    message: response.data.data.message
                });
                return response.data;
            } else {
                Message({
                    type: `error`,
                    message: response.data.message
                });
                return Promise.reject(response.data);
            }
        } else {
            Message({
                type: `warning`,
                message: `服务器抛出错误`
            });
        }
    },
    error => {
        if (error && error.response) {
            switch (error.response.status) {
                case 502:
                    Message({
                        type: `error`,
                        message: `网关错误`
                    });
                    break;
                case 500:
                    Message({
                        type: `error`,
                        message: `接口错误`
                    });
                    break;
                case 404:
                    Message({
                        type: `error`,
                        message: `接口不存在`
                    });
                    break;
                case 403:
                    Message({
                        type: `error`,
                        message: `权限不足`
                    });
                    break;
                case 400:
                    Message({
                        type: `error`,
                        message: `请求体错误`
                    });
                    break;
                case 401:
                    Message({
                        type: `error`,
                        message: `登陆信息过期`
                    });
                    break;
                default:
                    break;
            }
        } else {
            Message({
                type: `error`,
                message: `其他错误`
            });
        }
        return error;
    }
);

export const getFetch = async (url, params = {}, headers = {}) => {
    return await instance.get(url, { params, headers });
};

export const postFetch = async (url, data = {}) => {
    return await instance.post(url, data);
};

export const putFetch = async (url, data = {}, headers = {}) => {
    return await instance.put(url, data, headers);
};

export const patchFetch = async (url, data = {}, headers = {}) => {
    return await instance.patch(url, data, headers);
};

export const deleteFetch = async (url, params = {}, headers = {}) => {
    return await instance.delete(url, { params, headers });
};
