<template>
  <view class="user-center">
    <view class="user-container">
      <view class="menu-item">
        <view class="avatar">
          <img
            round
            width="50"
            height="50"
            src="/static/images/avatar.png"
          />
        </view>
        <view>个人信息</view>
      </view>
    </view>

    <view class="user-container">
      <view class="menu-item">我的服务</view>
      <view class="menu-item">
        <view class="grid">
          <view class="grid-item">
            <view class="icon pending-payment"></view>
            <view>待付款</view>
          </view>
          <view class="grid-item">
            <view class="icon records"></view>
            <view>待收货</view>
          </view>
          <view class="grid-item">
            <view class="icon todo-list"></view>
            <view>待评价</view>
          </view>
        </view>
      </view>
    </view>

    <view class="user-container">
      <view class="menu-item">我的订单</view>
      <view class="menu-item">我的收藏</view>
      <view class="menu-item">收货地址</view>
      <view class="menu-item">客户服务</view>
    </view>

    <button type="danger" block @click="logout">退出登录</button>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '@/store/user';
import { myCenter } from '@/api/user';

// const userStore = useUserStore();

const logout = () => {
  // 实现退出登录逻辑
  console.log('退出登录');
};
</script>

<style>
.user-container {
  padding: 30rpx;
}
.avatar {
  width: 120rpx;
  height: 120rpx;
  border-radius: 60rpx;
}
.menu-item {
  padding: 20rpx;
  margin-bottom: 20rpx;
}
.grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.grid-item {
  width: 30%;
  text-align: center;
}
.icon {
  width: 40rpx;
  height: 40rpx;
  margin: 0 auto;
}

</style>