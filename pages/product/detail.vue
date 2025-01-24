<template>
  <view class="product-detail">
    <!-- 商品图片轮播 -->
    <swiper class="product-swiper" :indicator-dots="true" :autoplay="true">
      <swiper-item v-for="(image, index) in product.images" :key="index">
        <van-image width="100%" height="300" :src="image" />
      </swiper-item>
    </swiper>
    
    <!-- 商品信息 -->
    <view class="product-info">
      <text class="product-name">{{ product.name }}</text>
      <text class="product-price">¥{{ product.price }}</text>
      <text class="product-desc">{{ product.description }}</text>
    </view>
    
    <!-- 商品详情 -->
    <view class="product-content">
      <van-tabs v-model:active="activeTab">
        <van-tab title="商品详情">
          <rich-text :nodes="product.detail"></rich-text>
        </van-tab>
        <van-tab title="规格参数">
          <van-cell-group>
            <van-cell 
              v-for="(spec, index) in product.specifications" 
              :key="index"
              :title="spec.name"
              :value="spec.value"
            />
          </van-cell-group>
        </van-tab>
      </van-tabs>
    </view>
    
    <!-- 底部操作栏 -->
    <view class="bottom-bar">
      <view class="left-buttons">
        <van-button icon="shop-o" size="small" @click="handleShopClick">店铺</van-button>
        <van-button icon="cart-o" size="small" @click="handleCartClick">购物车</van-button>
      </view>
      <view class="right-buttons">
        <van-button type="warning" size="small" @click="handleAddToCart">加入购物车</van-button>
        <van-button type="danger" size="small" @click="handleBuyNow">立即购买</van-button>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const activeTab = ref(0);
const product = ref({
  id: 0,
  name: '',
  price: 0,
  description: '',
  images: [],
  detail: '',
  specifications: []
});

// 模拟获取商品详情
const fetchProductDetail = (id) => {
  // 模拟API调用
  product.value = {
    id: id,
    name: '美味汉堡',
    price: 20.00,
    description: '新鲜制作，美味可口',
    images: [
      '/static/images/products/product1.png',
      '/static/images/products/product2.png'
    ],
    detail: '<div>商品详细介绍...</div>',
    specifications: [
      { name: '规格', value: '标准份' },
      { name: '包装', value: '精美包装' }
    ]
  };
};

onMounted(() => {
  // 获取路由参数中的商品ID
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const id = currentPage.options.id;
  
  fetchProductDetail(id);
});

const handleShopClick = () => {
  console.log('跳转到店铺');
};

const handleCartClick = () => {
  uni.switchTab({
    url: '/pages/shopping/index'
  });
};

const handleAddToCart = () => {
  console.log('已加入购物车');
};

const handleBuyNow = () => {
  console.log('准备购买');
};
</script>

<style lang="scss" scoped>
.product-detail {
  padding: 20rpx;
}

.product-swiper {
  height: 300px;
}

.product-info {
  background: #fff;
  padding: 15px;
  margin-bottom: 10px;
  
  .product-name {
    font-size: 18px;
    font-weight: bold;
    display: block;
    margin-bottom: 8px;
  }
  
  .product-price {
    color: #f44;
    font-size: 20px;
    font-weight: bold;
    display: block;
    margin-bottom: 8px;
  }
  
  .product-desc {
    font-size: 14px;
    color: #666;
  }
}

.product-content {
  background: #fff;
  padding: 15px;
}

.bottom-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  box-shadow: 0 -2px 4px rgba(0, 0, 0, 0.1);
  
  .left-buttons {
    display: flex;
    gap: 10px;
  }
  
  .right-buttons {
    display: flex;
    gap: 10px;
  }
}
</style>
