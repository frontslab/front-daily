export default {
    render(h) {
        // 将自身标记为一个router-view，避免和其他元素搞混
        this.$vnode.data.routerView = true
        let parent = this.$parent
        //默认自己层级为0
        let routeDeep = 0

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

        let component = null
        const route = this.$crouter.routeMap[routeDeep]
        if (route) {
            component = route.component
        }
        return h(component)
    }
}