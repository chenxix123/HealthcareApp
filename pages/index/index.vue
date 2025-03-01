<template>
    <view>
        <UploadComponent @image-selected="onImageSelected" />
        <OcrComponent v-if="imagePath" :imagePath="imagePath" @ocr-success="onOcrSuccess" />
        <ResultComponent v-if="wordsList.length > 0" :wordsList="wordsList" @word-select="onWordSelect" />
        <button @click="showSelectedWords">🔍 显示选中的文字</button>
        <view v-if="selectedWords.length > 0">
            <text>选中的文字：{{ selectedWords.join(' ') }}</text>
        </view>
    </view>
</template>

<script>
import UploadComponent from '@/components/UploadComponent.vue';
import OcrComponent from '@/components/OcrComponent.vue';
import ResultComponent from '@/components/ResultComponent.vue';

export default {
    components: {
        UploadComponent,
        OcrComponent,
        ResultComponent
    },
    data() {
        return {
            imagePath: '',
            wordsList: [],
            selectedWords: []
        };
    },
    methods: {
        onImageSelected(path) {
            this.imagePath = path;
        },
        onOcrSuccess(data) {
            this.wordsList = data.data.words_result.map(item => item.words);
        },
        onWordSelect(selected) {
            this.selectedWords = selected;
        },
        showSelectedWords() {
            uni.showToast({
                title: `选中文字: ${this.selectedWords.join(' ')}`,
                icon: 'none'
            });
        }
    }
};
</script>
