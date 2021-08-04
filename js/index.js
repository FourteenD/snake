"use strict";
// 食物类
var Food = /** @class */ (function () {
    function Food() {
        // 获取食物元素
        this.element = document.getElementById('food');
    }
    Object.defineProperty(Food.prototype, "X", {
        // 获取食物元素的X轴位置
        get: function () {
            return this.element.offsetLeft;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Food.prototype, "Y", {
        // 获取食物元素的Y轴位置
        get: function () {
            return this.element.offsetTop;
        },
        enumerable: false,
        configurable: true
    });
    Food.prototype.change = function (W, H, headW, headH) {
        // 生成场地大小内的随机数
        var left = Math.ceil(Math.random() * (W / headW)) * headW - headW;
        var top = Math.ceil(Math.random() * (H / headH)) * headH - headH;
        // 使用随机数修改食物的X、Y轴
        this.element.style.left = left + "px";
        this.element.style.top = top + "px";
    };
    return Food;
}());
// 分数和等级类
var ScorePanel = /** @class */ (function () {
    function ScorePanel(maxLevel, upScore) {
        if (maxLevel === void 0) { maxLevel = 10; }
        if (upScore === void 0) { upScore = 10; }
        // 初始化分数和等级
        this.score = 0;
        this.level = 1;
        // 获取分数和等级的元素
        this.scoreEle = document.getElementById('score');
        this.levelEle = document.getElementById('level');
        // 初始化升级分数和最大等级默认都是10
        this.upScore = upScore;
        this.maxLevel = maxLevel;
    }
    // 分数方法
    ScorePanel.prototype.addScore = function () {
        // 分数+1
        this.scoreEle.innerHTML = "" + ++this.score;
        // 分数取模于升级分时执行等级升级方法
        if (this.score % this.upScore === 0) {
            this.levelUp();
        }
    };
    ScorePanel.prototype.levelUp = function () {
        if (this.level < this.maxLevel) {
            this.levelEle.innerHTML = "" + ++this.level;
        }
    };
    return ScorePanel;
}());
// 蛇类
var Snake = /** @class */ (function () {
    function Snake() {
        // 获取整个蛇
        this.element = document.getElementById('snake');
        // 获取蛇身包括蛇头
        this.bodies = this.element.getElementsByTagName('div');
        // 获取蛇头
        this.head = document.querySelector('#snake > div');
    }
    Object.defineProperty(Snake.prototype, "headW", {
        // 获取蛇头的大小
        get: function () {
            return this.head.offsetWidth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Snake.prototype, "headH", {
        get: function () {
            return this.head.offsetHeight;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Snake.prototype, "X", {
        // 获取蛇头XY轴的位置
        get: function () {
            return this.head.offsetLeft;
        },
        // 修改蛇头XY轴的位置
        set: function (value) {
            // 新值和就值相等直接返回，不修改蛇的位置
            if (this.X === value) {
                return;
            }
            // 多个蛇身元素时不能掉头
            if (this.bodies[1] &&
                this.bodies[1].offsetLeft === value) {
                // 像左走
                if (value > this.X) {
                    value = this.X - this.headW;
                }
                // 向右走
                else {
                    value = this.X + this.headW;
                }
            }
            // 移动身体
            this.moveBody();
            this.head.style.left = value + "px";
            // 检查是否吃到自己
            this.checkHeadBody();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Snake.prototype, "Y", {
        get: function () {
            return this.head.offsetTop;
        },
        set: function (value) {
            // 新值和就值相等直接返回，不修改蛇的位置
            if (this.Y === value) {
                return;
            }
            // 多个蛇身元素时不能掉头
            if (this.bodies[1] && this.bodies[1].offsetTop === value) {
                // 像上走
                if (value > this.Y) {
                    value = this.Y - this.headH;
                }
                // 向下走
                else {
                    value = this.Y + this.headH;
                }
            }
            // 移动身体
            this.moveBody();
            this.head.style.top = value + "px";
            // 检查是否吃到自己
            this.checkHeadBody();
        },
        enumerable: false,
        configurable: true
    });
    // 增加身体
    Snake.prototype.addBody = function () {
        this.element.insertAdjacentHTML('beforeend', '<div></div>');
    };
    // 蛇的移动
    Snake.prototype.moveBody = function () {
        for (var index = this.bodies.length - 1; index > 0; index--) {
            // 获取前边身体的位置
            var X = this.bodies[index - 1].offsetLeft;
            var Y = this.bodies[index - 1].offsetTop;
            this.bodies[index].style.left = X + "px";
            this.bodies[index].style.top = Y + "px";
        }
    };
    // 检查是否吃到自己
    Snake.prototype.checkHeadBody = function () {
        for (var index = 1; index < this.bodies.length; index++) {
            var bd = this.bodies[index];
            // 判断是否撞到自己
            if (this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                throw new Error('吃到自己了~~');
            }
        }
    };
    return Snake;
}());
// 场地类
var Venue = /** @class */ (function () {
    function Venue() {
        this.element = document.getElementById('stage');
    }
    Object.defineProperty(Venue.prototype, "W", {
        get: function () {
            return this.element.clientWidth;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Venue.prototype, "H", {
        get: function () {
            return this.element.clientHeight;
        },
        enumerable: false,
        configurable: true
    });
    return Venue;
}());
// 控制器
var GameControl = /** @class */ (function () {
    function GameControl(initRate, maxLevel, upScore) {
        if (initRate === void 0) { initRate = 500; }
        // 蛇的移动方向
        this.direction = '';
        // 蛇是否活着
        this.isLive = true;
        this.venue = new Venue();
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel(maxLevel, upScore);
        // 初始移动速度
        this.initRate = initRate;
        // 初始化游戏
        this.init();
    }
    // 初始化游戏
    GameControl.prototype.init = function () {
        // 绑定键盘事件
        document.addEventListener('keydown', this.keydownHandler.bind(this));
        // 执行运行方法，使蛇移动
        this.run();
    };
    // 创建键盘按下的响应函数
    GameControl.prototype.keydownHandler = function (event) {
        this.direction = event.key;
    };
    // 检测蛇是否吃到食物
    GameControl.prototype.checkEating = function (X, Y) {
        if (X === this.food.X && Y === this.food.Y) {
            this.food.change(this.venue.W, this.venue.H, this.snake.headW, this.snake.headH);
            this.scorePanel.addScore();
            this.snake.addBody();
        }
    };
    // 移动
    GameControl.prototype.run = function () {
        var X = this.snake.X;
        var Y = this.snake.Y;
        // 一节身体大小
        var headW = this.snake.headW;
        var headH = this.snake.headH;
        // 按键值：
        // ArrowUp  || IE:UP
        // ArrowDown  || IE:Down
        // ArrowLeft  || IE:Left
        // ArrowRight || IE:Right
        // 根据按键方向修改X值和Y值
        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                Y -= headH;
                break;
            case 'ArrowDown':
            case 'Down':
                Y += headH;
                break;
            case 'ArrowLeft':
            case 'Left':
                X -= headW;
                break;
            case 'ArrowRight':
            case 'Right':
                X += headW;
                break;
            default:
                break;
        }
        // 是否吃到食物
        this.checkEating(X, Y);
        // 修改蛇头的位置
        try {
            // 判断是否撞墙
            if (X < 0 ||
                X > this.venue.W - headW ||
                Y < 0 ||
                Y > this.venue.H - headW) {
                throw new Error('蛇撞墙了');
            }
            this.snake.X = X;
            this.snake.Y = Y;
        }
        catch (error) {
            // 如果上方代码抛出错误
            alert(error + 'GAME OVER!');
            // 将isLive设为false
            this.isLive = false;
        }
        // 将速度按等级划分
        var speedRate = (this.scorePanel.level - 1) *
            Math.round(this.initRate / this.scorePanel.level);
        // 自调用定时器
        this.isLive && setTimeout(this.run.bind(this), this.initRate - speedRate);
    };
    return GameControl;
}());
new GameControl(500, 20, 5);
