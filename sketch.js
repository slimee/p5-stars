const INITIAL_POINTS_COUNT = 250
let entropy
let points
let coef
let coefcoef
let centerX
let centerY
let time
let size

const doMany = (job, times) => {
  for (let i = 0; i < times; i++) {
    job(i)
  }
}

const forAllPoint = job => doMany((i) => job(points[i]), points.length)

const createPoint = () => {
  const t = 2 * Math.PI * random()
  const u = random() + random()
  const r = u > 1 ? 2 - u : u
  const ix = r * Math.cos(t)
  const iy = r * Math.sin(t)
  const x = ix + centerX
  const y = iy + centerY
  points.push({
    birth: new Date().getTime(),
    ix, iy, x, y,
    color: random(0, 255),
  })
}

const drawPoint = p => {
  stroke(p.color)
  point(p.x + centerX, p.y + centerY)
}

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  entropy = 0
  time = 0
  points = []
  centerX = width * 0.5
  centerY = height * 0.5
  coef = 1.13
  coefcoef = 0.9985
  size = Math.min(height, width) / 2
  doMany(createPoint, INITIAL_POINTS_COUNT)
}

function draw() {
  if (entropy < 0) {
    setup()
  }
  background(0)
  forAllPoint(transformPoint)
  forAllPoint(drawPoint)

  time += 0.015
  entropy = size * Math.sin(time)
}

const transformPoint = p => {
  p.x = p.ix * entropy
  p.y = p.iy * entropy
}