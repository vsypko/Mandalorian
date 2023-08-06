function handlePointerDown() {
  canvas.addEventListener("pointerdown", (event) => {
    entities.forEach((entity) => {
      if (!catched) catched = entity.capture(event.offsetX, event.offsetY)
    })
  })
}

function handlePointerUp() {
  document.addEventListener("pointerup", () => {
    entities.forEach((entity) => {
      entity.catched = false
    })
    catched = false
  })
}

function handlePointerOut() {
  document.addEventListener("pointerout", () => {
    entities.forEach((entity) => {
      entity.catched = false
    })
    catched = false
  })
}

function handlePointerMove(effect) {
  canvas.addEventListener("pointermove", (event) => {
    entities.forEach((entity) => entity.update(event.offsetX, event.offsetY))
    if (isEffect && effect) {
      effect.pointer.x = event.offsetX
      effect.pointer.y = event.offsetY
    }
  })
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  if (isEffect) {
    effect.update()
    effect.draw(ctx)
  } else {
    entities.forEach((entity) => entity.draw())
  }
  requestAnimationFrame(animate)
}

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.width = 1000
canvas.height = canvas.width / bgAspect

const audio = new Audio("assets/diw.m4a")
audio.loop = true
audio.volume = 0.2

entities.push(new Entity("assets/razor.png", 600, 350, 300, razorAspect, ctx))
entities.push(new Entity("assets/mandalorian.png", 200, 350, 200, mandalAspect, ctx))
entities.push(new Entity("assets/grogu.png", 400, 450, 100, groguAspect, ctx))

const effect = new Effect(canvas.width, canvas.height)

const effectButton = document.getElementById("button")
effectButton.addEventListener("click", () => {
  isEffect = !isEffect
  if (!isEffect) {
    effectButton.innerText = "effect"
    audio.pause()
  } else {
    effectButton.innerText = "stop"
    effect.init(ctx)
    handlePointerMove(effect)
    audio.play()
  }
})

handlePointerDown()
handlePointerUp()
handlePointerOut()
handlePointerMove()
animate()
