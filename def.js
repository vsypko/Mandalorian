let catched = false
let isEffect = false

const bgAspect = 1.5
const groguAspect = 1.0163
const mandalAspect = 0.6551
const razorAspect = 1.7762
const groguWidth = 100
const mandalWidth = 200
const threshold = 110
const entities = []

class Entity {
  constructor(url, initX, initY, width, aspect, ctx) {
    this.x = initX
    this.y = initY
    this.posX = 0
    this.posY = 0
    this.width = width
    this.aspect = aspect
    this.catched = false
    this.ctx = ctx
    this.image = new Image()
    this.image.src = url
    this.image.onload = () => this.ctx.drawImage(this.image, this.x, this.y, this.width, this.width / this.aspect)
  }

  capture(x, y) {
    if (x - this.x > 0 && x - this.x < this.width && y - this.y > 0 && y - this.y < this.width / this.aspect) {
      this.posX = x
      this.posY = y
      this.catched = true
    }
    return this.catched
  }

  update(x, y) {
    if (this.catched) {
      let dx = x - this.posX
      let dy = y - this.posY
      this.posX = x
      this.posY = y
      this.x += dx
      this.y += dy
    }
  }

  draw() {
    this.ctx.drawImage(this.image, this.x, this.y, this.width, this.width / this.aspect)
  }
}

function toGrey() {
  const imgObj = ctx.getImageData(x, y, groguWidth, groguWidth / groguAspect)
  const imgData = imgObj.data
  for (let i = 0; i < imgData.length; i += 4) {
    const red = imgData[i]
    const green = imgData[i + 1]
    const blue = imgData[i + 2]
    const grey = (red + green + blue) / 3
    imgData[i] = grey
    imgData[i + 1] = grey
    imgData[i + 2] = grey
  }
  imgObj.data = imgData
  ctx.putImageData(imgObj, x, y)
}
