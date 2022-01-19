//除chrome外，其他支持需要在服务器上运行才支持
    if(!window.localStorage){
        alert('不支持localstorage，抽奖无法启动！');
    }

    // 处理 localstorage 中奖数据
    var local_handle = {
        local_item: "lottery_datas",
        get: function( key ) {
            return window.localStorage.getItem( key ) || ''
        },

        set: function( key, val) {
            window.localStorage.setItem( key, val );
        },
        delete: function(datas, name) {
            var res = [];
            datas.forEach(function(val, index) {
                if (name != val.nameen) {
                    res.push(val);
                }
            });
            var new_datas = JSON.stringify(res);
            this.set(this.local_item, new_datas);
            return res;
        },
        clear: function() {
            window.localStorage.clear()
        }
    };

    var award_log = null;
    if (!local_handle.get("award_log")) {
        var award_log = window.localStorage.getItem('award_initial');
        award_log = JSON.parse(award_log);
    } else {
        var award_log = window.localStorage.getItem('award_log');
        award_log = JSON.parse(award_log);
    }


    // ---------------- 加载、渲染 滚动抽奖信息数据 ------------
    // 如果得不到数据，则从初始化数据中获取
    if (!local_handle.get("lottery_datas")) {
        var lottery_storage = window.localStorage.getItem('lottery_initial');
    } else {
        var lottery_storage = window.localStorage.getItem('lottery_datas');
    }
    var lottery_datas = JSON.parse(lottery_storage);
    $('#lottery-wrap').html( _.template($('#lotterycon-tpl').html(), lottery_datas));

    // ---------------- 加载、渲染 滚动抽奖信息数据 ------------
    if (local_handle.get("award_1")) {
        $('#award-01').show();
        var award1_storage = window.localStorage.getItem('award_1');
        var award1_datas = JSON.parse(award1_storage);
        award1_datas.forEach(function (val, key) {
            var award_tpl = $('#awardcon-tpl').html();
            var award_dom = substitute(award_tpl, val);
            $('#award-01 .win').append(award_dom)
        });
    }
    if (local_handle.get("award_2")) {
        $('#award-02').show();
        var award2_storage = window.localStorage.getItem('award_2');
        var award2_datas = JSON.parse(award2_storage);
        award2_datas.forEach(function (val, key) {
            var award_tpl = $('#awardcon-tpl').html();
            var award_dom = substitute(award_tpl, val);
            $('#award-02 .win').append(award_dom)
        });
    }
    if (local_handle.get("award_3")) {
        $('#award-03').show();
        var award3_storage = window.localStorage.getItem('award_3');
        var award3_datas = JSON.parse(award3_storage);
        award3_datas.forEach(function (val, key) {
            var award_tpl = $('#awardcon-tpl').html();
            var award_dom = substitute(award_tpl, val);
            $('#award-03 .win').append(award_dom)
        });
    }
    if (local_handle.get("award_4")) {
        $('#award04-toggle').css('display', 'inline-block');
        var award4_storage = window.localStorage.getItem('award_4');
        var award4_datas = JSON.parse(award4_storage);
        award4_datas.forEach(function (val, key) {
            var award_tpl = $('#awardcon-tpl').html();
            var award_dom = substitute(award_tpl, val);
            $('#award-04 .win').append(award_dom)
        });
    }


    // ---------------- 抽奖动画相关参数配置 ------------
    var nextFrame = window.requestAnimationFrame       ||
                    window.webkitRequestAnimationFrame ||
                    window.mozRequestAnimationFrame    ||
                    window.msRequestAnimationFrame     ||
                    function(callback) {
                        var currTime = + new Date,
                                delay = Math.max(1000/60, 1000/60 - (currTime - lastTime));
                        lastTime = currTime + delay;
                        return setTimeout(callback, delay);
                    },
                    cancelFrame = window.cancelAnimationFrame         ||
                            window.webkitCancelAnimationFrame         ||
                            window.webkitCancelRequestAnimationFrame  ||
                            window.mozCancelRequestAnimationFrame     ||
                            window.msCancelRequestAnimationFrame      ||
                            clearTimeout,
                    // 初始滚动速度
                    speed = 3,
                    // 每个对话框外部高度(包括padding与margin)
                    // 注：为了方便，这里统一设置为 132+28 = 160
                    item_outer_height = $('.lottery-list:eq(1)').outerHeight(true),
                    item_height = $('.lottery-list:eq(1)').outerHeight(),
                    // 单个抽奖框框的中间位置
                    left_center_top = item_height/2 - 20,
                    // 抽奖按钮
                    lottery_btn = $('#lottery-btn'),
                    // 是否移动
                    isMove = true,
                    // 抽奖是否开始
                    isStart = false,
                    // 设置抽奖锁
                    isLock = true,
                    // 是否可以关闭重开
                    can_stop = false,
                    // 初始移动是的定时动画变量
                    timer = null,
                    // 全局 setTimeout 定时任务指定变量
                    setout_time = null;

    // 嗯，just go ！
    function justGo (isMove) {
        var moveDom = document.getElementById('lottery-wrap'),
            wrapDom = document.getElementById('lottery-main'),
            move_height = moveDom.offsetHeight,
            wrap_height = wrapDom.offsetHeight,
            moveTop =  moveDom.offsetTop;
            var all_size = $('#lottery-wrap .lottery-list').size();
            // 随机生成停止位置的索引
            var start_index = Math.floor(Math.random() * (all_size - 4));
            var start_top = - item_outer_height * start_index;
            var moveY = start_top;

        $('#lottery-wrap').html($('#lottery-wrap').html() + $('#lottery-wrap').html());
//      $('#lottery-wrap').html($('#lottery-wrap').html());

        var justMove = function(flag) {
            timer = nextFrame(function() {
                moveY -= speed;
                moveDom.style.top = moveY + 'px';
                if (-(moveY) >= move_height) {
                    moveY = 0;
                }
                justMove(flag);
            });
        };

        if (isMove) {
            justMove(isMove);
        } else {
            return false;
        }
    }
	
	var interval;//定时器
    // 开始抽奖
    function startLottery() {
//  	$('#lottery-result').modal('hide');
//  	local_handle.clear();
//      window.location.reload();
        isStart = true;
        isMove = false;
        // 在进入本轮抽奖逻辑后，开启本轮抽奖锁
        isLock = true;
        // 设置抽奖按钮状态
        lottery_btn.text('正在滚动 ^_^');
        lottery_btn.css('background', '#FFBFB7');

        setout_time = setTimeout(function () {
            speed = 10;
        }, 1000);

        setout_time = setTimeout(function () {
            speed = 25;
        }, 2000);

        setout_time = setTimeout(function () {
            speed = 40;
        }, 3000);
        setout_time = setTimeout(function () {
            speed = 55;
        }, 4000);
        setout_time = setTimeout(function () {
        	
	        speed = 70;
	        $('#lottery-btn').text('可抽奖啦 @_@');
	//	             当速度达到最终的设置峰值是，isLock 将会解锁，此时，才可以停止动画
		    isLock = false;
        }, 5000);
    }
