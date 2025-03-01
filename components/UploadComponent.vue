<template>
    <view>
        <button @click="chooseImage">📷 拍照识别文字</button>
    </view>
</template>

<script>
export default {
    methods: {
        chooseImage() {
            uni.chooseImage({
                count: 1,
                sourceType: ['camera', 'album'],
                success: (res) => {
                    this.$emit('image-selected', res.tempFilePaths[0]); // 传图片路径给父组件
                },
                fail: (err) => {
                    uni.showToast({
                        title: '选择图片失败',
                        icon: 'none'
                    });
                    console.error('选择图片失败', err);
                }
            });
        }
    }
};
</script>

<style>
button {
    margin: 20px;
    padding: 10px;
    background-color: #007aff;
    color: white;
    border-radius: 5px;
}
</style>
