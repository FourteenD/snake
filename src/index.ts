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
  maxLevel: number
  upScore: number

  constructor(maxLevel: number = 10, upScore: number = 10) {
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

const scorePanel = new ScorePanel(100, 1)
const food = new Food()
scorePanel.addScore()
food.change()