//加速
var time=0;
	function speedUp(resd){
		var timeinter;
		console.log(resd);
		speed=resd;
		if(speed>=70){
			timeinter = setInterval(function(){
				time++;
				console.log(time);
				if(time>=5){
					clearInterval(timeinter)
					stopLottery();
				}
			},1000)
		}else{
			time=0;
		}
	}
	//减速
	function speedCut(resd){
		console.log(resd);
		speed=resd;
		time=0;
	}
	//关闭提示框
	function closeToolTip(){
	    if (!can_stop) {
	        console.error('还没结束，无法重开！');
	        return false;
	    }
	    $('#lottery-result').modal('hide');
	}
    // 结束抽奖
    function stopLottery() {
        var moveDom = document.getElementById('lottery-wrap');

        // 当isLock 锁还没解锁时， 此时不能停止抽奖，将会抛出没结束的异常
        if (isLock) {
            console.log('还没结束，请稍等...');
            return;
        }else{
        	clearInterval(interval)
        }
        isStart = false;
        isMove = false;
        speed = 8;

        /*-------- 随机数停止方案 --------*/
        // 获取当前总的抽奖框
        var lottery_size = $('#lottery-wrap .lottery-list').size();
        // 随机生成停止位置的索引
		if(lottery_size>4){
			var stop_index = Math.floor(Math.random() * (lottery_size - 4));
			}else{
				var stop_index = Math.floor(Math.random() * 2);
			}
	        if(lottery_size>4){
			// 将整个抽奖块移动到停止索引所在位置 top 值
			var stop_top = item_outer_height * stop_index;
			//        $('#lottery-wrap').css('top', -stop_top);
		
			// 停止动画时要走的距离，即再走三个索引（即两个框+半个框的距离）
			var left_distance = Math.floor(item_outer_height * 2 + (item_outer_height - item_height));
			var sure_index = stop_index + 4;
		}else{
			// 将整个抽奖块移动到停止索引所在位置 top 值
			var stop_top = 0;
			//        $('#lottery-wrap').css('top', -stop_top);
			// 停止动画时要走的距离，即再走三个索引（即两个框+半个框的距离）
			var left_distance = 156;
			var sure_index = stop_index;
		}
		

        // 移动到要到达的指定位置
        var lastStep = function() {
            time02 = nextFrame(function() {
                top -= 2;//移动距离
                moveDom.style.top = (-stop_top + top) + 'px';
                if (-top <= left_distance) {
                    lastStep();
                } else {
                    cancelFrame(time02);
                    // 处理中奖后的相关样式效果
                    $('#lottery-wrap .lottery-list').eq(sure_index).addClass('sure-active');
                    var award_tpl = $('#awardcon-tpl').html();
                    var award_dom = substitute(award_tpl, award_tmp);
                    $('#award-0'+award).show();
                    if (award == 4) {
                        $('#award-123').hide();
                        $('#award-04').show();
                        $('#award04-toggle').css('display', 'inline-block');
                    }
                    $('#award-0'+award+' .win').append(award_dom);
                }
            });
        };
        lastStep();-
        // 停止动画
        cancelFrame(timer);

        var award = $('#lottery-btn').data('award');
        var lottery_name_zh = $('#lottery-wrap .lottery-list').eq(sure_index).data('namezh');
        var lottery_name_en = $('#lottery-wrap .lottery-list').eq(sure_index).data('nameen');

        // 移动完剩下的尺度
        var top = 0;
        var time02 = null;
        // 最后的倒计时
        $('.stop-main').fadeIn();
//        $('#stop-time').fadeIn();
        var stop_time = setTimeout(function() {
            $('#stop-time').fadeIn();
            $('#stop-time').text('贰');
            $('#stop-time').fadeOut();
        }, 1000);
        stop_time = setTimeout(function() {
            $('#stop-time').fadeIn();
            $('#stop-time').text('壹');
        }, 2000);
        stop_time = setTimeout(function() {
            $('#stop-time').fadeOut();
            clearTimeout(stop_time);
            $('.stop-main').hide();
        }, 2500);

        // 向 localstorage 中写入中奖人数据
        var local_award = local_handle.get('award_'+award);
        var award_tmp = null;
        if (local_award) {
            var award_datas = JSON.parse(local_award);
            award_tmp = {
                'nameen': lottery_name_en,
                'namezh': lottery_name_zh
            };
            award_datas.push(award_tmp);
            local_handle.set("award_"+award, JSON.stringify(award_datas));
        } else {
            var award_datas = [];
            award_tmp = {
                'nameen': lottery_name_en,
                'namezh': lottery_name_zh
            };
            award_datas.push(award_tmp);
            local_handle.set("award_"+award, JSON.stringify(award_datas));
        }
        // 写入上次抽中的奖项记录
        local_handle.set("award_history", award);

        // 删除已经中奖的人数据
        local_handle.delete(lottery_datas, lottery_name_en);
        // 该项奖项将减1
        award_log['award0'+award] -= 1;
        local_handle.set('award_log', JSON.stringify(award_log));

        // 绘制最后出现的中奖canvas图
//      drawAward(award, lottery_name_zh, lottery_name_en);

        // 为防止最后出现空白
        $('#lottery-wrap').html($('#lottery-wrap').html() + $('#lottery-wrap').html());

        setTimeout(function(){
		
			$('#lottery-result').modal('show');
			$("#canvas").css("opacity","0");
			$(".modal-backdrop.in").css("opacity","0");
			window.addEventListener("resize",()=>{
				canvas.width=canvas.clientWidth;
				canvas.height=canvas.clientHeight;
				cx=canvas.width/2;
				cy=canvas.height/2;
			});
			//烟花
			initVars();
			frame();
			
		},1*1000)
		setTimeout(function(){
			$("#canvas").css("opacity","0.7");
			$(".modal-backdrop.in").css("opacity","0.5");
			can_stop = true;
			clearTimeout(arguments.callee);
			//中奖信息
			drawAward(award, lottery_name_zh, lottery_name_en);
			$(".modal-content #lottery-canvas").css("display","block")
		},4000)
		//自动关闭中奖提示框
		setTimeout(function() {
			closeToolTip();
			clearTimeout(arguments.callee);
	//		//结束回调
			window.external.callbackStopLottery();
		}, 66*1000)
   }
	// canvas 绘制中奖结果
	function drawAward(award, name_zh, name_en, pic_format) {
		var canvas = document.getElementById('lottery-canvas');
		var context = canvas.getContext('2d');
		if(!pic_format) {
			pic_format = 'png';
		}
		canvas.width = 445;
		canvas.height = 600;
		var back_img = new Image();
//		var avatar = new Image();
		//      avatar.src = './img/avatar/'+name_en+'.jpg';
		back_img.src = './img/award_' + 0 + '.' + pic_format;
		back_img.onload = function() {
//		context.drawImage(back_img, 0, 0);
	
			// 绘制圆形头像
			//          circleImg(context, avatar, 158, 178 , 200);
			 // 设置文字阴影的颜色为黑色，透明度为20%
		    context.shadowColor = 'rgba(0, 0, 0, 0.4)';
		    // 将阴影向右移动15px，向上移动10px
		    context.shadowOffsetX = 4;
		    context.shadowOffsetY = 4;
		    // 轻微模糊阴影
		    context.shadowBlur = 4;
			context.fillStyle = '#FFFFFF';
			context.font = "bold 100px fantasy";
			//          if (name_zh.length <= 2) {
			//              context.fillText("456456", 300, 400);
			//          } else if (name_zh.length >= 3) {
			name_zh=name_zh.toString();
			var name_str="";
			for (var i=0;i<name_zh.length;i++) {
				if(i!=name_zh.length){
					name_str+=name_zh.substring(i,i+1)+" ";
				}else{
					name_str+=name_zh.substring(i,i+1);
				}
				
			}
	//		=name_zh.substring(0,1)+" "+name_zh.substring(1,2)+" "+name_zh.substring(2,3)+" "+name_zh.substring(3,4);
			context.fillText(name_str, 90, 385);
	//		context.fillText(name_str, 155, 618);
			//          }
		};
	}
	//烟花特效
