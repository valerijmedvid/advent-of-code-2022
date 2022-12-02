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
    .map((round) => round.split(" "))
} catch (err) {
  console.error(err)
}

const solve1 = () => {
  let score = 0

  inputData.forEach((round) => {
    const [elve, me] = round

    if ((elve == "A" && me == "X") || (elve == "B" && me == "Y") || (elve == "C" && me == "Z")) {
      score += 3
    }

    if ((elve == "C" && me == "X") || (elve == "A" && me == "Y") || (elve == "B" && me == "Z")) {
      score += 6
    }

    if (me == "X") score += 1
    if (me == "Y") score += 2
    if (me == "Z") score += 3
  })
  return score
}

const solve2 = () => {
  let score = 0

  inputData.forEach((round) => {
    const [elve, me] = round

    if (me == "Y") {
      score += 3
      if (elve == "A") score += 1
      if (elve == "B") score += 2
      if (elve == "C") score += 3
    }

    if (me == "X") {
      if (elve == "A") score += 3
      if (elve == "B") score += 1
      if (elve == "C") score += 2
    }

    if (me == "Z") {
      score += 6
      if (elve == "A") score += 2
      if (elve == "B") score += 3
      if (elve == "C") score += 1
    }
  })
  return score
}

console.log(solve1())
console.log(solve2())
