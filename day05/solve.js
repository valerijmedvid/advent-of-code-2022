import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const debug = false

const testFileName = "testData.txt"
const testFileName2 = "testData2.txt"
const inputFileName = "inputData.txt"
const inputFileName2 = "inputData2.txt"

let inputData = []
try {
  inputData = fs
    .readFileSync(path.resolve(__dirname, debug ? testFileName : inputFileName), "utf8")
    .split("\n")
    .map((x) => x.split(""))
} catch (err) {
  console.error(err)
}
let inputData2 = []
try {
  inputData2 = fs
    .readFileSync(path.resolve(__dirname, debug ? testFileName2 : inputFileName2), "utf8")
    .split("\n")
    .map((x) => x.split(" from "))
} catch (err) {
  console.error(err)
}

const gameField = {}

const createGameField = () => {
  inputData.pop()
  inputData.reverse()
  inputData.forEach((row) => {
    let col = 1
    while (row.length) {
      if (!(col in gameField)) {
        gameField[col] = []
      }
      if (row.slice(0, 3)[1] != " ") {
        gameField[col].push(row.slice(0, 3)[1])
      }

      Array(4)
        .fill(0)
        .forEach((x) => row.shift())

      col++
    }
  })
}
createGameField()

let movements = []
const getMovements = () => {
  movements = inputData2.map((step) => {
    const steps = parseInt(step[0].replace("move ", ""))
    const [from, to] = step[1].split(" to ").map((x) => parseInt(x))
    return { steps, from, to }
  })
}
getMovements()

const getResolve = (field) => {
  return Object.values(field)
    .map((col) => col[col.length - 1])
    .join("")
}

const solve1 = () => {
  const gameFieldCopy = JSON.parse(JSON.stringify(gameField))
  movements.forEach((move) => {
    const { steps, from, to } = move

    for (let i = 1; i <= steps; i++) {
      let carriage = gameFieldCopy[from].pop()
      gameFieldCopy[to].push(carriage)
    }
  })

  return getResolve(gameFieldCopy)
}

const solve2 = () => {
  const gameFieldCopy = JSON.parse(JSON.stringify(gameField))

  movements.forEach((move) => {
    const { steps, from, to } = move

    let carriage = gameFieldCopy[from].slice(-steps)
    Array(steps)
      .fill(0)
      .forEach((x) => gameFieldCopy[from].pop())
    gameFieldCopy[to] = [...gameFieldCopy[to], ...carriage]
  })

  return getResolve(gameFieldCopy)
}

console.log(solve1())
console.log(solve2())
