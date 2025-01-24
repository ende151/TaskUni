import { getEnvConfig } from '@/env.js';

const { baseUrl, imgURL } = getEnvConfig();

// 创建请求实例
const createRequest = (baseURL) => {
  return (options = {}) => {
    return new Promise((resolve, reject) => {
      let requestUrl = `${baseURL}${options.url}`;

      // 添加请求拦截
      const header = {
        'Content-Type': 'application/json',
        ...options.header
      };

      // #ifdef H5
      // H5环境下使用代理地址
      // if (process.env.NODE_ENV === 'development') {
      //   // 如果是基础服务,使用 /cooked-recommend 代理
      //   if (baseURL === baseUrl) {
      //     requestUrl = `/cooked-recommend${options.url}`;
      //   }
      //   // 如果是图片服务,使用 /img-server 代理 
      //   if (baseURL === imgURL) {
      //     requestUrl = `/img-server${options.url}`;
      //   }
      //   header['X-Requested-With'] = 'XMLHttpRequest';
      // }
      // #endif

      // console.log('发送请求:', {
      //   url: requestUrl,
      //   method: options.method,
      //   data: options.data,
      //   header
      // });

      uni.request({
        url: requestUrl,
        method: options.method || 'GET',
        data: options.data || {},
        header,
        success: (res) => {
          // console.log('请求响应:', res);
          // 处理 500 错误
          if (res.statusCode === 500) {
            console.error('服务器错误:', res.data);
            reject(new Error(res.data?.message || '服务器内部错误'));
            return;
          }
          if (res.statusCode >= 200 && res.statusCode < 300) {
            resolve(res.data);
          } else {
            reject(new Error(`请求失败，状态码：${res.statusCode}`));
          }
        },
        fail: (err) => {
          console.error('请求失败:', requestUrl, err);
          reject(new Error(err.errMsg || '网络请求失败'));
        }
      });
    });
  };
};

// 创建服务实例
const baseRequest = createRequest(baseUrl);
const imgRequest = createRequest(imgURL);

// 基础服务的请求方法
export const base = {
  get: (url, data = {}) => baseRequest({ url, method: 'GET', data }),
  post: (url, data = {}) => baseRequest({ url, method: 'POST', data }),
  put: (url, data = {}) => baseRequest({ url, method: 'PUT', data }),
  del: (url, data = {}) => baseRequest({ url, method: 'DELETE', data })
};

// 图片服务的请求方法
export const img = {
  get: (url, data = {}) => imgRequest({ url, method: 'GET', data }),
  post: (url, data = {}) => imgRequest({ url, method: 'POST', data }),
  put: (url, data = {}) => imgRequest({ url, method: 'PUT', data }),
  del: (url, data = {}) => imgRequest({ url, method: 'DELETE', data })
};