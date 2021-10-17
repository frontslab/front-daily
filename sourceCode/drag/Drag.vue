<template>
    <div
        class="box"
    >
        <div class="content">
            <div
                id="content-bg"
                class="content-bg"
                :style="{backgroundImage: 'url('+path+slider.background+')'}"
            >
                <img
                    v-for="(item,index) in imageList"
                    :id="'a'+index"
                    :key="index"
                    :src="path+item.image"
                    :style="{top:item.y/100+'rem',left:item.x/100+'rem',width:item.width/100+'rem',height:item.height/100+'rem'}"
                    class="drag-item"
                >
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'DragImage',
    props: {
        pageData: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            slider: null,
            imageList: [],
            count: 0,
            disX: 0,
            disY: 0,
        };
    },
    mounted() {
        // 添加点击事件
        this.$nextTick(() => {
            for (let i = 0; i < this.imageList.length; i++) {
                this.btnclick(i);
            }
        });
    },
    methods: {
        //因涉及公司项目，此处只包含手写拖拽的主要源码
        // 点击元素事件
        btnclick(index) {
            console.log(`a${index}`);
            const son = document.getElementById(`a${index}`);
            const father = document.getElementById('content-bg');

            //触摸拖动
            this.dragTouch(father, son);
            //鼠标点击拖动
            this.dragMouse(father, son);
        },
        dragTouch(father, son) {
            let disX;
            let disY;
            const that = this;
            son.addEventListener('touchstart', (e) => {
                console.log('这是触摸', e, son);
                that.count += 1;
                // eslint-disable-next-line no-param-reassign
                son.style.zIndex = that.count;
                const oEvent = e.touches[0] || event.touches[0];
                // const oEvent = ev.touches[0];
                console.log('oEvent.clientX', oEvent.clientX);
                disX = oEvent.clientX - son.offsetLeft;
                disY = oEvent.clientY - son.offsetTop;
                that.isDrag = true;
                son.addEventListener('touchmove', (e) => {
                    console.log('touchsmove', e);
                    e.stopPropagation();
                    if (that.isDrag) {
                        // eslint-disable-next-line no-shadow
                        const oEvent = e.touches[0] || event.touches[0];
                        // const oEvent = ev.touches[0];
                        let l = oEvent.clientX - disX;
                        let t = oEvent.clientY - disY;
                        // 限定左边界和上边界
                        if (l < 0) {
                            l = 0;
                        }
                        if (t < 0) {
                            t = 0;
                        }
                        // 限定右边界的距离(当l=父元素宽-子元素宽时，刚好子元素放在父元素最右边)
                        if (l > father.clientWidth - son.clientWidth) {
                            l = father.clientWidth - son.clientWidth;
                        }
                        // 限定下边界的距离(当t=父元素高-子元素高时，刚好子元素放在父元素最下边)
                        if (t > father.clientHeight - son.clientHeight) {
                            t = father.clientHeight - son.clientHeight;
                        }
                        son.style.left = `${l}px`;
                        son.style.top = `${t}px`;
                    }
                });
                document.addEventListener('touchend', (e) => {
                    that.isDrag = false;
                });
            });
        },
        dragMouse(father, son) {
            let disX;
            let disY;
            const that = this;
            son.onmousedown = function (e) {
                console.log('这是鼠标', e, son);
                that.count += 1;
                son.style.zIndex = that.count;
                const oEvent = e || event;
                disX = oEvent.clientX - son.offsetLeft;
                disY = oEvent.clientY - son.offsetTop;
                that.isDrag = true;
                // 鼠标移动事件
                document.onmousemove = function (e) {
                    console.log('正在鼠标移动', e);
                    if (that.isDrag) {
                        const oEvent = e || event;
                        let l = oEvent.clientX - disX;
                        let t = oEvent.clientY - disY;
                        /** 限定拖拽范围，限定拖拽元素在指定的范围内 */
                        if (l < 0) {
                            l = 0;
                        }
                        if (t < 0) {
                            t = 0;
                        }
                        if (l > father.clientWidth - son.clientWidth) {
                            l = father.clientWidth - son.clientWidth;
                        }
                        if (t > father.clientHeight - son.clientHeight) {
                            t = father.clientHeight - son.clientHeight;
                        }
                        son.style.left = `${l}px`;
                        son.style.top = `${t}px`;
                    }
                };
                document.onmouseup = function () {
                    that.isDrag = false;
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
                return false; // 阻止默认行为，空的div在低版本ff下，第二次拖动手型会变异常
            };
        },
    },
};
</script>
<style lang="scss" scoped>
.box {
    .content {
        width: 16rem;
        height: 6rem;
        box-sizing: border-box;
        position: absolute;
        top: 2.36rem;
        left: 1rem;
        display: flex;
        justify-content: space-between;
        .content-bg {
            width: 10.24rem;
            height: 5.76rem;
            background-size: 10.24rem 5.76rem;
            border-radius: 0.2rem;
            position: relative;
            .drag-item {
                position: absolute;
            }
        }
    }
}
</style>