function initVars(){

	pi=Math.PI;
	ctx=canvas.getContext("2d");
	canvas.width=canvas.clientWidth;
	canvas.height=canvas.clientHeight;
	cx=canvas.width/2;
	cy=canvas.height/2;
	playerZ=-25;
	playerX=playerY=playerVX=playerVY=playerVZ=pitch=yaw=pitchV=yawV=0;
	scale=600;
	seedTimer=0;seedInterval=5,seedLife=100;gravity=.02;
	seeds=new Array();
	sparkPics=new Array();
	s="img/";
	for(i=1;i<=10;++i){
		sparkPic=new Image();
		sparkPic.src=s+"spark"+i+".png";
		sparkPics.push(sparkPic);
	}
	sparks=new Array();
	pow1=new Audio(s+"pow1.mp3");
	pow2=new Audio(s+"pow2.mp3");
	pow3=new Audio(s+"pow3.mp3");
	pow4=new Audio(s+"pow4.mp3");
	frames = 0;
}

function rasterizePoint(x,y,z){

	var p,d;
	x-=playerX;
	y-=playerY;
	z-=playerZ;
	p=Math.atan2(x,z);
	d=Math.sqrt(x*x+z*z);
	x=Math.sin(p-yaw)*d;
	z=Math.cos(p-yaw)*d;
	p=Math.atan2(y,z);
	d=Math.sqrt(y*y+z*z);
	y=Math.sin(p-pitch)*d;
	z=Math.cos(p-pitch)*d;
	var rx1=-1000,ry1=1,rx2=1000,ry2=1,rx3=0,ry3=0,rx4=x,ry4=z,uc=(ry4-ry3)*(rx2-rx1)-(rx4-rx3)*(ry2-ry1);
	if(!uc) return {x:0,y:0,d:-1};
	var ua=((rx4-rx3)*(ry1-ry3)-(ry4-ry3)*(rx1-rx3))/uc;
	var ub=((rx2-rx1)*(ry1-ry3)-(ry2-ry1)*(rx1-rx3))/uc;
	if(!z)z=.000000001;
	if(ua>0&&ua<1&&ub>0&&ub<1){
		return {
			x:cx+(rx1+ua*(rx2-rx1))*scale,
			y:cy+y/z*scale,
			d:Math.sqrt(x*x+y*y+z*z)
		};
	}else{
		return {
			x:cx+(rx1+ua*(rx2-rx1))*scale,
			y:cy+y/z*scale,
			d:-1
		};
	}
}

