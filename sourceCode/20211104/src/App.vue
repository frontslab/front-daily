<template>
	<div id="app">
		<div class="player-container">
			<vue-core-video-player :src="videoSource" :cover="cover" :title= "title"  autoplay :loop="true"/>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'app',
		data() {
			return {
				videoSource: [{
					src: 'https://media.vued.vanthink.cn/sparkle_your_name_am360p.mp4',
					resolution: 360,
				}, {
					src: 'https://media.vued.vanthink.cn/sparkle_your_name_am720p.mp4',
					resolution: 720,
				}, {
					src: 'https://media.vued.vanthink.cn/y2mate.com%20-%20sparkle_your_name_amv_K_7To_y9IAM_1080p.mp4',
					resolution: 1080
				}],
				cover : "https://img1.wxzxzj.com/vpc-example-cover-your-name-c.png",
				title : "你的名字"
			}
		},
		methods: {
			paly() {
				console.log("play");
			},
			pause(){
				console.log("pause");
			}
		}

	}
</script>

<style>
	#app {
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		color: #2c3e50;
	}

	.player-container {
		width: 1080px;
		height: 720px;
	}
</style>
