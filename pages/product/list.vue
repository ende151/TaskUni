<template>
  <view class="product-list">
    <van-search
      v-model="searchValue"
      placeholder="请输入搜索关键词"
      @search="onSearch"
    />
    
    <!-- 商品列表 -->
    <view class="products-grid">
      <view 
        class="product-card" 
        v-for="product in products" 
        :key="product.id"
        @click="handleProductClick(product)"
      >
        <van-image
          width="100%"
          height="200"
          :src="product.image"
          radius="8"
        />
        <view class="product-info">
          <text class="product-name">{{ product.name }}</text>
          <text class="product-desc">{{ product.description }}</text>
          <view class="product-bottom">
            <text class="product-price">¥{{ product.price }}</text>
            <van-button size="small" type="primary" @click.stop="handleProductClick(product)">
              查看详情
            </van-button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
const searchValue = ref('');
const products = ref([
  {
    id: 1,
    name: '美味汉堡',
    description: '新鲜制作，美味可口',
    price: 20.00,
    image: '/static/images/products/product1.png'
  },
  {
    id: 2,
    name: '炸鸡套餐',
    description: '香脆可口，份量十足',
    price: 30.00,
    image: '/static/images/products/product2.png'
  },
  // 更多商品...
]);

const handleProductClick = (product) => {
  // 检查是否登录
  if (!userStore.isLoggedIn) {
    // 保存当前要查看的商品ID，以便登录后跳转
    uni.setStorageSync('lastViewProduct', product.id);
    // 跳转到登录页
    uni.navigateTo({
      url: '/pages/login/index'
    });
    return;
  }
  
  // 已登录，直接跳转到商品详情
  uni.navigateTo({
    url: `/pages/product/detail?id=${product.id}`
  });
};

const onSearch = (value) => {
  console.log('搜索:', value);
  // 实现搜索逻辑
};
</script>

<style lang="scss" scoped>
.product-list {
  padding: 20rpx;
}

.products-grid {
  padding: 12px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 12px;
}

.product-card {
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.product-info {
  padding: 8px;
  
  .product-name {
    font-size: 16px;
    font-weight: bold;
    display: block;
    margin-bottom: 4px;
  }
  
  .product-desc {
    font-size: 14px;
    color: #999;
    display: block;
    margin-bottom: 8px;
  }
  
  .product-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    .product-price {
      color: #f44;
      font-size: 16px;
      font-weight: bold;
    }
  }
}

.product-item {
  margin-bottom: 20rpx;
  border-radius: 16rpx;
}

.product-image {
  width: 200rpx;
  height: 200rpx;
}
</style>
