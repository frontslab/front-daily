<template>
	<div class="container">
		<div id="tui-image-editor"></div>
	</div>
</template>
<script>
	import 'tui-image-editor/dist/tui-image-editor.css'
	import 'tui-color-picker/dist/tui-color-picker.css'
	import ImageEditor from 'tui-image-editor'
	const locale_zh = {
		ZoomIn: '放大',
		ZoomOut: '缩小',
		Hand: '手掌',
		History: '历史',
		Resize: '调整宽高',
		Crop: '裁剪',
		DeleteAll: '全部删除',
		Delete: '删除',
		Undo: '撤销',
		Redo: '反撤销',
		Reset: '重置',
		Flip: '镜像',
		Rotate: '旋转',
		Draw: '画',
		Shape: '形状标注',
		Icon: '图标标注',
		Text: '文字标注',
		Mask: '遮罩',
		Filter: '滤镜',
		Bold: '加粗',
		Italic: '斜体',
		Underline: '下划线',
		Left: '左对齐',
		Center: '居中',
		Right: '右对齐',
		Color: '颜色',
		'Text size': '字体大小',
		Custom: '自定义',
		Square: '正方形',
		Apply: '应用',
		Cancel: '取消',
		'Flip X': 'X 轴',
		'Flip Y': 'Y 轴',
		Range: '区间',
		Stroke: '描边',
		Fill: '填充',
		Circle: '圆',
		Triangle: '三角',
		Rectangle: '矩形',
		Free: '曲线',
		Straight: '直线',
		Arrow: '箭头',
		'Arrow-2': '箭头2',
		'Arrow-3': '箭头3',
		'Star-1': '星星1',
		'Star-2': '星星2',
		Polygon: '多边形',
		Location: '定位',
		Heart: '心形',
		Bubble: '气泡',
		'Custom icon': '自定义图标',
		'Load Mask Image': '加载蒙层图片',
		Grayscale: '灰度',
		Blur: '模糊',
		Sharpen: '锐化',
		Emboss: '浮雕',
		'Remove White': '除去白色',
		Distance: '距离',
		Brightness: '亮度',
		Noise: '噪音',
		'Color Filter': '彩色滤镜',
		Sepia: '棕色',
		Sepia2: '棕色2',
		Invert: '负片',
		Pixelate: '像素化',
		Threshold: '阈值',
		Tint: '色调',
		Multiply: '正片叠底',
		Blend: '混合色',
		Width: '宽度',
		Height: '高度',
		'Lock Aspect Ratio': '锁定宽高比例'

	}
	export default {
		data() {
			return {
				instance: null,
			};
		},
		mounted() {
			this.init();
		},
		methods: {
			init() {
				this.instance = new ImageEditor(document.querySelector('#tui-image-editor'), {
					includeUI: {
						loadImage: {
							path: "src/assets/wallhaven-1jvld9.jpg",
							name: 'image'
						},
						menu: ['resize', 'crop', 'rotate', 'draw', 'shape', 'icon', 'text',
						'filter'], // 底部菜单按钮列表 隐藏镜像flip和遮罩mask
						initMenu: 'draw', // 默认打开的菜单项
						menuBarPosition: 'bottom', // 菜单所在的位置
						locale: locale_zh, // 本地化语言为中文
					},
					cssMaxWidth: 1000, // canvas 最大宽度
					cssMaxHeight: 800 // canvas 最大高度

				})
				document.getElementsByClassName('tui-image-editor-main')[0].style.top = '80px' // 调整图片显示位置
			},
		},
	};
</script>

<style lang="css" scoped>
	.container {
		height: 900px;
	}
</style>
