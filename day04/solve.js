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
    .map((group) =>
      group.split(",").map((elf) => elf.split("-").map((section) => parseInt(section)))
    )
} catch (err) {
  console.error(err)
}

const createArrayOfSections = (arr) => {
  const newArray = []
  for (let i = arr[0]; i <= arr[1]; i++) {
    newArray.push(i)
  }
  return newArray
}

const solve1 = () => {
  let score = 0

  inputData.forEach((group) => {
    const firstElf = createArrayOfSections(group[0])
    const secondElf = createArrayOfSections(group[1])

    if (firstElf.every((val) => secondElf.includes(val))) {
      score++
    } else if (secondElf.every((val) => firstElf.includes(val))) {
      score++
    }
  })

  return score
}

const solve2 = () => {
  let score = 0

  inputData.forEach((group) => {
    const firstElf = createArrayOfSections(group[0])
    const secondElf = createArrayOfSections(group[1])

    if (firstElf.filter((element) => secondElf.includes(element)).length > 0) {
      score++
    }
  })

  return score
}

console.log(solve1())
console.log(solve2())
