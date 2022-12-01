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
    .split("\n\n")
    .map((elf) => elf.split("\n").map((x) => parseInt(x)))
} catch (err) {
  console.error(err)
}

const sumArray = (myArray) => {
  return myArray.reduce((prev, curr) => prev + curr, 0)
}

const elvesCargoCount = inputData.map((elf) => sumArray(elf))

console.log(Math.max(...elvesCargoCount))

const mostLoadedElves = elvesCargoCount.sort((a, b) => b - a).slice(0, 3)
console.log(sumArray(mostLoadedElves))
