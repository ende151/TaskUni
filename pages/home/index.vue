<script setup>
import { ref, onMounted, nextTick } from "vue";
import { onLoad, onShow } from "@dcloudio/uni-app";
import { homeGoodsClass, homeSearch, homeGoodsRecomReq } from "@/api/home";

const inputValue = ref("");
// 搜索
const clickIcon = async () => {
  const res = await homeSearch(inputValue.value);
  inputValue.value = "";
};
// tabs 标签
const homeTabsList = ref([]);
const getGoodsClass = async () => {
  try {
    const res = await homeGoodsClass();
    homeTabsList.value = res.data.map((item) => {
      return {
        name: item.cnameType,
        nameType: item.nameType,
        id: item.id,
      };
    });
    getTabsItemDataList(homeTabsList.value[0]);
  } catch (error) {
    console.error("获取商品分类失败:", error);
  }
};
const activeTab = ref(0);
const clickHomeTabs = (e, index) => {
  activeTab.value = e.index;
  getTabsItemDataList(e.index);
};
// 每个tab的商品数据
const tabsItemDataList = ref([]);
const tabsItemQueryParams = ref({
  current: 1,
  size: 10,
  total: 0,
});
const getTabsItemDataList = async (e) => {
  try {
    const res = await homeGoodsRecomReq();
      if (res.data.current === 1) {
        tabsItemDataList.value = res.data.records.map((item) => {
          return {
            ...item,
            src: "https://cdn.uviewui.com/uview/album/1.jpg",
          };
        });
      } else {
        tabsItemDataList.value = [
          ...tabsItemDataList.value,
          ...res.data.records.map((item) => {
            return {
              ...item,
              src: "https://cdn.uviewui.com/uview/album/1.jpg",
            };
          }),
        ];
      }
    tabsItemQueryParams.value.total = res.data.total;
    tabsItemQueryParams.value.current = res.data.current;
    tabsItemQueryParams.value.size = res.data.size;
    console.log("tabsItemDataList", tabsItemDataList.value);
  } catch (error) {
    console.error("获取商品分类失败:", error);
  }
};
// 获取商品数据
const clickBuy = async () => {
  try {
    // 调用加入购物车接口
    const res = await addToCart();
    if (res.code === 200) {
      uni.showToast({
        title: "加入购物车成功",
        icon: "success",
      });
    } else {
      uni.showToast({
        title: "加入购物车失败",
        icon: "error",
      });
    }
  } catch (error) {
    console.error("加入购物车失败:", error);
    uni.showToast({
      title: "加入购物车失败",
      icon: "error",
    });
  }
};
// 瀑布流数据加载
const tabsItemDataListRef = ref(null);

onMounted(() => {
  getGoodsClass();
});
</script>
<template>
  <view class="status-bar">
    <!-- 这里是状态栏 -->
  </view>
  <up-search
    v-model.trim="inputValue"
    :show-action="true"
    actionText="搜索"
    :animation="true"
    @search="clickIcon"
    @custom="clickIcon"
  ></up-search>

  <view class="container">
    <up-tabs
      :current="activeTab"
      :list="homeTabsList"
      @click="clickHomeTabs($event, $event.index)"
      :lineColor="$uni - color - primary"
      :activeStyle="{
        color: '#303133',
        fontWeight: 'bold',
        transform: 'scale(1.05)',
      }"
      :inactiveStyle="{ color: '#606266', transform: 'scale(1)' }"
    ></up-tabs>
  </view>
  <view class="waterfall-container wrap">
    <!-- 自己写的 -->
    <view
      class="tabs-item"
      v-for="(item, index) in tabsItemDataList"
      :key="index"
    >
      <view class="tabs-item-img">
        <img :src="item.src" alt="" v-if="item.src" />
      </view>
      <view class="tabs-item-name">
        <text>{{ item.name }}</text>
      </view>
      <view class="tabs-item-price">
        <view style="flex: 1;">￥: {{ item.price }}</view>
        <view style="display: flex; justify-content: flex-end; ">
          <view style="font-size: 24rpx; color: #999;">销量:{{ item.sales || 100 }} &nbsp;</view>
          <view style="font-size: 24rpx; color: #999;">好评:{{ item.sales || 100 }}</view>
        </view>
      </view>
      <view class="tabs-item-price">
        <view>
          <view style="color: red; border: 1px solid red; border-radius: 10rpx; font-size: 24rpx;">神券</view>
        </view>
        <view>
          <up-button type="primary" size="mini" @click="clickBuy(item)">立即购买</up-button>
        </view>
      </view>
      <view class="tabs-item-alt">
        <view class="tabs-item-alt-text">
          {{ '特上个月啊哈时间卡还上课街' }}
        </view>
      </view>
    </view>
  </view>
</template>
<style>
page {
  background-color: #fff;
}
</style>
<style lang="scss" scoped>
/* 为了将通知栏空出来 */
.status-bar {
  height: var(--status-bar-height);
  background: #fff;
}
.waterfall-container {
  padding-top: 8rpx;
  background: #f5f5f5;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.tabs-item {
  border-radius: 16rpx;
  background-color: #ffffff;
  padding: 10rpx;
  margin: 8rpx 8rpx;
  width: calc(50% - 40rpx);
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.tabs-item-img {
  width: 100%;
  height: 100%;
  border-radius: 16rpx;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    display: block;
    border-radius: 16rpx;
    object-fit: contain;
  }
}
.tabs-item-name {
  margin: 4rpx 0rpx;
  font-size: 32rpx;
  word-wrap: break-word;
  word-break: break-all;
}
.tabs-item-price {
  font-size: 30rpx;
  color: #ff2d2d;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.tabs-item-alt-text{
  width: 100%;
  font-size: 24rpx;
  color: #999;
  text-overflow: ellipsis;
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>
