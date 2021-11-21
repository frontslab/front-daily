---
title: vue-router原理分析与实践！
date: 2021-10-14 15:38:37
tags: [vue, 路由]
excerpt: 单手撸一个简单的Vue-Router
categories:
- [vue]
index_img: https://frontlab.gitee.io/blog/cdn/202110/vue_router_cover.png
---



大家好,我是前端实验室的大师兄!

今天大师兄跟大家简单聊聊Router的实现原理,以及我们如何去实现这样一个插件。

![](https://frontlab.gitee.io/blog/cdn/202110/vue_router_cover.png)

`Vue Router` 是` Vue.js`官方的路由管理器。它和 Vue.js 的核心深度集成，让构建单页面应用变得易如反掌。
关于`Vue Router`的使用就不做过多介绍了,大家可以前往`Vue Router`官网去学习哦~

### vue-router插件的基本使用
```
import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const router = new Router({routes:[]})
export default router
​
import router from './route'
new Vue({
    render: h => h(APP),
    router
})
```
从上述代码可以看出，`router`也是作为一个插件去使用的，所以在进行原理实践时候，我们开发的就是一个插件。

### 插件开发思路
- 定义一个`Router`类，用来进行所有的router操作。定义一个install方法，将router挂载到Vue的实例上去
- 注册全局组件`router-link`和`router-view`，`router-link`组件解析为一个a标签，`router-view`解析为一个div标签，内容为当前路由对应的component
- 监听`hashchange`事件来改变当前路由对应的component，监听`load`事件做同样的事情

- 对于嵌套路由而言，在渲染`router-view`时候，先去判断当前`router-view`的深度，即当前`router-view`是处在哪个层级，然后在解析routes时候判断当前路由，如果当前路由和routes中某个路由都为'/'根路由，则直接放到路由渲染数组中，如果当前路由不是根路由，并且routes中的某个路由包含当前路由，则意味着routes数组中的这个路由要么是当前路由的父路由，要么就是当前路由，然后把routes数组中的这个路由放到路由渲染数组中去，放完之后如果还有childrens，递归去做就行。最后得到了一个路由匹配数组，这个数组里面包含当前路由和当前路由的父路由，并且数组中子路由的下标与之前`router-view`的层级下标相等，这样就能正确的将子路由的component正确的渲染到对应的`router-view`中去了。

> 譬如当前路由表如下:
```
routes:[
    {
        path: '/',
        component: () => import ('../views/index.vue')
    },
    {
        path: '/second',
        component: () => import ('../views/second.vue'),
        childrens: [
            {
                path: '/seconde/article',
                component: import ('../view/article.vue')
            }
        ]
    }
]
```
此时second组件下有一个`router-view`，用来渲染子路由——article组件，在app下还有一个父`router-view`，用来渲染index、second组件，所以此时second组件下的`router-view`的层级是1(初始化为0)。如果此时浏览器访问路由 /second/article 时候，触发我们的路由匹配方法，遍历routes数组和当前路由对比，当前路由不是根路由，并且包含 /second 路由，所以path为 /second 的选项被push进入路由渲染数组中，然后此路由还有childrens，进行递归，好家伙，当前路由和 /second/article 完全相等，所以也被push到了渲染数组中。最后我们得到了一个数组，包含两个路由选项，父路由下标0，子路由下标1，之前我们也将`router-view`做了层级标记，这样就能得到子`router-view`对应渲染的component了。
~nice

### 插件开发
先来一个cRouter文件夹，下面搞一个index.js，里面就是我们传统的router使用，上面有，然后再搞一个crouter.js:
```
import Link from './cLink'
import View from './cView'
var Vue
​
class cRouter {
  constructor(options) {
        this.$options = options
    this.courrentRoute = window.location.hash.slice(1) || '/'
    //定义一个响应式的路由渲染数组
        Vue.util.defineReactive(this,'routeMap',[])
        // 遍历匹配路由
    this.initRouterMap()
    // 初始化route改变事件
    this.initRouteChange()
  }
 
  initRouterMap(route) {
        let routes = route || this.$options.routes
        for (const routeItem of routes) {
            if (this.courrentRoute === '/' && routeItem.path === '/') {
                this.routeMap.push(routeItem)
                return
            }
​
            if (
            routeItem.path !== '/'
            && 
            this.courrentRoute.indexOf(routeItem.path) !== -1) {
                this.routeMap.push(routeItem)
                if (routeItem.childrens && routeItem.childrens.length > 0) {
                    this.initRouterMap(routeItem.childrens)
                }
                return
            }
        }
  }
​
  initRouteChange() {
    window.addEventListener('hashchange', this.routeChange.bind(this))
    window.addEventListener('load', this.routeChange.bind(this))
  }
​
  routeChange() {
        this.courrentRoute = window.location.hash.slice(1)
        this.routeMap = []
    this.initRouterMap()
  }
}
​
function install(_Vue) {
  Vue = _Vue
​
  Vue.mixin({
    beforeCreate() {
      if (this.$options.crouter) {
        Vue.prototype.$crouter = this.$options.crouter
      }
    },
  })
​
  Vue.component('router-link', Link)
​
  Vue.component('router-view', View)
}
​
export default {
  cRouter,
  install,
}
```
cview.js用来渲染router-view
```
export default {
    render(h) {
        // 将自身标记为一个router-view，避免和其他元素搞混
        this.$vnode.data.routerView = true
        let parent = this.$parent
        //默认自己层级为0
        let routeDeep = 0
​
        while(parent) {
            // 判断是否存在父元素并且父元素有值
            const vodeData = parent.$vnode && parent.$vnode.data
            if (vodeData) {
                // 如果父router-view是true，则自身层级增加
                if (vodeData.routerView) {
                    routeDeep++
                }
            }
            //继续寻找父元素，进行递归
            parent = parent.$parent
        }
​
        let component = null
        const route = this.$crouter.routeMap[routeDeep]
        if (route) {
            component = route.component
        }
        return h(component)
    }
}
```
cLink.js用来渲染router-link
```
export default {
    props: {
        to: {
            type: String,
            default: '/',
        },
    },
    render(h) {
        return h(
            'a',
            { attrs: { href: `#${this.to}` } },
            this.$slots.default
        )
    }
}
```
文章到这里,我们简单实现了类似`vue aouter`路由的功能。

大师兄想说的是:如今开源框架大大方便了我们的开发效率,但是单纯的使用三方框架并不能让我们学到更多知识,我们应该是研究去探索他的实现原理以及设计理念,去思考如果让我们设计一个框架,我们需要掌握哪些知识,该如何设计?
我想,这样的学习才能学到更多的知识~