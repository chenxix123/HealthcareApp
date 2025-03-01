<template>
    <view>
        <button @click="chooseImage">选择图片</button>
        <view v-if="result">
            <text>识别结果：{{ result.message }}</text>
            <text v-if="result.data">{{ result.data.toString() }}</text>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            result: null
        };
    },
    methods: {
        chooseImage() {
            uni.chooseImage({
                count: 1,
                success: (res) => {
                    const tempFilePaths = res.tempFilePaths;
                    this.uploadImage(tempFilePaths[0]);
                },
                fail: (err) => {
                    console.error('选择图片失败', err);
                }
            });
        },
        uploadImage(filePath) {
            this.ocrRecognize(filePath);
        },
        ocrRecognize(filePath) {
            uni.uploadFile({
                url: 'http://localhost:8080/ocr/recognize',
                filePath: filePath,
                name: 'file',
                success: (res) => {
                    const data = JSON.parse(res.data);
                    this.result = data;
                    console.log('OCR 识别结果', data);
                },
                fail: (err) => {
                    console.error('OCR 识别失败', err);
                }
            });
        }
    }
};
</script>

<style>
/* 可以添加一些样式 */
</style>