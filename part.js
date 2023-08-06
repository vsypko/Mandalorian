class Particle {
  constructor(effect, x, y, color) {
    this.effect = effect
    this.x = Math.random() * this.effect.width
    this.y = 0
    this.originX = x
    this.originY = y
    this.color = color
    this.size = this.effect.gap
    this.vx = 0
    this.vy = 0
    this.dx = 0
    this.dy = 0
    this.dist = 0
    this.force = 0
    this.angle = 0
    this.ease = 0.1
    this.gravity = 0.99
  }

  update() {
    this.dx = this.effect.pointer.x - this.x
    this.dy = this.effect.pointer.y - this.y
    this.dist = this.dx * this.dx + this.dy * this.dy
    this.force = -this.effect.pointer.radius / this.dist

    if (this.dist < this.effect.pointer.radius) {
      this.angle = Math.atan2(this.dy, this.dx)
      this.vx += this.force * Math.cos(this.angle)
      this.vy += this.force * Math.sin(this.angle)
    }
    this.vx *= this.gravity
    this.vy *= this.gravity
    this.x += this.vx + (this.originX - this.x) * this.ease
    this.y += this.vy + (this.originY - this.y) * this.ease
  }

  draw(ctx) {
    ctx.fillStyle = this.color
    ctx.fillRect(this.x, this.y, this.size, this.size)
  }
}

class Effect {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.particles = []
    this.gap = 1

    this.pointer = {
      radius: 3000,
      x: undefined,
      y: undefined,
    }
  }

  init(ctx) {
    this.particles = []
    const pixels = ctx.getImageData(0, 0, this.width, this.height).data
    for (let y = 0; y < this.height; y += this.gap) {
      for (let x = 0; x < this.width; x += this.gap) {
        const index = (y * this.width + x) * 4
        const red = pixels[index]
        const green = pixels[index + 1]
        const blue = pixels[index + 2]
        const alpha = pixels[index + 3]
        const color = `rgb(${red}, ${green}, ${blue})`
        if (alpha > 0) {
          this.particles.push(new Particle(this, x, y, color))
        }
      }
    }
  }

  update() {
    this.particles.forEach((particle) => particle.update())
  }

  draw(ctx) {
    this.particles.forEach((particle) => particle.draw(ctx))
  }
}
