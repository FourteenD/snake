// 定义Food类
class Food {
  element: HTMLElement
  constructor() {
    // 获取页面中的food元素并将其赋值给element
    this.element = document.getElementById('food')!
  }
  get X() {
    return this.element.offsetLeft
  }
  get Y() {
    return this.element.offsetTop
  }
  change() {
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
  maxLevel: Number
  upScore: Number

  constructor(maxLevel: Number = 10, upScore: Number = 10) {
    this.scoreEle = document.getElementById('score')!
    this.levelEle = document.getElementById('level')!
    this.maxLevel = maxLevel
    this.upScore = upScore
  }

  addScore() {
    this.scoreEle.innerHTML = `${++this.score}`
    if (this.score % this.upScore === 0) {
      this.levelUp()
    }
  }
  levelUp() {
    if (this.level < this.maxLevel) {
      this.levelEle.innerHTML = `${++this.level}`
    }
  }
}

const scorePanel = new ScorePanel(100,1)
for (let index = 0; index < 10; index++) {
  scorePanel.addScore()
}
