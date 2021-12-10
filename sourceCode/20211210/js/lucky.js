const myLucky = new LuckyCanvas.LuckyGrid('#my-lucky', {
	width: '500px',
	height: '500px',
	blocks: [{
			padding: '10px',
			background: '#869cfa',
			borderRadius: '10px'
		},
		{
			padding: '10px',
			background: '#e9e8fe',
			borderRadius: '10px'
		},
	],
	prizes: [{
			x: 0,
			y: 0,
			imgs: [{
				src: './img/aaa.png',
				width: '50%',
				top: '20%'
			}],
			fonts: [{
				text: '谢谢惠顾',
				top: '75%'
			}]
		},
		{
			x: 1,
			y: 0,
			imgs: [{
				src: './img/bbb.png',
				width: '50%',
				top: '20%'
			}],
			fonts: [{
				text: 'IPhone 13 Pro',
				top: '75%'
			}]
		},
		{
			x: 2,
			y: 0,
			imgs: [{
				src: './img/ccc.png',
				width: '50%',
				top: '20%'
			}],
			fonts: [{
				text: '520红包',
				top: '75%'
			}]
		},
		{
			x: 2,
			y: 1,
			imgs: [{
				src: './img/aaa.png',
				width: '50%',
				top: '20%'
			}],
			fonts: [{
				text: '么么哒一个',
				top: '75%'
			}]
		},
		{
			x: 2,
			y: 2,
			imgs: [{
				src: './img/ccc.png',
				width: '50%',
				top: '20%'
			}],
			fonts: [{
				text: '口红一支',
				top: '75%'
			}]
		},
		{
			x: 1,
			y: 2,
			imgs: [{
				src: './img/bbb.png',
				width: '50%',
				top: '20%'
			}],
			fonts: [{
				text: '香水一瓶',
				top: '75%'
			}]
		},
		{
			x: 0,
			y: 2,
			imgs: [{
				src: './img/ccc.png',
				width: '50%',
				top: '20%'
			}],
			fonts: [{
				text: '清空购物车',
				top: '75%'
			}]
		},
		{
			x: 0,
			y: 1,
			imgs: [{
				src: './img/bbb.png',
				width: '50%',
				top: '20'
			}],
			fonts: [{
				text: '洗袜子一个月',
				top: '75%'
			}]
		},
	],
	buttons: [{
		x: 1,
		y: 1,
		row: 1,
		col: 1,
		background: 'rgba(0,0,0,0)',
		imgs: [{
			src: './img/go.gif',
			width: '100%',
			height: '100%',
		}],
	}, ],
	defaultStyle: {
		background: '#b8c5f2'
	},
	defaultConfig: {
		speed: 10
	},
	start: function() {
		myLucky.play()
		// 假设接口的请求速度是1s
		setTimeout(_ => {
			myLucky.stop(Math.floor((Math.random()*6)))
		}, 1000)
	},
	end: function(prize) {
		alert('恭喜中奖: ' + prize.fonts[0].text)
	}
})