function spawnSeed(){
	
	seed=new Object();
	seed.x=-50+Math.random()*100;
	seed.y=25;
	seed.z=-50+Math.random()*100;
	seed.vx=.1-Math.random()*.2;
	seed.vy=-1.5;//*(1+Math.random()/2);
	seed.vz=.1-Math.random()*.2;
	seed.born=frames;
	seeds.push(seed);
}

function splode(x,y,z){
	
	t=5+parseInt(Math.random()*150);
	sparkV=1+Math.random()*2.5;
	type=parseInt(Math.random()*3);
	switch(type){
		case 0:
			pic1=parseInt(Math.random()*10);
			break;
		case 1:
			pic1=parseInt(Math.random()*10);
			do{ pic2=parseInt(Math.random()*10); }while(pic2==pic1);
			break;
		case 2:
			pic1=parseInt(Math.random()*10);
			do{ pic2=parseInt(Math.random()*10); }while(pic2==pic1);
			do{ pic3=parseInt(Math.random()*10); }while(pic3==pic1 || pic3==pic2);
			break;
	}
	for(m=1;m<t;++m){
		spark=new Object();
		spark.x=x; spark.y=y; spark.z=z;
		p1=pi*2*Math.random();
		p2=pi*Math.random();
		v=sparkV*(1+Math.random()/6)
		spark.vx=Math.sin(p1)*Math.sin(p2)*v;
		spark.vz=Math.cos(p1)*Math.sin(p2)*v;
		spark.vy=Math.cos(p2)*v;
		switch(type){
			case 0: spark.img=sparkPics[pic1]; break;
			case 1:
				spark.img=sparkPics[parseInt(Math.random()*2)?pic1:pic2];
				break;
			case 2:
				switch(parseInt(Math.random()*3)){
					case 0: spark.img=sparkPics[pic1]; break;
					case 1: spark.img=sparkPics[pic2]; break;
					case 2: spark.img=sparkPics[pic3]; break;
				}
				break;
		}
		spark.radius=25+Math.random()*50;
		spark.alpha=1;
		spark.trail=new Array();
		sparks.push(spark);
	}
	switch(parseInt(Math.random()*4)){
		case 0:	pow=new Audio(s+"pow1.mp3"); break;
		case 1:	pow=new Audio(s+"pow2.mp3"); break;
		case 2:	pow=new Audio(s+"pow3.mp3"); break;
		case 3:	pow=new Audio(s+"pow4.mp3"); break;
	}
	d=Math.sqrt((x-playerX)*(x-playerX)+(y-playerY)*(y-playerY)+(z-playerZ)*(z-playerZ));
	pow.volume=1.5/(1+d/10);
	pow.play();
}

