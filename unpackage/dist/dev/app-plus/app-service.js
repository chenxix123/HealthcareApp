if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue) {
  "use strict";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$4 = {
    methods: {
      chooseImage() {
        uni.chooseImage({
          count: 1,
          sourceType: ["camera", "album"],
          success: (res) => {
            this.$emit("image-selected", res.tempFilePaths[0]);
          },
          fail: (err) => {
            uni.showToast({
              title: "选择图片失败",
              icon: "none"
            });
            formatAppLog("error", "at components/UploadComponent.vue:22", "选择图片失败", err);
          }
        });
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createElementVNode("button", {
        onClick: _cache[0] || (_cache[0] = (...args) => $options.chooseImage && $options.chooseImage(...args))
      }, "📷 拍照识别文字")
    ]);
  }
  const UploadComponent = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["render", _sfc_render$4], ["__scopeId", "data-v-99e0d210"], ["__file", "C:/Users/20969/Desktop/graduate_design/FoodApp/components/UploadComponent.vue"]]);
  const _sfc_main$3 = {
    props: ["imagePath"],
    methods: {
      startOCR() {
        uni.uploadFile({
          url: "http://localhost:8080/ocr/recognize",
          // 你的接口地址
          filePath: this.imagePath,
          name: "file",
          success: (res) => {
            const data = JSON.parse(res.data);
            this.$emit("ocr-success", data);
          },
          fail: (err) => {
            formatAppLog("error", "at components/OcrComponent.vue:22", "文字识别失败", err);
          }
        });
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock("view", null, [
      $props.imagePath ? (vue.openBlock(), vue.createElementBlock("button", {
        key: 0,
        onClick: _cache[0] || (_cache[0] = (...args) => $options.startOCR && $options.startOCR(...args))
      }, "🚀 识别文字")) : vue.createCommentVNode("v-if", true),
      $props.imagePath ? (vue.openBlock(), vue.createElementBlock("image", {
        key: 1,
        src: $props.imagePath,
        mode: "widthFix"
      }, null, 8, ["src"])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const OcrComponent = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["render", _sfc_render$3], ["__scopeId", "data-v-5203bd29"], ["__file", "C:/Users/20969/Desktop/graduate_design/FoodApp/components/OcrComponent.vue"]]);
  const _sfc_main$2 = {
    props: ["wordsList"],
    methods: {
      handleChange(e) {
        this.$emit("word-select", e.mp.detail.value);
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    return $props.wordsList.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 0 }, [
      (vue.openBlock(true), vue.createElementBlock(
        vue.Fragment,
        null,
        vue.renderList($props.wordsList, (word, index) => {
          return vue.openBlock(), vue.createElementBlock("view", { key: index }, [
            vue.createElementVNode("checkbox", {
              value: word,
              onChange: _cache[0] || (_cache[0] = (...args) => $options.handleChange && $options.handleChange(...args))
            }, null, 40, ["value"]),
            vue.createElementVNode(
              "text",
              null,
              vue.toDisplayString(word),
              1
              /* TEXT */
            )
          ]);
        }),
        128
        /* KEYED_FRAGMENT */
      ))
    ])) : vue.createCommentVNode("v-if", true);
  }
  const ResultComponent = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["render", _sfc_render$2], ["__file", "C:/Users/20969/Desktop/graduate_design/FoodApp/components/ResultComponent.vue"]]);
  const _sfc_main$1 = {
    components: {
      UploadComponent,
      OcrComponent,
      ResultComponent
    },
    data() {
      return {
        imagePath: "",
        wordsList: [],
        selectedWords: []
      };
    },
    methods: {
      onImageSelected(path) {
        this.imagePath = path;
      },
      onOcrSuccess(data) {
        this.wordsList = data.data.words_result.map((item) => item.words);
      },
      onWordSelect(selected) {
        this.selectedWords = selected;
      },
      showSelectedWords() {
        uni.showToast({
          title: `选中文字: ${this.selectedWords.join(" ")}`,
          icon: "none"
        });
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_UploadComponent = vue.resolveComponent("UploadComponent");
    const _component_OcrComponent = vue.resolveComponent("OcrComponent");
    const _component_ResultComponent = vue.resolveComponent("ResultComponent");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_UploadComponent, { onImageSelected: $options.onImageSelected }, null, 8, ["onImageSelected"]),
      $data.imagePath ? (vue.openBlock(), vue.createBlock(_component_OcrComponent, {
        key: 0,
        imagePath: $data.imagePath,
        onOcrSuccess: $options.onOcrSuccess
      }, null, 8, ["imagePath", "onOcrSuccess"])) : vue.createCommentVNode("v-if", true),
      $data.wordsList.length > 0 ? (vue.openBlock(), vue.createBlock(_component_ResultComponent, {
        key: 1,
        wordsList: $data.wordsList,
        onWordSelect: $options.onWordSelect
      }, null, 8, ["wordsList", "onWordSelect"])) : vue.createCommentVNode("v-if", true),
      vue.createElementVNode("button", {
        onClick: _cache[0] || (_cache[0] = (...args) => $options.showSelectedWords && $options.showSelectedWords(...args))
      }, "🔍 显示选中的文字"),
      $data.selectedWords.length > 0 ? (vue.openBlock(), vue.createElementBlock("view", { key: 2 }, [
        vue.createElementVNode(
          "text",
          null,
          "选中的文字：" + vue.toDisplayString($data.selectedWords.join(" ")),
          1
          /* TEXT */
        )
      ])) : vue.createCommentVNode("v-if", true)
    ]);
  }
  const PagesIndexIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["render", _sfc_render$1], ["__file", "C:/Users/20969/Desktop/graduate_design/FoodApp/pages/index/index.vue"]]);
  __definePage("pages/index/index", PagesIndexIndex);
  const _sfc_main = {
    onLaunch() {
      formatAppLog("log", "at App.vue:10", "App 启动成功");
    },
    onShow() {
      formatAppLog("log", "at App.vue:13", "App 显示");
    },
    onHide() {
      formatAppLog("log", "at App.vue:16", "App 隐藏");
    }
  };
  function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_router_view = vue.resolveComponent("router-view");
    return vue.openBlock(), vue.createElementBlock("view", null, [
      vue.createVNode(_component_router_view)
    ]);
  }
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/20969/Desktop/graduate_design/FoodApp/App.vue"]]);
  function createApp() {
    const app = vue.createVueApp(App);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue);
