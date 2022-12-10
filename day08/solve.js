import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const debug = false

const testFileName = "testData.txt"
const inputFileName = "inputData.txt"

let inputData = []
try {
  inputData = fs
    .readFileSync(path.resolve(__dirname, debug ? testFileName : inputFileName), "utf8")
    .split("\n")
    .map((row) => row.split("").map((tree) => parseInt(tree)))
} catch (err) {
  console.error(err)
}

const borderTrees = inputData.length * 2 + (inputData[0].length - 2) * 2

const findToTop = (val, x, y) => {
  for (let i = x - 1; i >= 0; i--) {
    if (val <= inputData[i][y]) return true
  }

  return false
}
const findToBottom = (val, x, y) => {
  for (let i = x + 1; i < inputData.length; i++) {
    if (val <= inputData[i][y]) return true
  }

  return false
}
const findToLeft = (val, x, y) => {
  for (let i = y - 1; i >= 0; i--) {
    if (val <= inputData[x][i]) return true
  }

  return false
}

const findToRight = (val, x, y) => {
  for (let i = y + 1; i < inputData[0].length; i++) {
    if (val <= inputData[x][i]) return true
  }

  return false
}

const solve1 = () => {
  let visiblesTrees = 0
  for (let x = 1; x < inputData.length - 1; x++) {
    for (let y = 1; y < inputData[x].length - 1; y++) {
      if (
        !findToTop(inputData[x][y], x, y) ||
        !findToBottom(inputData[x][y], x, y) ||
        !findToLeft(inputData[x][y], x, y) ||
        !findToRight(inputData[x][y], x, y)
      ) {
        visiblesTrees++
      }
    }
  }
  return visiblesTrees
}

const countToTop = (val, x, y) => {
  let cnt = 0
  for (let i = x - 1; i >= 0; i--) {
    cnt++
    if (val <= inputData[i][y]) {
      return cnt
    }
  }

  return cnt
}
const countToBottom = (val, x, y) => {
  let cnt = 0
  for (let i = x + 1; i < inputData.length; i++) {
    cnt++
    if (val <= inputData[i][y]) {
      return cnt
    }
  }

  return cnt
}
const countToLeft = (val, x, y) => {
  let cnt = 0
  for (let i = y - 1; i >= 0; i--) {
    cnt++
    if (val <= inputData[x][i]) {
      return cnt
    }
  }

  return cnt
}

const countToRight = (val, x, y) => {
  let cnt = 0
  for (let i = y + 1; i < inputData[0].length; i++) {
    cnt++
    if (val <= inputData[x][i]) {
      return cnt
    }
  }

  return cnt
}

const solve2 = () => {
  let highestScore = 0
  for (let x = 1; x < inputData.length - 1; x++) {
    for (let y = 1; y < inputData[x].length - 1; y++) {
      let top = countToTop(inputData[x][y], x, y)
      let bottom = countToBottom(inputData[x][y], x, y)
      let left = countToLeft(inputData[x][y], x, y)
      let right = countToRight(inputData[x][y], x, y)

      let scenicScore = top * bottom * left * right
      if (highestScore < scenicScore) {
        highestScore = scenicScore
      }
    }
  }
  return highestScore
}
console.log(solve1() + borderTrees)
console.log(solve2())
