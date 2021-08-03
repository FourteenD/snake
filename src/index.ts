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
  change(W: number, H: number, headW: number, headH: number): void {
    // 生成场地大小内的随机数
    let left = Math.ceil(Math.random() * (W / headW)) * headW - headW
    let top = Math.ceil(Math.random() * (H / headH)) * headH - headH
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
  // 获取蛇头的大小
  get headW() {
    return this.head.offsetWidth
  }
  get headH() {
    return this.head.offsetHeight
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
    // 新值和就值相等直接返回，不修改蛇的位置
    if (this.X === value) {
      return
    }
    this.head.style.left = `${value}px`
  }
  set Y(value: number) {
    // 新值和就值相等直接返回，不修改蛇的位置
    if (this.Y === value) {
      return
    }
    this.head.style.top = `${value}px`
  }
  // 增加身体
  addBody(): void {
    this.element.insertAdjacentHTML('beforeend', '<div></div>')
  }
}

// 场地类
class Venue {
  element: HTMLElement
  constructor() {
    this.element = document.getElementById('stage')!
  }
  get W() {
    return this.element.clientWidth
  }
  get H() {
    return this.element.clientHeight
  }
}
// 控制器
class GameControl {
  // 场地的实例
  venue: Venue
  // 蛇的的实例
  snake: Snake
  // 食物的实例
  food: Food
  // 分数等级的实例
  scorePanel: ScorePanel
  // 蛇的移动方向
  direction: string = ''
  // 初始移动速度
  initRate: number
  // 蛇是否活着
  isLive: Boolean = true

  constructor(initRate: number = 500,maxLevel?: number,upScore?: number) {
    this.venue = new Venue()
    this.snake = new Snake()
    this.food = new Food()
    this.scorePanel = new ScorePanel(maxLevel,upScore)
    // 初始移动速度
    this.initRate = initRate
    // 初始化游戏
    this.init()
  }
  // 初始化游戏
  init(): void {
    // 绑定键盘事件
    document.addEventListener('keydown', this.keydownHandler.bind(this))
    // 执行运行方法，使蛇移动
    this.run()
  }
  // 创建键盘按下的响应函数
  keydownHandler(event: KeyboardEvent): void {
    this.direction = event.key
  }
  // 检测蛇是否吃到食物
  checkEating(X: number, Y: number) {
    if (X === this.food.X && Y === this.food.Y) {
      this.food.change(
        this.venue.W,
        this.venue.H,
        this.snake.headW,
        this.snake.headH
      )
      this.scorePanel.addScore()
      this.snake.addBody()
    }
  }
  // 移动
  run(): void {
    let X = this.snake.X
    let Y = this.snake.Y
    // 一节身体大小
    let headW = this.snake.headW
    let headH = this.snake.headH
    // 按键值：
    // ArrowUp  || IE:UP
    // ArrowDown  || IE:Down
    // ArrowLeft  || IE:Left
    // ArrowRight || IE:Right

    // 根据按键方向修改X值和Y值
    switch (this.direction) {
      case 'ArrowUp':
      case 'Up':
        Y -= headH
        break
      case 'ArrowDown':
      case 'Down':
        Y += headH
        break
      case 'ArrowLeft':
      case 'Left':
        X -= headW
        break
      case 'ArrowRight':
      case 'Right':
        X += headW
        break
      default:
        break
    }
    // 是否吃到食物
    this.checkEating(X, Y)
    // 修改蛇头的位置
    try {
      // 判断是否撞墙
      if (
        X < 0 ||
        X > this.venue.W - headW ||
        Y < 0 ||
        Y > this.venue.H - headW
      ) {
        throw new Error('蛇撞墙了')
      }
      this.snake.X = X
      this.snake.Y = Y
    } catch (error) {
      // 如果上方代码抛出错误
      alert(error + 'GAME OVER!')
      // 将isLive设为false
      this.isLive = false
    }

    // 将速度按等级划分
    let speedRate =
      (this.scorePanel.level - 1) *
      Math.round(this.initRate / this.scorePanel.level)
    // 自调用定时器
    this.isLive && setTimeout(this.run.bind(this), this.initRate - speedRate)
  }
}
const gc = new GameControl()
const v = new Venue()
const f = new Food()
function test() {
  f.change(300, 300, 10, 10)
}
