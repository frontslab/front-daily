---
title: Vue-CoreVideoPlayer 一款基于 vue.js的轻量级、优秀的视频播放器组件
date: 2021-10-31 18:27:12
tags: [播放器, 插件]
excerpt: Vue-CoreVideoPlayer一款基于vue.js的轻量级的视频播放器插件。
categories:
- [js]
index_img: https://frontlab.gitee.io/blog/cdn/202111/video_cover.png
---

大家好，我是前端实验室的大师兄!

今天大师兄给大家推荐一款非常优秀的`视频播放组件`

![](https://frontlab.gitee.io/blog/cdn/202111/video_cover.png)

### 效果欣赏

![](https://frontlab.gitee.io/blog/cdn/202111/video_show.png)

### 介绍

> `Vue-CoreVideoPlayer` 一款基于`vue.js`的轻量级的视频播放器插件。</br>
> 采用`Adobd XD`进行UI设计，支持移动端适配,不仅功能强大，颜值也是超一流！

`Vue-CoreVideoPlayer`的`说明文档`和`sample`都很完善，上手十分容易。

该组件也保持了和原生`HTML Video`属性配置的对接，可定制性很高。
![](https://frontlab.gitee.io/blog/cdn/202111/video_config.png)

播放器的UI设计基于`Adobe XD`，官方也提供了基于`Adobe XD`的UI设计源文件，可供开发者和设计师们二次创作自定义播放器UI。

![](https://frontlab.gitee.io/blog/cdn/202111/ui-1.png)



### 特性

- 支持个性化配置，可定制播放器主题界面
- 支持i18n（国际化），默认支持中文、英文和日文
- 支持服务端渲染
- 支持画中画模式
- 支持事件订阅
- 优秀的API设计，易于开发
- 移动端适配
- 提供`playcore-hls`解码插件，支持HLS直播流格式播放

### 快速上手

#### 1.下载依赖

使用NPM

```shell
$ npm install --save vue-core-video-player 
```

使用yarn

```shell
$ yarn add -S vue-core-video-player 
```

直接引入

```html
<script src="./dist/vue-core-vide-player.umd.min.js"></script>
```

#### 2.引入模块

编辑 main.js 然后引入模块

```js
import VueCoreVideoPlayer from 'vue-core-video-player'

Vue.use(VueCoreVideoPlayer)
```

#### 3.播放组件使用

```html
<div id="app">
	<div class="player-container">
		<vue-core-video-player  :src="videoSource" :cover="cover" :title= "title"  autoplay loop="true"/>
	</div>
</div>
```

上面我们说到`VueCoreVideoPlayer`组件保持了和原生`HTML Video`属性配置的对接，可以看到大师兄在这里使用了`autoplay`和`loop`属性，其他属性也是一样的使用方式哦~

这样一个简单的播放器就已经集成完啦~

#### 4.基本配置

设置视频源，这里`Sample`大师兄使用了多分辨率作为效果展示。

```js
<script>
	export default {
		name: 'app',
		data() {
			return {
				videoSource: [{
					src: 'https://media.vued.vanthink.cn/sparkle_your_name_am360p.mp4',
					resolution: 360,
				}, {
					src: 'https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4',
					resolution: 720,
				}, {
					src: 'https://media.vued.vanthink.cn/y2mate.com%20-%20sparkle_your_name_amv_K_7To_y9IAM_1080p.mp4',
					resolution: 1080
				}],
				cover : "https://img1.wxzxzj.com/vpc-example-cover-your-name-c.png",
				title : "你的名字"
			}
		}
	}
</script>
```

如果是使用一个视频文件的相对地址或者你的CDN地址方式：

```html
<vue-core-video-player src="https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4"/>
```

#### 5.事件订阅

`VueCoreVideoPlayer`遵循`W3C`标准的媒体事件`API`,你可以前往`MDN`获取这些细节，下面罗列一些非常常用的事件：

- play 表示当播放器开始播放或者通过 play() 方法从暂停状态恢复。
- pause 当播放器停止播放的时候触发。
- progress 当播放器正在下载媒体资源。
- loadeddata 当播放器开始加载第一帧时候触发。
- canplay 当加载足够数据可以满足基本播放后触发.。
- durationchange 当媒体获取一定数据，并且完整的解析出 metadata 信息。
- ended 当媒体播放结束时候触发。
- timeupdate 当播放的媒体 currenttime 发生改变时候触发。
- seeked 当用户 seek 操作完成触发。

```js
methods: {
	paly() {
		console.log("play");
	},
	pause(){
		console.log("pause");
	}
}
```

---

作为一款优秀的现代视频播放组件，别忘了`VueCoreVideoPlayer`还支持i18n（国际化），默认支持中文、英文和日文；同时还提供了一款`HLS`解码插件`playcore-hls`支持HLS的播放，更多的功能及使用大家自己可以去实践一下！

`VueCoreVideoPlayer`已经在`Github`上开源，同时大师兄已经将`Sample`的代码上传到`Github`,大家在公众号后台回复<b>`播放器`</b>即可获取相关的学习资源哦~


> <p>进了前端门，便是一家人</p><p>原创不易,点赞、留言、分享就是大师兄写下去的动力!</p>

