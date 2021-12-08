---
title: Parallax.js–自适应智能设备方向的视差引擎
date: 2021-12-08 17:00:12
tags: [js]
excerpt: 不要觉得在"装逼"，它确实如此强大！
categories:
- [js]
index_img: https://frontlab.gitee.io/blog/cdn/202112/lottie_index.png


---

今天大师兄给大家分享一款功能非常强大的javascript视觉差特效引擎插件：`Parallax.js`。
## Parallax.js简介

`Parallax.js`是一个**简单的，轻量级的**视差引擎。你可以将它作为作为`jQuery`或`Zepto`插件来使用，也可以以**纯JS的方式**来使用。
![](https://files.mdnice.com/user/20968/97d81144-f44b-4b93-a5cf-5eedca716414.png)
最-最-最厉害的是它可以对智能设备的**方向作出反应**，即使在没有陀螺仪或运动检测硬件可用的时候，也可使用光标的位置来代替。

## 我要开始啦

### 准备工作

首先肯定是先引入**JS库**。有三种方法：

1）使用CDN
```JavaScript
<script src="https://cdnjs.cloudflare.com/ajax/libs/parallax/3.1.0/parallax.min.js"></script>
```
2）在GitHub上下载Parallax.js，如下图所示。
![](https://files.mdnice.com/user/20968/b639995e-4ec2-40d2-944e-3470fc27f0cd.png)
下载最新版本的`ZIP`包，解压获得`parallax.js`和`parallax.min.js`。用其中一个就好。

3）npm依赖安装
```JavaScript
npm i -s parallax-js
```
- 源码路径：node_modules/parallax-js/src/parallax.js
- 产品版路径：node_modules/parallax-js/dist/parallax.min.js

再根据你喜欢的工作流程要求导入库
```JavaScript
import Parallax from 'parallax-js' or
const Parallax = require('parallax-js')
```

### 使用方法

每个`Parallax.js`实例都需要一个Dom元素，我们称为`场景`。让我们任意定义一个。
```JavaScript
<div id="scene">
</div>
```
场景中的每个子元素都可以成为移动目标。我们先来最简单的。
```JavaScript
<div id="scene">
  <div>My first Layer!</div>
  <div>My second Layer!</div>
</div>
```
在视差场景中移动的每个项目的类别`layer`和`data-depth`指定其在场景中的深度的属性。

**深度0**，将导致层保持静止。

**深度1**，将使层通过所计算出的运动的总效果移动。

0和1之间的值将导致图层相对于提供的比例移动一个量。
```JavaScript
<style>
  #scene {
      width: 800px;
      height: 600px;
      margin: 200px auto;
  }
</style>
<div id="scene">
  <div class="layer" data-depth="0.2">My first Layer!</div>
  <div class="layer" data-depth="0.6">My second Layer!</div>
</div>
```

一旦DOM元素加载好，就可以创建出Parallax.js实例啦。
```JavaScript
var scene = document.getElementById('scene');
var parallaxInstance = new Parallax(scene);
```
好了，你已经学会`Parallax.js`的入门操作了。看下效果！
![](https://files.mdnice.com/user/20968/a700aab5-21b3-4432-a3e2-a7f6938a93d7.gif)
就这么简单、粗暴！

## 进阶使用

`Parallax.js`如果仅仅是这样，且不弱爆啦？
在学习`Parallax.js`定义的多种配置和方法前，让我们来看看"`目标`"是怎么移动的？

### 层运动的计算规则

"`目标`"，其实就是我们场景中的子元素，需要用`class="layer"`来指明，又称为"`层`"。每一个层的运动量依赖于3个因素：

- `scalarX`和`scalarY`的值
- 父DOM元素的尺寸大小
- 一个parallax场景中层的`depth值`

计算的公式如下：
```JavaScript
/**
  * xMotion: x方向的总运动量
  * yMotion: y方向的总运动量
  * parentElement.width: 父容器的宽度
  * parentElement.height: 父容器的高度
  * scalarX：默认值10.
  * scalarY: 默认值10.
  * layerDepth: data-depth属性值
  * /
xMotion = parentElement.width  * (scalarX / 100) * layerDepth
yMotion = parentElement.height * (scalarY / 100) * layerDepth  
```

这就是画面中层级移动的原因。


### 行为属性配置参数

你可以为任何给定的`Parallax`实例设置如下这些行为的配置参数。可以在**HTML标签中使用`data属性`来指定**，也可以**通过构造函数和API在JavaScript中指定**。
![](https://files.mdnice.com/user/20968/ded9e4d4-f30b-4f02-bf53-c550006d0a2d.png)

### 其他API方法
上面说过，一些属性参数配置项可以通过方法来指定，如`scalar-x`和`scalar-y`，就可以通过`scalar(x, y)`来调用。
除此之外，`Parallax.js`还有如下常用方法：
```JavaScript
parallax.enable(); //让禁止运行的实例恢复运行
parallax.disable(); //禁止实例运行
parallax.destroy(); //销毁实例
```

### 作为jQuery插件使用
如果你将`Parallax.js`作为`jQuery`或`Zepto`插件来使用，可以如下方式使用：
```JavaScript
$('#scene').parallax();   

//或带参数的用法：
$('#scene').parallax({
  calibrateX: false,
  calibrateY: true,
  invertX: false,
  invertY: true,
  limitX: false,
  limitY: 10,
  scalarX: 2,
  scalarY: 8,
  frictionX: 0.2,
  frictionY: 0.8,
  originX: 0.0,
  originY: 1.0
}); 
```

**注意：使用`jQuery`或`Zepto`前，要引入相应的库。**

看看大师兄给大家准备的Demo效果：
![](https://files.mdnice.com/user/20968/d91e7a5b-4e49-4c9e-b974-aee487b14e54.gif)

还没使用过Parallax.js的小伙伴们，赶紧秀起来吧！

前端实验室还有更多好玩实用的开源项目，下方公众号后台回复`parallax`获取大师兄给大家准备好的Demo地址！欢迎小伙伴们和大师兄小师妹讨论哦~

>进了前端门，便是一家人
>
>原创不易,点赞、留言、分享就是大师兄写下去的动力!


> <p>进了前端门，便是一家人</p><p>原创不易,点赞、留言、分享就是大师兄写下去的动力!</p>