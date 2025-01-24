import { get, post, put, del } from '@/request';

// 个人中心
export const myCenter = (params) => {
    return get('/my/myCenter', { params });
};
