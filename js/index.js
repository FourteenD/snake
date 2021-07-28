"use strict";
var Food = /** @class */ (function () {
    function Food() {
        this.element = document.getElementById('food');
    }
    Object.defineProperty(Food.prototype, "X", {
        get: function () {
            return this.element.offsetLeft;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Food.prototype, "Y", {
        get: function () {
            return this.element.offsetTop;
        },
        enumerable: false,
        configurable: true
    });
    Food.prototype.change = function () {
        var top = Math.round(Math.random() * 29 * 10);
        var left = Math.round(Math.random() * 29 * 10);
        this.element.style.left = left + "px";
        this.element.style.top = top + "px";
    };
    return Food;
}());
var ScorePanel = /** @class */ (function () {
    function ScorePanel(maxLevel, upScore) {
        if (maxLevel === void 0) { maxLevel = 10; }
        if (upScore === void 0) { upScore = 10; }
        this.score = 0;
        this.level = 1;
        this.scoreEle = document.getElementById('score');
        this.levelEle = document.getElementById('level');
        this.maxLevel = maxLevel;
        this.upScore = upScore;
    }
    ScorePanel.prototype.addScore = function () {
        this.scoreEle.innerHTML = "" + ++this.score;
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
var scorePanel = new ScorePanel(100, 1);
var food = new Food();
scorePanel.addScore();
food.change();
