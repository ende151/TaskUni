<template>
  <view class="container">
    <up-tabs
      :list="excellentList"
      @click="clickExcellent"
      :lineColor="$uni-color-primary"
      :activeStyle="{
        color: '#303133',
        fontWeight: 'bold',
        transform: 'scale(1.05)',
      }"
      :inactiveStyle="{ color: '#606266', transform: 'scale(1)' }"
    ></up-tabs>

    <swiper :indicator-dots="true" class="swiper" v-if="activeIndex == 0">
      <swiper-item v-for="(swiperItems, swiperIndex) in 3" :key="swiperIndex">
        <up-grid :border="true">
          <up-grid-item
            :customStyle="{ width: 220 + 'rpx', height: 220 + 'rpx' }"
            v-for="(item, index) in swiperList"
            :index="index + (swiperIndex * 9)"
            :key="index"
          >
            <up-icon
              :customStyle="{ paddingTop: 20 + 'rpx' }"
              :name="item"
              :size="22"
            ></up-icon>
            <text class="grid-text">{{ "宫格" + (index + 1) }}</text>
          </up-grid-item>
        </up-grid>
      </swiper-item>
    </swiper>
    
  </view>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";

const excellentList = ref([
  { name: "发现" },
  { name: "新品", badge: { isDot: true } },
  { name: "新鲜度", badge: { isDot: true } },
  { name: "社区", badge: { value: 5 } },
]);
const activeIndex = ref(0);
const clickExcellent = (e) => {
  console.log(e);
  activeIndex.value = e.index;
};

// 如果是发现这个tab
// 创建响应式数据  
const swiperList = ref([{
  name: '发现',
  icon: 'integral',
  src: 'https://img.yzcdn.cn/vant/cat.jpg'
},
{
  name: '新品',
  icon: 'kefu-ermai',
  src: 'https://img.yzcdn.cn/vant/cat.jpg'
},
]);  



onShow(() => {
});

onMounted(() => {});
</script>

<style lang="scss" scoped>
.container {
  min-height: 100vh;
  background-color: #f7f8fa;
}
.swiper {
        height: 720rpx;
    }

    .grid-text {
        font-size: 14px;
        color: #909399;
        padding: 10rpx 0 20rpx 0rpx;
        /* #ifndef APP-PLUS */
        box-sizing: border-box;
        /* #endif */
    }
</style>
