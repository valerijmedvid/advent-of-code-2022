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
    .split("")
} catch (err) {
  console.error(err)
}

const solve = (uniqueChars) => {
  for (let i = 0; i <= inputData.length; i++) {
    const startPacket = inputData.slice(i, i + uniqueChars)
    const uniqueLetter = [...new Set(startPacket)]

    if (uniqueLetter.length == uniqueChars) return i + uniqueChars
  }
}

console.log(solve(4))
console.log(solve(14))
