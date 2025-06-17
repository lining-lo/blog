<template>
    <div class="article-container">
        <div class="article-left">
            <p class="left-title">目录</p>
            <MdCatalog class="left-content" :editorId="id" :scrollElement="scrollElement" />
        </div>
        <div class="article-content">
            <MdPreview :id="id" :modelValue="text" previewTheme="mk-cute" />
        </div>
        <div class="article-right">
            <p class="right-title">推荐文章</p>
            <div class="right-recommends">
                <div class="recommends-item" v-for="(item, index) in 5" :key="index">
                    <div class="item-img"></div>
                    <div class="item-title">博客部署流程总结</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { MdPreview, MdCatalog } from 'md-editor-v3';
import 'md-editor-v3/lib/preview.css';

//文本编辑器
//只读
const id = 'preview-only';
//文章内容
const text = ref(`
# vue2 中的解决方案
export default {
  data() {
    return {
      formData: {
        name: "",
      },
    };
  },
## vue2 中的解决方案
  methods: {
    clearFormData() {
      //    1、Object.assign 合并初始对象的属性
      Object.assign(this.formData, this.$options.data().formData);
      //    2、或者 直接等于也可以
      this.formData = this.$options.data().formData;
    },
  },
};
## 原理：
因为 data 是一个函数 vue 将 data 函数赋值在$options上 所以在调用 this.$options.data() 获取到的数据是函数的返回值 由于函数存在闭包的特性 所以返回的数据是新的一份值 也就是初始值
# vue3 中的解决方案
## 1、函数方案 利用闭包的特性
const originData = () => ({
  name: "",
});
## vue2 中的解决方案
const formData = reactive(originData());
const clearFormData = () => {
  Object.assign(formData, originData());
};

`);
//滚动条
const scrollElement = document.body;
</script>
<style lang='less' scoped>
.article-container {
    width: 100%;
    height: 100%;
    margin: 0 auto;
    display: flex;
    position: relative;

    .article-left {
        position: sticky;
        top: 60px;
        left: 0;
        width: 18%;
        max-height: 350px;
        margin-right: 10px;
        box-shadow: 0 1px 10px -6px black;
        border-radius: 10px;
        padding: 20px 10px;
        font-family: emoji;

        .left-title {
            font-size: 22px;
            padding: 4px 0;
            border-bottom: 1px solid #eeeeee;
            margin-bottom: 4px;
            font-weight: 700;
        }

        .left-content {
            font-size: 14px;
            color: rgb(103, 103, 103);
            font-weight: 600;
            padding-right: 10px;
        }
    }

    .article-content {
        width: 63%;
        height: 100%;
        padding: 0 20px;
        box-shadow: 0 1px 10px -6px black;
        border-radius: 10px;
        margin: 0 auto;
    }

    .article-right {
        font-family: emoji;
        position: sticky;
        top: 60px;
        right: 0;
        margin-left: 10px;
        width: 18%;
        max-height: 350px;
        box-shadow: 0 1px 10px -6px black;
        border-radius: 10px;
        padding: 20px 10px;

        .right-title {
            font-size: 22px;
            padding: 4px 0;
            border-bottom: 1px solid #eeeeee;
            margin-bottom: 4px;
            font-weight: 700;
        }

        .right-recommends {
            width: 100%;
            padding: 7px 14px;

            .recommends-item {
                display: block;
                width: 100%;
                height: 48px;
                display: flex;
                align-items: center;
                margin: 2px 0;
                cursor: pointer;

                .item-img {
                    width: 40px;
                    height: 40px;
                    background-color: #53e5b9;
                    margin-right: 12px;
                }

                .item-title {
                    font-size: 14px;
                    color: rgb(103, 103, 103);
                    font-weight: 600;
                }
            }
        }
    }
}
</style>