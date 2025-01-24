// env.js
const ENV_CONFIG = {
    development: {
        baseUrl: '/cooked-recommend',
        imgURL: '/img-server'
    },
    production: {
        baseUrl: 'http://120.46.149.115:9999/cooked-recommend',
        imgURL: 'http://120.46.149.116:8080/IMG-server'
    }
}

// 获取运行环境
export const getEnvConfig = () => {
    // #ifdef H5
    return process.env.NODE_ENV === 'development' ? ENV_CONFIG.development : ENV_CONFIG.production;
    // #endif

    // #ifdef MP-WEIXIN
    return ENV_CONFIG.production;
    // #endif

    return ENV_CONFIG.production;
}

export default ENV_CONFIG;