function doLogic(){
	
	if(seedTimer<frames){
		seedTimer=frames+seedInterval*Math.random()*5;
		spawnSeed();
	}
	for(i=0;i<seeds.length;++i){
		seeds[i].vy+=gravity;
		seeds[i].x+=seeds[i].vx;
		seeds[i].y+=seeds[i].vy;
		seeds[i].z+=seeds[i].vz;
		if(frames-seeds[i].born>seedLife){
			splode(seeds[i].x,seeds[i].y,seeds[i].z);
			seeds.splice(i,1);
		}
	}
	for(i=0;i<sparks.length;++i){
		if(sparks[i].alpha>0 && sparks[i].radius>5){
			sparks[i].alpha-=.01;
			sparks[i].radius/=1.02;
			sparks[i].vy+=gravity;
			point=new Object();
			point.x=sparks[i].x;
			point.y=sparks[i].y;
			point.z=sparks[i].z;
			if(sparks[i].trail.length){
				x=sparks[i].trail[sparks[i].trail.length-1].x;
				y=sparks[i].trail[sparks[i].trail.length-1].y;
				z=sparks[i].trail[sparks[i].trail.length-1].z;
				d=((point.x-x)*(point.x-x)+(point.y-y)*(point.y-y)+(point.z-z)*(point.z-z));
				if(d>9){
					sparks[i].trail.push(point);
				}
			}else{
				sparks[i].trail.push(point);
			}
			if(sparks[i].trail.length>5)sparks[i].trail.splice(0,1);				
			sparks[i].x+=sparks[i].vx;
			sparks[i].y+=sparks[i].vy;
			sparks[i].z+=sparks[i].vz;
			sparks[i].vx/=1.075;
			sparks[i].vy/=1.075;
			sparks[i].vz/=1.075;
		}else{
			sparks.splice(i,1);
		}
	}
	p=Math.atan2(playerX,playerZ);
	d=Math.sqrt(playerX*playerX+playerZ*playerZ);
	d+=Math.sin(frames/80)/1.25;
	t=Math.sin(frames/200)/40;
	playerX=Math.sin(p+t)*d;
	playerZ=Math.cos(p+t)*d;
	yaw=pi+p+t;
}

