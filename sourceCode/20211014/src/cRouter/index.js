import Link from './cLink'
import View from './cView'
var Vue

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

	initRouteChange() {
		window.addEventListener('hashchange', this.routeChange.bind(this))
		window.addEventListener('load', this.routeChange.bind(this))
	}

	routeChange() {
        this.courrentRoute = window.location.hash.slice(1)
        this.routeMap = []
		this.initRouterMap()
	}
}

function install(_Vue) {
	Vue = _Vue

	Vue.mixin({
		beforeCreate() {
			if (this.$options.crouter) {
				Vue.prototype.$crouter = this.$options.crouter
			}
		},
	})

	Vue.component('router-link', Link)

	Vue.component('router-view', View)
}

export default {
	cRouter,
	install,
}
