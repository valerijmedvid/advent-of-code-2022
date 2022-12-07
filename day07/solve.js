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
    .map((x) => x.split(" "))
} catch (err) {
  console.error(err)
}

const fileSystem = {}
const PWD = []

const changeDirectory = (newDir) => {
  if (newDir == "..") {
    PWD.pop()
  } else {
    let newPath = PWD.join("")
    PWD.push(`${newPath}${newDir}`)
  }
}

const saveSizes = (size) => {
  PWD.forEach((folder) => {
    if (!(folder in fileSystem)) fileSystem[folder] = 0
    fileSystem[folder] += size
  })
}

const createFileSystem = () => {
  inputData.forEach((command) => {
    if (command[0] == "$") {
      if (command[1] == "cd") {
        changeDirectory(command[2])
      }
    } else if (command[0] == "dir") {
    } else {
      saveSizes(parseInt(command[0]))
    }
  })
}
createFileSystem()

const solve1 = () => {
  return Object.values(fileSystem)
    .filter((size) => size < 100000)
    .reduce((prev, curr) => prev + curr, 0)
}

const solve2 = () => {
  return Math.min(...Object.values(fileSystem).filter((size) => fileSystem["/"] - 40000000 <= size))
}

console.log(solve1())
console.log(solve2())
