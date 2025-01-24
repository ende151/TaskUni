<template>
  <div class="shopping-cart">
    <van-empty v-if="cartItems.length === 0" description="购物车是空的">
      <van-button round type="danger" to="/">去逛逛</van-button>
    </van-empty>
    <template v-else>
      <van-checkbox-group v-model="checkedItems" @change="onCheckboxChange">
        <van-swipe-cell v-for="item in cartItems" :key="item.id">
          <van-card :price="item.price.toFixed(2)" :title="item.title" :thumb="item.image">
            <template #num>
              <van-stepper v-model="item.quantity" @change="updateTotal" />
            </template>
            <template #checkbox>
              <van-checkbox :name="item.id" />
            </template>
          </van-card>
          <template #right>
            <van-button square text="删除" type="danger" class="delete-button" @click="removeItem(item.id)" />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>
      
      <!-- 为啥页面中不显示 actionbar 组件呢 -->
      <div class="custom-action-bar">
        <div class="custom-action-bar-icon" @click="onClickChat">
          <img src="/static/images/chat-icon.png" alt="客服">
          <span>客服</span>
        </div>
        <div class="custom-action-bar-icon" @click="onClickCart">
          <img src="/static/images/cart-icon.png" alt="购物车">
          <span>购物车</span>
        </div>
        <button class="custom-action-bar-button" type="warning" @click="onAddToCart">加入购物车</button>
        <button class="custom-action-bar-button" type="danger" @click="onBuyNow">立即购买</button>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { myshopCart } from '@/api/shopping';

const cartItems = ref([
  { id: 1, title: '商品1', price: 10, quantity: 1, image: '/static/images/products/product1.png' },
  { id: 2, title: '商品2', price: 20, quantity: 2, image: '/static/images/products/product2.png' },
]);

const checkedItems = ref([]);

const allChecked = computed({
  get: () => checkedItems.value.length === cartItems.value.length,
  set: (value) => {
    checkedItems.value = value ? cartItems.value.map(item => item.id) : [];
  }
});

const totalPrice = computed(() => {
  return checkedItems.value.reduce((total, id) => {
    const item = cartItems.value.find(item => item.id === id);
    return total + (item ? item.price * item.quantity : 0);
  }, 0);
});

const onCheckboxChange = () => {
  // 可以在这里添加复选框变化时的逻辑
};

const updateTotal = () => {
  // 可以在这里添加更新总价的逻辑
};

const removeItem = (id) => {
  cartItems.value = cartItems.value.filter(item => item.id !== id);
  checkedItems.value = checkedItems.value.filter(itemId => itemId !== id);
};

const toggleAll = (checked) => {
  allChecked.value = checked;
};

const onSubmit = () => {
  uni.showToast({
    title: '提交订单',
    icon: 'success'
  });
};

const onClickChat = () => {
  // 可以在这里添加点击客服按钮的逻辑
};

const onClickCart = () => {
  // 可以在这里添加点击购物车按钮的逻辑
};

const onAddToCart = () => {
  // 可以在这里添加点击加入购物车按钮的逻辑
};

const onBuyNow = () => {
  // 可以在这里添加点击立即购买按钮的逻辑
};
</script>

<style>
.shopping-cart {
  padding-bottom: 100rpx;
  width: 100%;
  height: 100vh;
}

.delete-button {
  height: 100%;
}

.custom-action-bar {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px;
  border-top: 1px solid #ccc;
}

.custom-action-bar-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.custom-action-bar-icon img {
  width: 20px;
  height: 20px;
}

.custom-action-bar-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: #ff9900;
  color: #fff;
  cursor: pointer;
}

.custom-action-bar-button[type="danger"] {
  background-color: #ff3737;
}
</style>