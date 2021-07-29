class Food {
  element: HTMLElement
  constructor() {
    this.element = document.getElementById('food')!
  }
  get X() {
    return this.element.offsetLeft
  }
  get Y() {
    return this.element.offsetTop
  }
  change(): void {
    let top = Math.round(Math.random() * 29 * 10)
    let left = Math.round(Math.random() * 29 * 10)
    this.element.style.left = `${left}px`
    this.element.style.top = `${top}px`
  }
}

class ScorePanel {
  score = 0
  level = 1
  scoreEle: HTMLElement
  levelEle: HTMLElement
  maxLevel: number
  upScore: number

  constructor(maxLevel: number = 10, upScore: number = 10) {
    this.scoreEle = document.getElementById('score')!
    this.levelEle = document.getElementById('level')!
    this.maxLevel = maxLevel
    this.upScore = upScore
  }

  addScore(): void {
    this.scoreEle.innerHTML = `${++this.score}`
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

class Snake {
  element: HTMLElement
  head: HTMLElement
  bodies: HTMLCollection
  constructor() {
    this.element = document.getElementById('snake')!
    this.head = document.querySelector('#snake > div')!
    this.bodies = this.element.getElementsByTagName('div')
  }

  get X() {
    return this.head.offsetLeft
  }

  get Y() {
    return this.head.offsetTop
  }

  set X(value) {
    this.head.style.left = `${value}px`
  }
  set Y(value) {
    this.head.style.top = `${value}px`
  }

  addBody(): void {
    this.element.insertAdjacentHTML('beforeend', '<div></div>')
  }
}

const scorePanel = new ScorePanel()
const food = new Food()
const snake = new Snake()

