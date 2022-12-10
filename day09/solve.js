import fs from "fs"
import path from "path"
import { CLIENT_RENEG_LIMIT } from "tls"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const debug = false

const testFileName = "testData.txt"
const inputFileName = "inputData.txt"

const inputData = fs
  .readFileSync(path.resolve(__dirname, debug ? testFileName : inputFileName), "utf8")
  .split("\n")
  .map((row) => {
    const [dir, num] = row.split(" ")
    return { dir, moves: parseInt(num) }
  })

const movesTranslation = {
  U: {
    x: 0,
    y: -1,
  },
  L: {
    x: -1,
    y: 0,
  },
  R: {
    x: 1,
    y: 0,
  },
  D: {
    x: 0,
    y: 1,
  },
}

class Knot {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  move(dir) {
    const vector = movesTranslation[dir]
    this.x += vector.x
    this.y += vector.y
  }

  follow(point) {
    const distance = Math.max(Math.abs(this.x - point.x), Math.abs(this.y - point.y))
    if (distance > 1) {
      const directionX = point.x - this.x
      this.x += Math.abs(directionX) === 2 ? directionX / 2 : directionX
      const directionY = point.y - this.y
      this.y += Math.abs(directionY) === 2 ? directionY / 2 : directionY
    }
  }
}

function markVisited(x, y, visited) {
  visited.add(`${x}-${y}`)
}

const solve1 = () => {
  const head = new Knot(0, 0)
  const tail = new Knot(0, 0)
  const visited = new Set()
  markVisited(0, 0, visited)

  inputData.forEach((line) => {
    for (let i = 0; i < line.moves; i++) {
      head.move(line.dir)
      tail.follow(head)
      markVisited(tail.x, tail.y, visited)
    }
  })

  return visited.size
}

function solve2() {
  const knots = new Array(10).fill(0).map((_) => new Knot(0, 0))
  const visited = new Set()
  markVisited(0, 0, visited)

  inputData.forEach((line) => {
    for (let i = 0; i < line.moves; i++) {
      knots[0].move(line.dir)

      for (let knot = 1; knot < knots.length; knot++) {
        const point = knots[knot]
        point.follow(knots[knot - 1])
      }
      const tail = knots[knots.length - 1]
      markVisited(tail.x, tail.y, visited)
    }
  })

  return visited.size
}

console.log(solve1())
console.log(solve2())
