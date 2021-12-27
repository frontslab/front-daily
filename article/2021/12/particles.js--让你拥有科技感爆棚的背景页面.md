炫酷狂拽叼炸天站点

粒子 就是这个科技范儿~~爽~倍儿爽~

大家好！我是前端实验室的大师兄。
今天直上主题：particles.js

A lightweight JavaScript library for creating particles.
一个轻量级的创建粒子背景的 JavaScript 库。

particles.js用来在 web 中创建炫酷的浮动粒子特效。它调用的粒子动画效果，让网页背景更有科技感。颜色还可以任意切换哦。

我们先来看一下效果图：
标准版：

星空版：

泡泡版：

下雪版：

利用这个我们可以做些什么呢？

做网站一个好的UI界面很重要，如果在背景上加上炫酷的粒子特效会使网页更加大气。particles.js插件实现的这种散射的原子颗粒特效还不错的。
我觉得这个比较适合用在无背景的页面，或者说找不到合适的图片来做背景时，我们都可以使用这个。
比如说：

嗯，效果都挺不错的。

那么，下面将介绍如何使用 particles.js 。

particlesJS 开源在Github上：https://github.com/VincentGarreau/particles.js

这个项目中有提供demo，可以直接下载这个项目，打开demo里面的index.html文件，即可看到效果。

那么，如果我们要构建自己的项目，该如何引入文件呢？


particles.js 是它的库，我们肯定是要引入的，app.js 是参数配置文件，我们也要引入，而 demo 中的 stats.js 就没有必要引入了。
style.css 我们也可以引入，背景颜色是在css中设置的。

基于这个模板，我们可以在上面添加我们想要实现的功能，比如说注册登录功能，需要注意的是：
用 div 来封装我们要实现的功能代码块，并且在 css 中为这个 div 设置绝对定位。

下面介绍参数配置文件 app.js 文件的使用：

particles.number.value ： 粒子的数量

particles.number.density ： 粒子的稀密程度

particles.number.density.enable ： 启用粒子的稀密程度 （true 或 false）

particles.number.density.value_area ： 每一个粒子占据的空间（启用粒子密度，才可用）

particles.color.value ： 粒子的颜色 （支持16进制”#b61924”，rgb”{r:182, g:25, b:36}”，hsl，以及random）

particles.shape.type： 粒子的形状 （”circle” “edge” “triangle” “polygon” “star” “image”）

particles.opacity.value： 粒子的透明度

particles.size.anim.enable： 是否启用粒子速度（true/false）

particles.size.anim.speed： 粒子动画频率

particles.size.anim.sync： 粒子运行速度与动画是否同步

particles.move.speed： 粒子移动速度

大家可以根据这些配置文件，配置自己喜欢的背景出来，下面提供两份完整配置文件 app.js。
配置文件一（经典背景）：

{
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "polygon",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "repulse"
      },
      "onclick": {
        "enable": true,
        "mode": "push"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 400,
        "size": 40,
        "duration": 2,
        "opacity": 8,
        "speed": 3
      },
      "repulse": {
        "distance": 200,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": false
}

配置文件二（星空背景）：

{
  "particles": {
    "number": {
      "value": 160,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#ffffff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#000000"
      },
      "polygon": {
        "nb_sides": 5
      },
      "image": {
        "src": "img/github.svg",
        "width": 100,
        "height": 100
      }
    },
    "opacity": {
      "value": 1,
      "random": true,
      "anim": {
        "enable": true,
        "speed": 1,
        "opacity_min": 0,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 4,
        "size_min": 0.3,
        "sync": false
      }
    },
    "line_linked": {
      "enable": false,
      "distance": 150,
      "color": "#ffffff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 1,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 600
      }
    }
  },
  "interactivity": {
    "detect_on": "canvas",
    "events": {
      "onhover": {
        "enable": true,
        "mode": "bubble"
      },
      "onclick": {
        "enable": true,
        "mode": "repulse"
      },
      "resize": true
    },
    "modes": {
      "grab": {
        "distance": 400,
        "line_linked": {
          "opacity": 1
        }
      },
      "bubble": {
        "distance": 250,
        "size": 0,
        "duration": 2,
        "opacity": 0,
        "speed": 3
      },
      "repulse": {
        "distance": 400,
        "duration": 0.4
      },
      "push": {
        "particles_nb": 4
      },
      "remove": {
        "particles_nb": 2
      }
    }
  },
  "retina_detect": true
}

大师兄准备了一个科技感满满的入门demo和一个带粒子动画效果的登录页面demo。欢迎大家取用。