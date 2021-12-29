大家好！我是前端实验室的大师兄。
今天直上主题：`particles.js`

>A lightweight JavaScript library for creating particles.
>
>一个轻量级的创建粒子背景的 JavaScript 库。
### 简介
`particles.js`用来在 web 中创建炫酷的浮动粒子特效。它调用的粒子动画效果，让网页背景更有科技感。颜色还可以任意切换哦。

我们先来看一下效果图：

标准版：
![](https://files.mdnice.com/user/20968/f07da2a2-9bf4-40a0-8f15-2f605542561e.png)
星空版：
![](https://files.mdnice.com/user/20968/65bd92e7-e4ba-41a6-a8a7-669efd76e24e.png)
泡泡版：
![](https://files.mdnice.com/user/20968/ed5f2ebd-6055-45df-8abc-b62058511892.png)
下雪版：
![](https://files.mdnice.com/user/20968/d0cd5890-618e-4f95-aa12-22c5b26bdc08.png)

### 利用它能做些什么呢？

做网站一个好的UI界面很重要，如果在背景上加上炫酷的粒子特效会使网页更加大气。particles.js插件实现的这种散射的原子颗粒特效就是不错的选择。

尤其在页面没有适合的背景时，它能立即提升网站的格调。
比如说：
![](https://files.mdnice.com/user/20968/f3a27da7-d533-4395-b694-aeda871ca52c.gif)
嗯，效果挺不错的吧。

### 使用
`particlesJS` 在Github上的地址：**https://github.com/VincentGarreau/particles.js**

直接下载这个项目，打开demo里面的index.html文件，即可看到效果。

那么，如果我们要构建自己的项目，该如何引入文件呢？

**注意两个点:**
- `particles.js`是粒子动画主要的库，我们肯定是要引入的
- 粒子配置（json格式）

_Demo中的style.css 我们也可以引入，可以在css中设置你喜欢的背景颜色哦~_


下面介绍重中之重：`参数配置`

`particles.number.value`： 粒子的数量

`particles.number.density`： 粒子的稀密程度

`particles.number.density.enable`： 启用粒子的稀密程度 （true 或 false）

`particles.number.density.value_area`： 每一个粒子占据的空间（启用粒子密度，才可用）

`particles.color.value`： 粒子的颜色 （支持16进制”#b61924”，rgb”{r:182, g:25, b:36}”，hsl，以及random）

`particles.shape.type`： 粒子的形状 （”circle” “edge” “triangle” “polygon” “star” “image”）

`particles.opacity.value`： 粒子的透明度

`particles.size.anim.enable`： 是否启用粒子速度（true/false）

`particles.size.anim.speed`： 粒子动画频率

`particles.size.anim.sync`： 粒子运行速度与动画是否同步

`particles.move.speed`： 粒子移动速度

记住这些配置项，大家就可以配置出自己喜欢的背景了~赶紧试试吧！（更多配置，请查看GitHub最新版本）

前端实验室还有更多好玩使用的开源项目，下方公众号后台回复`particles`获取大师兄给大家准备好的星空背景登陆页面Demo！欢迎小伙伴们和大师兄小师妹讨论哦~

>进了前端门，便是一家人
>
>原创不易,点赞、留言、分享就是大师兄写下去的动力!