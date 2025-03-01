<template>
    <view v-if="wordsList.length > 0">
        <view v-for="(word, index) in wordsList" :key="index">
            <checkbox :value="word" @change="handleChange"></checkbox>
            <text>{{ word }}</text>
        </view>
    </view>
</template>

<script>
export default {
    props: ['wordsList'],
    methods: {
        handleChange(e) {
            this.$emit('word-select', e.mp.detail.value);
        }
    }
};
</script>
