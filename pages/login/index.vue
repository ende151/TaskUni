<template>
  <view class="login-container">
    <view class="login-header">
      <image class="logo" src="/static/logo.png" mode="aspectFit" />
      <text class="title">外卖点餐</text>
    </view>

    <view class="login-form">
      <van-cell-group inset>
        <van-field
          v-model="loginForm.username"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
          v-model="loginForm.password"
          type="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
        />
      </van-cell-group>

      <view class="button-group">
        <van-button type="primary" block @click="handleLogin" :loading="loading">
          登录
        </van-button>
        <van-button type="default" block @click="handleRegister" plain>
          注册账号
        </van-button>
      </view>

      <view class="other-login">
        <text class="divider">其他登录方式</text>
        <view class="social-login">
          <van-icon name="wechat" size="28" color="#07c160" @click="handleWechatLogin" />
          <van-icon name="phone" size="28" color="#1989fa" @click="handlePhoneLogin" />
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { useUserStore } from '@/store/user';

const userStore = useUserStore();
const loading = ref(false);

const loginForm = reactive({
  username: '',
  password: ''
});

// 处理登录
const handleLogin = async () => {
  if (!loginForm.username || !loginForm.password) {
    // showToast('请填写完整登录信息');
    return;
  }

  loading.value = true;
  try {
    // 这里替换为实际的登录API调用
    const response = await mockLoginApi(loginForm);
    
    // 保存登录状态
    userStore.setToken(response.token);
    userStore.setUserInfo(response.userInfo);
    
    // showToast('登录成功');
    
    // 检查是否有待查看的商品
    const lastViewProduct = uni.getStorageSync('lastViewProduct');
    if (lastViewProduct) {
      uni.removeStorageSync('lastViewProduct');
      // 跳转到商品详情
      uni.redirectTo({
        url: `/pages/product/detail?id=${lastViewProduct}`
      });
    } else {
      // 返回上一页
      setTimeout(() => {
        uni.navigateBack();
      }, 1500);
    }
  } catch (error) {
    // showToast(error.message || '登录失败');
  } finally {
    loading.value = false;
  }
};

// 处理注册
const handleRegister = () => {
  uni.navigateTo({
    url: '/pages/register/index'
  });
};

// 处理微信登录
const handleWechatLogin = () => {
  // showToast('微信登录功能开发中');
};

// 处理手机号登录
const handlePhoneLogin = () => {
  uni.navigateTo({
    url: '/pages/login/phone'
  });
};

// 模拟登录API
const mockLoginApi = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: 'mock-token-' + Date.now(),
        userInfo: {
          userId: '12345',
          nickname: '测试用户',
          avatar: '/static/default-avatar.png'
        }
      });
    }, 1000);
  });
};
</script>

<style lang="scss" scoped>
.login-container {
  min-height: 100vh;
  background-color: #fff;
  padding: 40rpx;
}

.login-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  
  .logo {
    width: 80px;
    height: 80px;
  }
  
  .title {
    font-size: 24px;
    font-weight: bold;
    margin-top: 15px;
  }
}

.login-form {
  margin-top: 20px;
}

.button-group {
  margin-top: 20px;
  
  .van-button {
    margin-bottom: 12px;
  }
}

.other-login {
  margin-top: 40px;
  text-align: center;
  
  .divider {
    color: #999;
    font-size: 14px;
    position: relative;
    
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 60px;
      height: 1px;
      background-color: #eee;
    }
    
    &::before {
      left: -70px;
    }
    
    &::after {
      right: -70px;
    }
  }
  
  .social-login {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    gap: 40px;
  }
}
</style>
