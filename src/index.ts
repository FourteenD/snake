// 食物类
class Food {
  element: HTMLElement
  constructor() {
    // 获取食物元素
    this.element = document.getElementById('food')!
  }
  // 获取食物元素的X轴位置
  get X() {
    return this.element.offsetLeft
  }
  // 获取食物元素的Y轴位置
  get Y() {
    return this.element.offsetTop
  }
  change(): void {
    // 生成0-29的随机数
    let top = Math.round(Math.random() * 29 * 10)
    let left = Math.round(Math.random() * 29 * 10)
    // 使用随机数修改食物的X、Y轴
    this.element.style.left = `${left}px`
    this.element.style.top = `${top}px`
  }
}

// 分数和等级类
class ScorePanel {
  // 初始化分数和等级
  score = 0
  level = 1
  // 分数和等级的元素
  scoreEle: HTMLElement
  levelEle: HTMLElement
  // 升级分数和最大等级
  upScore: number
  maxLevel: number

  constructor(maxLevel: number = 10, upScore: number = 10) {
    // 获取分数和等级的元素
    this.scoreEle = document.getElementById('score')!
    this.levelEle = document.getElementById('level')!
    // 初始化升级分数和最大等级默认都是10
    this.upScore = upScore
    this.maxLevel = maxLevel
  }
  // 分数方法
  addScore(): void {
    // 分数+1
    this.scoreEle.innerHTML = `${++this.score}`
    // 分数取模于升级分时执行等级升级方法
    if (this.score % this.upScore === 0) {
      this.levelUp()
    }
  }
  levelUp(): void {
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = `${++this.level}`
    }
  }
}
// 蛇类
class Snake {
  // 整个蛇
  element: HTMLElement
  // 蛇头
  head: HTMLElement
  // 蛇身
  bodies: HTMLCollection
  constructor() {
    // 获取整个蛇
    this.element = document.getElementById('snake')!
    // 获取蛇身包括蛇头
    this.bodies = this.element.getElementsByTagName('div')
    // 获取蛇头
    this.head = document.querySelector('#snake > div')!
  }

  // 获取蛇头XY轴的位置
  get X() {
    return this.head.offsetLeft
  }
  get Y() {
    return this.head.offsetTop
  }
  // 修改蛇头XY轴的位置
  set X(value: number) {
    this.head.style.left = `${value}px`
  }
  set Y(value: number) {
    this.head.style.top = `${value}px`
  }

  addBody(): void {
    this.element.insertAdjacentHTML('beforeend', '<div></div>')
  }
}

class GameControl {
  // 蛇的的实例
  snake: Snake
  // 食物的实例
  food: Food
  // 分数等级的实例
  scorePanel: ScorePanel
  // 蛇的移动方向
  direction: string = ''

  constructor() {
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel()
    // 初始化游戏
    this.init()
  }
  // 初始化游戏
  init(): void {
    // 绑定键盘事件
    document.addEventListener('keydown', this.keydownHandler.bind(this))
  }
  // 创建键盘按下的响应函数
  keydownHandler(event: KeyboardEvent): void {
    this.direction = event.key
  }
  // 移动
  run() {
    let X = this.snake.X
    let Y = this.snake.Y
    // 按键值：
    // ArrowUp  || IE:UP
    // ArrowDown  || IE:Down
    // ArrowLeft  || IE:Left
    // ArrowRight || IE:Right

    // 根据按键方向修改X值和Y值
    switch (this.direction) {
      case 'ArrowUp':
      case 'Up':
        Y -= 10
        break
      case 'ArrowDown':
      case 'Down':
        Y += 10
        break
      case 'ArrowLeft':
      case 'Left':
        X -= 10
        break
      case 'ArrowRight':
      case 'Right':
        X += 10
        break
      default:
        break
    }

    this.snake.X = X
    this.snake.Y = Y
  }
}
const gc = new GameControl()
function test() {
  console.log(gc.direction)
}
