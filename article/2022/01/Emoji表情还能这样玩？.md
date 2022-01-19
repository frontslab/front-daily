---
title: 贼好用的表情包，快来试试吧！
date: 2022-01-17 12:12:12
excerpt: Emoji表情还能这样玩？这插件牛逼了...
tags: [插件]
categories:
- [js]
index_img: https://frontlab.gitee.io/blog/cdn/202112/20211210193404.png
---


大家好,我是前端实验室的大师兄!一名资深的互联网玩家，专注分享大前端领域技术、面试宝典、学习资料等~

今天要给大家分享的就是网页交互中最常用的功能：`表情包`。

### 前言

纯粹的文字有时显得那么苍白无力，一个表情反而更胜千言万语。

小伙伴们接到的评论功能，往往都需要带上表情包。

今天大师兄给大家分享个贼好用的表情包插件: `jQuery-emoji`

![](https://files.mdnice.com/user/20968/a7a3d816-c4cc-4860-b7fe-c510f29942e9.png)

### 功能
- 支持给`textarea`或`可编辑div`加上表情功能，自动识别元素类型。
  - 如果是`textarea`，则选择表情后插入表情代码.
![](https://files.mdnice.com/user/20968/f641cb59-8ae9-4eab-8ef3-9f2192862473.png)
(*大家可能会疑惑：这个表情代码有什么用？接着往下看就知道啦*)

  - 如果是`可编辑div`，则直接插入表情图片。
![](https://files.mdnice.com/user/20968/64fed7a7-dff8-4dfc-90ae-05d0bb25a6a9.png)
使用可编辑的div在输入时就方便很多了:选的什么，输入的就是什么。

*唯一需要注意的就是这个表情弹窗的触发按钮不是表情（图中红框所示）。这是因为在表情包没有初始化前，表情是显示不出来的。这里需要个图片来代替下~*

- 支持自定义表情代码的格式。

这套插件中，表情包都是通过别名对应图片来显示的。显示的图片放在`/dist/img/`目录下(也可以自己在配置中设置目录)。因此，完全可以添加自己设定的表情包哦。
```JavaScript
$("#editor").emoji({
    button: "#btn",
    showTab: false,
    animation: 'slide',
    icons: [{
        name: "QQ表情",
        path: "dist/img/qq/",
        maxNum: 91,
        excludeNums: [41, 45, 54],
        file: ".gif"
    }]
});
```
*上面的示例中`path`定义了路径，`file`定义了格式*

- 支持将表情代码转换为表情图片。

还记得之前的textarea中添加表情时的疑惑吗？


![](https://files.mdnice.com/user/20968/fdfacd36-b121-4dd9-b897-8dd522309531.png)
只显示表情代码，怎么办？`emojiParse`方法来帮忙。
```JavaScript
 $("#sourceText").emojiParse(...);
```
*为什么要提供再解析一次的方法呢？这主要是为了处理存储返回的表情数据。*

*存储返回的数据必然只是这个表情的代码。你需要把这个代码解析为表情。*

- 示例已带有百度贴吧和qq高清2套表情。支持多组表情并提供tab切换。
![](https://files.mdnice.com/user/20968/d2651010-e2ed-41e3-9e07-f8bd1c1ea791.png)
表情包的tab版面也是可以配置的。
```JavaScript
$("#content").emoji({
    showTab: true,
    animation: 'fade',
    icons: [{
        name: "贴吧表情",
        path: "dist/img/tieba/",
        maxNum: 50,
        file: ".jpg",
        placeholder: ":{alias}:",
        ...
        },
        , {
        path: "dist/img/qq/",
        maxNum: 91,
        excludeNums: [41, 45, 54],
        file: ".gif",
        placeholder: "#qq_{alias}#"
    }]
    });
```
*多套版面就是这里的icons数组来实现的*

### 使用
#### 引用 
首先在页面上引用css文件和js文件，css文件一般在`<head>`中添加，js文件一般在`</body>`之前添加。

*注意要先引用jquery和jquery.mCustomScrollbar，再引用该js。因为该插件是需要jquery支持的。*
```JavaScript
<head>
    <link rel="stylesheet" href="lib/css/jquery.mCustomScrollbar.min.css"/>

    <link rel="stylesheet" href="css/jquery.emoji.css"/>
    
</head>
<body>
  <textarea class="form-control" id="content" rows="3"></textarea>
  <div>或者</div>
  <div id="editor" contenteditable="true"></div>

<script src="https://cdn.bootcss.com/jquery/1.11.3/jquery.js"></script>

<script src="lib/script/jquery.mousewheel-3.0.6.min.js"></script>

<script src="lib/script/jquery.mCustomScrollbar.min.js"></script>

<script src="js/jquery.emoji.js"></script>
</body>
```
#### 调用
在文本框或可编辑div上初始化emoji
```JavaScript
$("#content").emoji(options);
```
#### 参数
参数都比较简单，如下图
![](https://files.mdnice.com/user/20968/bc5e00ac-de53-46c6-9f6e-986b4b794b5e.png)
#### 方法
前面的介绍中也使用到了一些方法，这里再总结下。

`初始化表情:emoji(options)`
```JavaScript
$("#editor").emoji({
    icons: [{
        name: "QQ表情",
        path: "img/qq/",
        maxNum: 91,
        excludeNums: [41, 45, 54],
        file: ".gif",
        placeholder: "#qq_{alias}#"
    }]
});
```
`显示表情面板：emoji('show')`
```JavaScript
$("#editor").emoji('show');
```
`隐藏表情面板：emoji('hide')`
```JavaScript
$("#editor").emoji('hide');
```
`切换显示隐藏表情面板：emoji('toggle')`
```JavaScript
$("#editor").emoji('toggle');
```
API都非常简单。大家赶紧来试试吧！

`前端实验室`公众号后台回复`20220118`获取`jQuery-emoji`资源。

#### 写在最后
欢迎加入前端实验室读者交流群，群里有不少技术大神，不定时会分享一些技术要点，更有一些资源收藏爱好者会分享一些优质的学习资料。吃瓜、摸鱼、白嫖技术就等你了~

进群方式：在下方公众号后台，回复 111 ，按提示操作即可进群。
![](https://mmbiz.qpic.cn/mmbiz_jpg/WqeajEMWSax77AXb3YwBusIH7OSupvKITDI8mHVUKcfSYjjpdXOGWuUfZkQbfgY9POSavM1wPnB7frryZtibtUA/0?wx_fmt=jpeg)
