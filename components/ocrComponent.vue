<template>
    <view>
        <button v-if="imagePath" @click="startOCR">🚀 识别文字</button>
        <image v-if="imagePath" :src="imagePath" mode="widthFix"></image>
    </view>
</template>

<script>
export default {
    props: ['imagePath'],
    methods: {
        startOCR() {
            uni.uploadFile({
                url: 'http://localhost:8080/ocr/recognize', // 你的接口地址
                filePath: this.imagePath,
                name: 'file',
                success: (res) => {
                    const data = JSON.parse(res.data);
                    this.$emit('ocr-success', data);
                },
                fail: (err) => {
                    console.error('文字识别失败', err);
                }
            });
        }
    }
};
</script>

<style>
image {
    width: 100%;
    margin: 20px 0;
}
</style>
