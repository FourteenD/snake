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
    Food.prototype.change = function () {
        // 生成0-29的随机数
        var top = Math.round(Math.random() * 29 * 10);
        var left = Math.round(Math.random() * 29 * 10);
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
    Object.defineProperty(Snake.prototype, "X", {
        // 获取蛇头XY轴的位置
        get: function () {
            return this.head.offsetLeft;
        },
        // 修改蛇头XY轴的位置
        set: function (value) {
            this.head.style.left = value + "px";
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Snake.prototype, "Y", {
        get: function () {
            return this.head.offsetTop;
        },
        set: function (value) {
            this.head.style.top = value + "px";
        },
        enumerable: false,
        configurable: true
    });
    Snake.prototype.addBody = function () {
        this.element.insertAdjacentHTML('beforeend', '<div></div>');
    };
    return Snake;
}());
var GameControl = /** @class */ (function () {
    function GameControl() {
        // 蛇的移动方向
        this.direction = '';
        this.snake = new Snake();
        this.food = new Food();
        this.scorePanel = new ScorePanel();
        // 初始化游戏
        this.init();
    }
    // 初始化游戏
    GameControl.prototype.init = function () {
        // 绑定键盘事件
        document.addEventListener('keydown', this.keydownHandler.bind(this));
    };
    // 创建键盘按下的响应函数
    GameControl.prototype.keydownHandler = function (event) {
        this.direction = event.key;
    };
    // 移动
    GameControl.prototype.run = function () {
        var X = this.snake.X;
        var Y = this.snake.Y;
        // 按键值：
        // ArrowUp  || IE:UP
        // ArrowDown  || IE:Down
        // ArrowLeft  || IE:Left
        // ArrowRight || IE:Right
        // 根据按键方向修改X值和Y值
        switch (this.direction) {
            case 'ArrowUp':
            case 'Up':
                Y -= 10;
                break;
            case 'ArrowDown':
            case 'Down':
                Y += 10;
                break;
            case 'ArrowLeft':
            case 'Left':
                X -= 10;
                break;
            case 'ArrowRight':
            case 'Right':
                X += 10;
                break;
            default:
                break;
        }
        this.snake.X = X;
        this.snake.Y = Y;
    };
    return GameControl;
}());
var gc = new GameControl();
function test() {
    console.log(gc.direction);
}