function rgb(col){
	
	var r = parseInt((.5+Math.sin(col)*.5)*16);
	var g = parseInt((.5+Math.cos(col)*.5)*16);
	var b = parseInt((.5-Math.sin(col)*.5)*16);
	return "#"+r.toString(16)+g.toString(16)+b.toString(16);
}

function draw(){
	
	ctx.clearRect(0,0,cx*2,cy*2);
	
//	ctx.fillStyle="#ff8";
	ctx.fillStyle="#fff";
//	for(i=-100;i<100;i+=3){
//		for(j=-100;j<100;j+=4){
//			x=i;z=j;y=25;
//			point=rasterizePoint(x,y,z);
//			if(point.d!=-1){
//				size=250/(1+point.d);
//				d = Math.sqrt(x * x + z * z);
//				a = 0.75 - Math.pow(d / 100, 6) * 0.75;
//				if(a>0){
//					ctx.globalAlpha = a;
//					ctx.fillRect(point.x-size/2,point.y-size/2,size,size);				
//				}
//			}
//		}
//	}
	ctx.globalAlpha=1;
	for(i=0;i<seeds.length;++i){
		point=rasterizePoint(seeds[i].x,seeds[i].y,seeds[i].z);
		if(point.d!=-1){
			size=200/(1+point.d);
			ctx.fillRect(point.x-size/2,point.y-size/2,size,size);
		}
	}
	point1=new Object();
	for(i=0;i<sparks.length;++i){
		point=rasterizePoint(sparks[i].x,sparks[i].y,sparks[i].z);
		if(point.d!=-1){
			size=sparks[i].radius*200/(1+point.d);
			if(sparks[i].alpha<0)sparks[i].alpha=0;
			if(sparks[i].trail.length){
				point1.x=point.x;
				point1.y=point.y;
				switch(sparks[i].img){
					case sparkPics[0]:ctx.strokeStyle="#f84";break;
					case sparkPics[1]:ctx.strokeStyle="#84f";break;
					case sparkPics[2]:ctx.strokeStyle="#8ff";break;
					case sparkPics[3]:ctx.strokeStyle="#fff";break;
					case sparkPics[4]:ctx.strokeStyle="#4f8";break;
					case sparkPics[5]:ctx.strokeStyle="#f44";break;
					case sparkPics[6]:ctx.strokeStyle="#f84";break;
					case sparkPics[7]:ctx.strokeStyle="#84f";break;
					case sparkPics[8]:ctx.strokeStyle="#fff";break;
					case sparkPics[9]:ctx.strokeStyle="#44f";break;
				}
				for(j=sparks[i].trail.length-1;j>=0;--j){
					point2=rasterizePoint(sparks[i].trail[j].x,sparks[i].trail[j].y,sparks[i].trail[j].z);
					if(point2.d!=-1){
						ctx.globalAlpha=j/sparks[i].trail.length*sparks[i].alpha/2;
						ctx.beginPath();
						ctx.moveTo(point1.x,point1.y);
						ctx.lineWidth=1+sparks[i].radius*10/(sparks[i].trail.length-j)/(1+point2.d);
						ctx.lineTo(point2.x,point2.y);
						ctx.stroke();
						point1.x=point2.x;
						point1.y=point2.y;
					}
				}
			}
			ctx.globalAlpha=sparks[i].alpha;
			ctx.drawImage(sparks[i].img,point.x-size/2,point.y-size/2,size,size);
		}
	}
}

