
大家好,我是`前端实验室`的大师兄!

今天就和大家重学一下flex布局，为什么要学习flex呢？那就不得不和大家说说大师兄的惨痛经历了
![](https://img.soogif.com/jPOBrWYkUAmjqPtimiuGTFuq4mARcuBZ.gif?scope=mdnice)
我们都知道传统的布局方式，都是基于盒状模型，依赖`display`属性 +`position`属性 + `float`属性

大师兄也是一个传统的人，所以当然使用的是传统方式布局了

![](https://files.mdnice.com/user/21128/104ef3fa-bac7-4dd7-8482-0284d611db22.png)

于是通篇下来，都是`position`搞的

~~好s不s~~,我们的项目是响应式布局，卡片数量不固定，根据卡片数量排列方式又不一定！！！

可以想象的到，我写的页面是多么的惨不忍睹
![](http://wx4.sinaimg.cn/large/bf976b12gy1g8d6c66ubyg208c08cjub.gif)

大佬问我，你怎么不用flex布局啊？

我：flex?怎么用的呀？那几个属性不都记不住啊！学它太无聊了！！！

说完，大神唰唰甩给我几个网站

![](https://files.mdnice.com/user/21128/4a21997b-6eff-4a50-a8a7-cc7899c3aa6d.png)

![](http://wx3.sinaimg.cn/large/814268e3ly1fhlpr39r0cj20hs084my7.jpg)

大神：别着急，听我给你娓娓道来

## 基础语法

首先要知道，Flex是Flexible Box的缩写，意为**弹性布局**，用来为盒状模型提供最大的灵活性。

任何一个容器都可以指定为Flex布局。要想使用它，就要给父盒子加上`display:flex`
```
.box{
  display: flex;
}
```
**`flex-direction` 改变元素主轴方向**
![](https://files.mdnice.com/user/21128/b6022c2e-3a2d-47f6-a4d0-c326ee86fbb8.png)
它有四个值可以选择


  1. `row`（默认值）：主轴为水平方向，起点在左端。
  2. `row-reverse`：主轴为水平方向，起点在右端。
  3. `column`：主轴为垂直方向，起点在上沿。
  4. `column-reverse`：主轴为垂直方向，起点在下沿。



**`flex-wrap`换行方式**
![](https://files.mdnice.com/user/21128/a291a32d-e5b2-44cb-8883-ca1316dc25d5.png)
默认情况下，所有的子元素都排在一条线，可以通过`flex-wrap`改变子元素的换行方式
1. `nowrap`是默认不换行

![](https://files.mdnice.com/user/21128/ca991060-11c1-432d-a8d3-805c286dcea7.png)

2. `wrap`是换行，当子元素的宽度之和超过父元素的宽度时，自动换行

![](https://files.mdnice.com/user/21128/4f07632e-c885-415c-a1bd-cdaf05a923f0.png)
3. `wrap-reverse`换行，第一行在下方。

![](https://files.mdnice.com/user/21128/c4c9458b-6791-4b65-9130-f85a83d6371f.png)



**`justify-content`主轴对齐方式**
![](https://files.mdnice.com/user/21128/55d11279-beda-48e5-aa3f-61490ca2645b.png)

`align-items`次轴对齐方式
![](https://files.mdnice.com/user/21128/608642a0-e199-4691-99c7-078d09bbd501.png)

通过 *css-tricks* 这个网站可以很好地通过图文的方式学习flex布局的基础语法

## 玩游戏学布局
`http://flexboxfroggy.com/#zh-cn`这个网站，就是通过使用flex的各个属性，帮助小青蛙找到他们的位置。

![](https://files.mdnice.com/user/21128/9c0d31eb-cb50-4444-9c8d-1757122e8e72.png)

当你看完*css-tricks*网站的内容，就可以立刻来玩这个游戏，来加深对flex的理解

![](https://files.mdnice.com/user/21128/55fde2db-ab63-4a87-ba30-ef084434106f.png)
前几关还是比较容易的
![](https://files.mdnice.com/user/21128/130f0b6c-e107-43fd-a593-53921a5e3929.png)
通过游戏的方式，加深理解flex的各个属性的用法，而且每一关都有相应属性的介绍和提示

![](https://files.mdnice.com/user/21128/704516d0-b499-48c9-8950-68b44a2fc971.png)


**还有一个更好玩的塔防游戏**
相比于静态的游戏，我个人还是比较喜欢玩这个塔防游戏

通过移动大炮的位置，来攻击敌人，保卫家园

![](https://files.mdnice.com/user/21128/7a357989-5873-490e-9ded-d885d9fc15f5.gif)


![](https://files.mdnice.com/user/21128/2f514bff-b722-40f3-a235-c0bda65e4cf8.gif)

公众号后台回复`flex`即可获取flex的图文链接和游戏链接，不仅能玩游戏，还能学到知识呢！
>进了前端门，便是一家人
>原创不易,点赞、留言、分享就是大师兄写下去的动力!