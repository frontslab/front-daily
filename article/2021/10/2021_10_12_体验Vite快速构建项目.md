大家好,我是前端实验室大师兄

![](https://files.mdnice.com/user/20945/eae4830c-f5c8-4097-a131-b755beadced8.png)
前端大佬尤雨溪在知乎上回答这样一个问题, 随着vite2.0的发布,直接引爆前端圈。

那么vite到底好在哪里,如何使用呢?

接下来由大师兄带你一起走进vite世界。

![](https://files.mdnice.com/user/20945/984ccc1f-163d-4326-a26a-ca3da2632972.jpg)

### 一. Vite简介

Vite是一种新型前端构建工具,能够显著提升前端开发体验。

在日常开发中,一般使用Webpack对项目进行构建编译,最后打包成Bundle文件。

当冷启动开发服务器时,基于打包器的方式启动必须有限抓取并构建整个应用之后才能提供服务,随着项目的规模越大,Webpack启动服务器变得缓慢。

而Vite 通过在一开始将应用中的模块区分为`依赖`和`源码`两类，改进了开发服务器启动时间。

Vite以原生ESM方式提供源码。这实际上是让浏览器接管了打包程序的部分工作:Vite 只需要在浏览器请求源码时进行转换并按需提供源码。根据情景动态导入代码,即只在当前屏幕上实际使用时才会被处理。

![](https://files.mdnice.com/user/20945/d5d3fd65-da42-485b-a352-cbca8ef18914.png)
![](https://files.mdnice.com/user/20945/29223b5d-8328-44a9-bde9-5066063eeec1.png)

##### 浏览器支持

开发环境中:Vite需要在支持原生 ES 模块动态导入的浏览器中使用。

生产环境中:默认支持的浏览器需要支持 通过脚本标签来引入原生 ES 模块 。可以通过官方插件 @vitejs/plugin-legacy 支持旧浏览器。

### 二. 项目搭建

##### 1.环境准备

Vite需要Node.js版本 >=12.0.0
查看Node版本,如低于12.0.0 请升级

```
➜ node -v
➜ v16.1.0
```

##### 2.创建项目
```
# 使用npm
➜ npm init @vitejs/a

# 安装依赖
➜ npm install

# 启动项目
➜ npm run dev
```
![](https://files.mdnice.com/user/20945/d6d8f739-e1ee-406a-b11a-5d2930177b11.jpg)

浏览器输入地址后我们可以看到服务已启动

![](https://files.mdnice.com/user/20945/83a4b1ae-7c0d-4055-86cc-1346a6ca79f9.jpg)

##### 3.Vite配置文件修改




图中对比通过`vue-cli`创建的项目,我们可以发现`index.html`在项目最外层而不是在`public`文件夹内。这是有意而为之的:在开发期间Vite 是一个服务器，而`index.html`是该 Vite 项目的入口文件。
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```
Vite将`index.html`视为源码和模块图的一部分。Vite解析`<script type="module" src="...">`,这个标签指向你的`JavaScript`源码。
```
// 更多相关vite配置参考官网文档:https://cn.vitejs.dev/config/
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  //项目根目录（index.html 文件所在的位置）
  root : './src',
  //开发或生产环境服务的公共基础路径
  base : './',
  //开发模式 默认：'development'（开发模式），'production'（生产模式）
  mode : 'development',
  server : {
  
  }
})
```
##### 4.集成路由 Vue Router

`Vue Router`是 Vue.js官方的路由管理器。它和`Vue.js`的核心深度集成，让构建单页面应用变得易如反掌。
```
# 安装Vue Router4
➜ npm install vue-router@4
```

新建文件:src/arouter/index.ts
```
import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router
```
在main.ts下引入
```
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')
```
##### 5.集成状态管理 Vuex

`Vuex`是一个专为`Vue.js`应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态,并以相应的规则保证状态以一种可预测的方式发生变化。
```
# 安装vuex
npm install vuex@next --save
```
新建文件src/strore/index.ts
```
import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
```
在main.ts下引入
```
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

createApp(App).use(router).use(store).mount('#app')
```
##### 6.集成网络请求工具 Axios
```
# 注:具体使用方式参考官网文档
# 安装Axios
npm install axios
```
##### 7.集成代码规范工具 Eslint

`ESLint`是一个开源的`JavaScript`代码检查工具,由 Nicholas C. Zakas 于2013年6月创建。代码检查是一种静态的分析,常用于寻找有问题的模式或者代码,并且不依赖于具体的编码风格。
```
# 安装 ESLint：
npm install eslint --save-dev
# 创建配置文件
# 这里推荐使用终端提示w完成配置操作
npx eslint --init
```

![](https://files.mdnice.com/user/20945/0bab94e0-b4e9-4a01-a792-2ed916f0bd49.jpg)

上图大概意思为:
> 1. How would you like to use ESLint? （你想如何使用 ESLint?）
选择To check syntax, find problems, and enforce code style（检查语法、发现问题并强制执行代码风格）
>2. What type of modules does your project use?（你的项目使用哪种类型的模块?）
选择 JavaScript modules (import/export)
>3. Which framework does your project use? （你的项目使用哪种框架?）
选择 Vue.js
>4. Does your project use TypeScript?（你的项目是否使用 TypeScript？）
yes
>5. Where does your code run?（你的代码在哪里运行?）
选择 Browser 和 Node
>6. How would you like to define a style for your project?（你想怎样为你的项目定义风格？）
选择 Use a popular style guide（使用一种流行的风格指南）
>7. Which style guide do you want to follow?（你想遵循哪一种风格指南?）
我们这里选择 Airbnb.ESLint 为我们列出了三种社区流行的 JavaScript 风格指南，
分别是 Airbnb、Standard、Google(这里根据个人喜好选择吧...)
>8. What format do you want your config file to be in? (你的配置文件是使用什么格式的?)
选择JavaScript
>9. Would you like to install them now with npm?（你想现在就用 NPM 安装它们吗?）
yes

完成上述操作后,会在根目录下生成.eslintrc.js文件!

根据项目需求,我们也可以追加自定义ESLint规则
```
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:vue/essential',
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
  },
  plugins: [
    'vue',
    '@typescript-eslint',
  ],
  rules: {
  },
};
```
![](https://files.mdnice.com/user/20945/c416e649-1578-4dde-a147-36c3010013b6.png)
<center>(demo运行效果)</center>

至此,一个简单的项目已经搭建完成,赶紧公众号回复「Vite」获取相关示例源码哦~~
上述的工具也不是必须的,但是接入成熟的工具可以更有效的提高我们的开发效率和代码质量,共勉。




> 原创不易,如文章对你有帮助,你的点赞、留言、分享就是大师兄写下去的动力!