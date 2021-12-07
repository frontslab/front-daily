---
title: Lottie--页面动画100%硬核还原！！！ 
date: 2021-11-20 12:45:12
tags: [js]
excerpt: 给我想要的json，还你一个完美动画效果！让动画实现So Easy!
categories:
- [js]
index_img: https://frontlab.gitee.io/blog/cdn/202112/lottie_index.png


---

最近大师兄开发大屏页面碰到一个困境：`动画还原`。

- 照着设计动画模仿，猜测动画时长，手创建贝塞尔曲线……
- 调整细节耗时耗力，效果还差强人意...
- 好不容易实现了，还原度却达不到要求

小伙伴们是不是和大师兄有类似的经历呢?大家可以留言分享哦！

被设计师折磨一顿后，大师兄找到了解决这个困境的方案。它就是今天的主角：`Lottie`

![](https://frontlab.gitee.io/blog/cdn/202112/e7a36206-7e94-44a9-a040-ef550497052a.png)

## lottie简介

`Lottie` 是Airbnb开源的一个 **面向iOS、Android、React Native** 的动画库，能分析 AE 导出的动画（需要用bodymovin导出为json格式），并且能让原生 App 像使用静态素材一样使用这些动画，完美实现动画效果。

下面是`Lottie`提供的官方效果图。类似下面这种一段动画的播放，非常适合使用`Lottie`来做。
![](https://frontlab.gitee.io/blog/cdn/202112/0f8087aa-8e2c-4a64-9ef5-87c7c354ea25.gif)

## Lottie流程
我们先来看下整个流程简图。
![](https://frontlab.gitee.io/blog/cdn/202112/2ea27bf4-916e-478b-b768-98e19829f873.png)
设计师用AE把动画效果做出来，再用Bodymovin导出相应地json文件给到前端，前端使用`Lottie`库就可以实现动画效果。功能简单且强大。

至于Adobe Effect和Bodymovin插件的安装与使用...嗯嗯，这是设计师的事情，咱们就不操心啦。

## Lottie使用入门

静态URL引入
```JavaScript
<script src="https://cdnjs.cloudflare.com/ajax/libs/lottie-web/5.8.1/lottie.min.js" integrity="sha512-V1YyTKZJrzJNhcKthpNAaohFXBnu5K9j7Qiz6gv1knFuf13TW/3vpgVVhJu9fvbdW8lb5J6czIhD4fWK2iHKXA==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
```
调用`loadAnimation`
```JavaScript
var params = {
  container: element, // 容器节点
  renderer: 'svg',
  loop: true,
  autoplay: true,
  path: 'data.json' // JSON文件路径
}
var anim = lottie.loadAnimation(params);
```
## vue中使用Lottie
### 依赖安装和使用
通过NPM安装`vue-lottie`
```JavaScript
npm install --save vue-lottie
```
`vue-lottie`使用
```JavaScript
<template>
    <div id="app">
        <lottie :options="defaultOptions" :height="400" :width="400" v-on:animCreated="handleAnimation"/>
        <div>
            <p>Speed: x{{animationSpeed}}</p>
            <input type="range" value="1" min="0" max="3" step="0.5"
                   v-on:change="onSpeedChange" v-model="animationSpeed">
        </div>
        <button v-on:click="stop">stop</button>
        <button v-on:click="pause">pause</button>
        <button v-on:click="play">play</button>
    </div>
</template>

<script>
  import Lottie from './lottie.vue';
  import * as animationData from './assets/pinjump.json';

  export default {
    name: 'app',
    components: {
      'lottie': Lottie
    },
    data() {
      return {
        defaultOptions: {animationData: animationData},
        animationSpeed: 1
      }
    },
    methods: {
      handleAnimation: function (anim) {
        this.anim = anim;
      },

      stop: function () {
        this.anim.stop();
      },

      play: function () {
        this.anim.play();
      },

      pause: function () {
        this.anim.pause();
      },

      onSpeedChange: function () {
        this.anim.setSpeed(this.animationSpeed);
      }
    }
  }
</script>
```
### 参数配置
也就是上面的defaultOptions属性传递配置对象：
- `container`：在其上呈现动画的 dom 元素
- `animationData`：一个带有导出动画数据的对象。
- `path`：动画对象的相对路径。（animationData 和 path 是互斥的）
- `loop`：默认值为true。可传递需要循环的特定次数
- `autoplay`：true / false 它会在准备好后立即开始播放
- `name`：动画名称以供将来参考
- `renderer`: 'svg' / 'canvas' / 'html' 设置渲染器
### Lottie动画监听
Lottie提供了用于监听动画执行情况的事件：

- complete
- loopComplete
- enterFrame
- segmentStart
- config_ready(初始配置完成)
- data_ready（所有动画数据加载完成）
- DOMLoaded（元素已添加到DOM节点）
- destroy

可使用addEventListener监听事件
```JavaScript
// 动画播放完成触发
anm.addEventListener('complete', anmLoaded);

// 当前循环播放完成触发 
anm.addEventListener('loopComplete', anmComplete);

// 播放一帧动画的时候触发 
anm.addEventListener('enterFrame', enterFrame);
```
Lottie的更多详解，请查阅下方链接。

>Lottie 地址：https://github.com/airbnb/lottie-android
>
>Lottie 官网：https://airbnb.design/lottie/


前端实验室还有更多好玩使用的开源项目，下方公众号后台回复`Lottie`获取大师兄给大家准备好的Demo地址！欢迎小伙伴们和大师兄小师妹讨论哦~


> <p>进了前端门，便是一家人</p><p>原创不易,点赞、留言、分享就是大师兄写下去的动力!</p>