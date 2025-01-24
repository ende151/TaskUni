<template>
  <view class="message-container">
    <up-input v-model.trim="inputValue" placeholder="请输入搜索项">
      <template #suffix>
        <up-icon name="camera" color="#909399" size="28" @click="clickIcon"></up-icon>
      </template>
    </up-input>
    <up-list @scrolltolower="scrolltolower">
      <up-list-item v-for="(item, index) in indexList" :key="index">
        <up-cell :title="`列表长度-${index + 1}`">
          <template #icon>
            <up-avatar shape="square" size="35" :src="item.url" customStyle="margin: -3px 5px -3px 0"></up-avatar>
          </template>
        </up-cell>
      </up-list-item>
    </up-list>

  </view>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { onLoad, onShow } from '@dcloudio/uni-app';

const inputValue = ref('');

const indexList = ref([]);
const urls = [
  'https://uview-plus.jiangruyi.com/album/1.jpg',
  'https://uview-plus.jiangruyi.com/album/2.jpg',
  'https://uview-plus.jiangruyi.com/album/3.jpg',
  'https://uview-plus.jiangruyi.com/album/4.jpg',
  'https://uview-plus.jiangruyi.com/album/5.jpg',
  'https://uview-plus.jiangruyi.com/album/6.jpg',
  'https://uview-plus.jiangruyi.com/album/7.jpg',
  'https://uview-plus.jiangruyi.com/album/8.jpg',
  'https://uview-plus.jiangruyi.com/album/9.jpg',
  'https://uview-plus.jiangruyi.com/album/10.jpg',
];

// 滚动的时候  触发插入数组操作
const scrolltolower = () => {
  loadmore();
};
const loadmore = () => {
  for (let i = 0; i < 30; i++) {
    indexList.value.push({
      url: urls[Math.floor(Math.random() * urls.length)],
    });
  }
};
// 点击icon
const clickIcon = () => {
  console.log('clickIcon 正确的点击了icon 按钮， 并且输出了输入框的值', inputValue.value);
  uni.chooseImage({
    count: 6, //默认9
    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album'], //从相册选择
    success: function (res) {
      console.log('选择照片', JSON.stringify(res.tempFilePaths));
    }
  });
};

onLoad(() => {
  loadmore();
});

</script>

<style scoped>
.message-container {
  padding: 20rpx;
}
</style>