function frame(){

	if(frames>100000){
		seedTimer=0;
		frames=0;
	}
	frames++;
	draw();
	doLogic();
	requestAnimationFrame(frame);
}

    function circleImg(ctx, img, x, y, r) {
        ctx.save();
        var d = 2 * r;
        var cx = x + r;
        var cy = y + r;
        ctx.arc(cx, cy, r, 0, 2 * Math.PI);
        ctx.clip();
        ctx.drawImage(img, x, y, d, d);
        ctx.restore();
    }

    // 简单的模板替换引擎
    function substitute(str,o,regexp){
        return  str.replace(regexp || /\\?\{([^{}]+)\}/g, function (match, name) {
            return (o[name] === undefined) ? '' : o[name];
        });
    }

    $(function(){

        justGo(isMove);

        // 关闭中奖后弹出的 modal
        $('#modal-close').click(function() {
            if (!can_stop) {
                console.error('还没结束，无法重开！');
                return false;
            }
            $('#lottery-result').modal('hide');
        });
        
        // 音乐开关
        var music_local = (local_handle.get('music') == '') ? '1' : local_handle.get('music');
        var music_config = {
            music: document.getElementById('music'),
            music_bool: (music_local == '1'),
            init: function() {
                if (this.music_bool) {
//                  this.play();
                } else {
//                  this.music.pause();
                }
            },
            play: function() {
                this.music.play();
                $('#music-control').addClass('animated infinite bounce');
                local_handle.set('music', 1);
                this.music_bool = true
            },
            pause: function() {
                this.music.pause();
                $('#music-control').removeClass('animated infinite bounce');
                local_handle.set('music', 0);
                this.music_bool = false;
            }
        };
        music_config.init();
        $('#music-control').click(function () {
            if (music_config.music_bool) {
                music_config.pause()
            } else {
                music_config.play();
            }
        });

        // 清除数据开关
        $('#clear-control').click(function () {
            var sure = confirm('警告：确定清除所有数据？！');
            if (sure) {
                local_handle.clear();
                window.location.reload();
            }
        });

        // 控制：显示/隐藏 抽奖名单和抽奖奖品显示
        if (local_handle.get("mingdan_toggle") == 1) {
            $('#mingdan-con').slideDown();
            $('#mingdan').hide();
        } else {
            $('#mingdan-con').hide();
            $('#mingdan').show();
        }
        if (local_handle.get("liwu_toggle") == 1) {
            $('#liwu-con').slideDown();
            $('#liwu').hide();
        } else {
            $('#liwu-con').hide();
            $('#liwu').show();
        }

        $('#mingdan').click(function () {
            $(this).fadeIn();
            $('#mingdan-con').slideDown(1000);
            local_handle.set("mingdan_toggle", 1);
        });
        $('#mingdan-title').click(function() {
            $('#mingdan-con').slideUp(1000);
            $('#mingdan').show();
            local_handle.set("mingdan_toggle", 0);
        });
        $('#liwu').click(function () {
            $(this).fadeOut();
            $('#liwu-con').slideDown(1000);
            local_handle.set("liwu_toggle", 1);
        });
        $('#liwu-title').click(function() {
            $('#liwu-con').slideUp(1000);
            $('#liwu').show();
            local_handle.set("liwu_toggle", 0);
        });

        // 控制：显示/隐藏纪念奖
        var award_history = local_handle.get('award_history');
        if (award_history == 4) {
            $('#award-04').show();
            $('#award-123').hide();
        }
        $('#award04-toggle').click(function() {
            if ($('#award-04').is(":hidden")) {
                $('#award-04').show();
            } else {
                $('#award-04').hide();
            }

            if ($('#award-123').is(":hidden")) {
                $('#award-123').show();
            } else {
                $('#award-123').hide();
            }
        });

        // 控制奖项的选择
        // 1: 一等奖
        // 2: 二等奖
        // 3: 三等奖
        // 4: 纪念奖
        var select_award = local_handle.get('select_award');
        if (select_award) {
            $('.award').eq(select_award-1).addClass('award-active');
            $('#lottery-btn').data('award', select_award);
        } else {
            $('.award').eq(3).addClass('award-active');
            $('#lottery-btn').data('award', 4);
        }
        $('.award').click(function () {
            if (isStart) {
                console.error('正在抽奖ing，不允许更改奖项设置哦 ^_^');
                return false;
            }
            local_handle.set('select_award', $(this).data('award'));
            $('#lottery-btn').data('award', $(this).data('award'));
            $(this).addClass(function () {
                return $(this).hasClass('award-active') ? false : 'award-active';
           }).siblings('.award').removeClass('award-active')
        });
		//开始抽奖fun
		var lottery_btn_fun=function(){
			var lottery_size = $('#lottery-wrap .lottery-list').size();
            var cur_lottery = $('#lottery-btn').data('award');
            if (!cur_lottery) {
                alert('请先设置好奖项再抽奖哦 ^_^');
                return;
            }

            if (award_log['award0'+cur_lottery] <= 0) {
                alert('该奖项已经抽完啦，请选择其它奖项哦 ^_^！');
                return;
            }

            // 当本轮抽奖结束后，抽奖将会进入短暂休眠期，此时将不会响应抽奖行为
            if (!isStart && !isMove) {
                console.log('本轮已结束');
                window.location.reload();
                return false;
            }

            if (!isStart && isMove) {
                startLottery();
            } else if(isStart) {
                stopLottery();
            }
		}
        // 开始抽奖按钮
        lottery_btn.click(lottery_btn_fun);

        // 执行空格键操作，等价于执行 “抽奖按钮点击” 操作
        $(document).keypress(function (e) {
            if (e.keyCode == 32) {
                lottery_btn.click();
            }
            // 一、二、三、纪念奖
            if (e.keyCode == 49) {
                $('#award-1').click();
            }
            if (e.keyCode == 50) {
                $('#award-2').click();
            }
            if (e.keyCode == 51) {
                $('#award-3').click();
            }
            if (e.keyCode == 52) {
                $('#award-4').click();
            }
            // Enter 按键
            if (e.keyCode == 13) {
                //关闭弹窗
                $('#modal-close').click();
            }
            // delete按键
            if (e.keyCode == 46) {
                $('#clear-control').click();
            }
        });
	var rooltop=0;
	var rollheight=$("#roll").height();
	var rolldivheight=$("#roll-div").height()/2;
	var rooldinterval= setInterval(function(){
		rooltop=rooltop-2;
		if(Math.abs(rooltop)>(rolldivheight-rollheight)){
			rooltop=0;
		}
		$("#roll-div").css("top",rooltop + "px");
	},30)
    });