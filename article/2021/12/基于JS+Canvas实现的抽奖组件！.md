---
title: 基于JS+Canvas实现的抽奖组件！
date: 2021-12-10 21:41:12
excerpt: 老板让我开发一个大转盘抽奖功能，我说需要一个月，其实…
tags: [插件]
categories:
- [js]
- [vue]
index_img: https://frontlab.gitee.io/blog/cdn/202112/20211210193404.png
---




大家好,我是前端实验室的小师妹!一名资深的互联网玩家，专注分享大前端领域技术、面试宝典、学习资料等~

### 前言

在前端开发中，随机抽奖活动的需求大家一定都遇到过吧~

那你还在使用Div写抽奖页面布局吗？还在为适配、性能而烦恼吗？

不管是不是...都不要错过小师妹推荐的这款抽奖组件哦~

![](https://frontlab.gitee.io/blog/cdn/202112/R-C.jpg)

### 效果展示

### ![](https://frontlab.gitee.io/blog/cdn/202112/lucky_show.gif)

圣诞节快来了,小师妹也想有个人让我这样选礼物！！！
![](https://frontlab.gitee.io/blog/cdn/202112/R-C2.jpg)

说多了都是泪，我们还是看看怎么实现吧~

### 关于 lucky-canvas

> 一个基于 Js + Canvas 的【大转盘 & 九宫格 & 老虎机】抽奖， 致力于为 web 前端提供一个功能强大且专业可靠的组件， 只需要通过简单配置即可实现自由化定制， 帮助你快速的完成产品需求。

![](https://frontlab.gitee.io/blog/cdn/202112/lucky_canvas_demo.png)

### lucky-canvas 功能特点

#### 自由配置

奖品 / 文字 / 图片 / 颜色 / 按钮均可自由配置；支持同步 / 异步抽奖；中奖概率前 / 后端可控

#### 多端适配

支持 JS / TS / JQ / Vue / React / 微信小程序 / UniApp / Taro 等；并且多端使用 / 表现形式完全一致

#### 响应式

自动根据设备 dpr 调整清晰度；并支持使用 百分比 / rem / rpx 属性来适配移动端布局

### 快速上手体验


#### 1.在 Js / JQ 中使用

方式 1：通过 script 标签引入

```html
<div id="my-lucky"></div>

<script src="https://cdn.jsdelivr.net/npm/lucky-canvas@1.7.7"></script>
<script>
  const myLucky = new LuckyCanvas.LuckyWheel('#my-lucky', {
    width: '200px',
    height: '200px',
    blocks: [{ padding: '10px', background: '#869cfa' }],
    prizes: [
      { fonts: [{ text: '谢谢惠顾' }], background: '#e9e8fe' },
      { fonts: [{ text: 'IPhone 13 Pro' }], background: '#b8c5f2' },
      { fonts: [{ text: '520红包' }], background: '#e9e8fe' },
      { fonts: [{ text: '么么哒一个' }], background: '#b8c5f2' },
      { fonts: [{ text: '口红一支' }], background: '#e9e8fe' },
      { fonts: [{ text: '香水一瓶' }], background: '#b8c5f2' },
      { fonts: [{ text: '清空购物车' }], background: '#b8c5f2' },
      { fonts: [{ text: '洗袜子一个月' }], background: '#b8c5f2' },
    ],
  })
</script>
```

方式 2：通过 import 引入

``` shell
# npm 安装
npm install lucky-canvas@latest

# 或者 yarn 安装
yarn add lucky-canvas@latest
```

```js
import { LuckyWheel, LuckyGrid } from 'lucky-canvas'

const myLucky = new LuckyWheel('#my-lucky', {
  width: '200px',
  height: '200px',
  blocks: [{ padding: '10px', background: '#869cfa' }],
    prizes: [
      { fonts: [{ text: '谢谢惠顾' }], background: '#e9e8fe' },
      { fonts: [{ text: 'IPhone 13 Pro' }], background: '#b8c5f2' },
      { fonts: [{ text: '520红包' }], background: '#e9e8fe' },
      { fonts: [{ text: '么么哒一个' }], background: '#b8c5f2' },
      { fonts: [{ text: '口红一支' }], background: '#e9e8fe' },
      { fonts: [{ text: '香水一瓶' }], background: '#b8c5f2' },
      { fonts: [{ text: '清空购物车' }], background: '#b8c5f2' },
      { fonts: [{ text: '洗袜子一个月' }], background: '#b8c5f2' },
    ],
})
```

#### 在 Vue 中使用


1. 首先安装插件

```shell
# npm 安装
npm install @lucky-canvas/vue@latest

# 或者 yarn 安装
yarn add @lucky-canvas/vue@latest
```

2. 然后找到 main.js 引入插件并 use

```js
/**
 * 完整加载
 */
import VueLuckyCanvas from '@lucky-canvas/vue'
createApp(App).use(VueLuckyCanvas).mount('#app')

/**
 * 按需引入
 */
import { LuckyWheel, LuckyGrid } from '@lucky-canvas/vue'
// 大转盘抽奖
Vue.components('LuckyWheel', LuckyWheel)
// 九宫格抽奖
Vue.components('LuckyGrid', LuckyGrid)
```

3. 最后在组件内使用

```html
<template>
  <LuckyWheel
    width="200px"
    height="200px"
    :blocks="blocks"
    :prizes="prizes"
  />
</template>

<script>
export default {
  data () {
    return {
      blocks: [{ padding: '10px', background: '#869cfa' }],
      prizes: [
        { fonts: [{ text: '谢谢惠顾' }], background: '#e9e8fe' },
        { fonts: [{ text: 'IPhone 13 Pro' }], background: '#b8c5f2' },
        { fonts: [{ text: '520红包' }], background: '#e9e8fe' },
        { fonts: [{ text: '么么哒一个' }], background: '#b8c5f2' },
        { fonts: [{ text: '口红一支' }], background: '#e9e8fe' },
        { fonts: [{ text: '香水一瓶' }], background: '#b8c5f2' },
        { fonts: [{ text: '清空购物车' }], background: '#b8c5f2' },
        { fonts: [{ text: '洗袜子一个月' }], background: '#b8c5f2' },
    ]
    }
  }
}
</script>
```

好啦，一个简单的抽奖大转盘就实现啦~

下方公众号后台回复`20211214`就可以获取大转盘抽奖的Sample源码！前端实验室还有更多好玩实用的开源项目，欢迎小伙伴们和大师兄小师妹讨论哦~

> <p>进了前端门，便是一家人</p><p>原创不易,点赞、留言、分享就是大师兄写下去的动力!</p>



