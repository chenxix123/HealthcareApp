<template>
    <view>
        <router-view></router-view>
    </view>
</template>

<script>
export default {
    onLaunch() {
        console.log('App 启动成功');
    },
    onShow() {
        console.log('App 显示');
    },
    onHide() {
        console.log('App 隐藏');
    }
};
</script>

<style>
/* 全局样式 */
view {
    font-family: Arial, sans-serif;
    box-sizing: border-box;
    padding: 10px;
}
</style>
