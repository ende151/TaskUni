import { base, img } from '@/request';

// 首页分类
export const homeGoodsClass = () => {
    return base.get('/goodsRecom/homeGoodsClass');
};

// 首页推荐 - 修改请求路径和参数
export const homeGoodsRecomReq = (params) => {
    return base.get('/goodsRecom/homeGoodsRecomReq', params);
};

// 优选商品
export const goodsRecom = (params) => {
    return base.get('/goodsPrefer/goodsRecom', params);
};

// 首页搜索
export const homeSearch = (params) => {
    return base.get('/search/homeSearch', params);
};

// 使用图片服务
export const uploadImage = (data) => {
    return img.post('/upload', data);
};