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
} catch (err) {
  console.error(err)
}

const scoreTable = {}
const generateScoreTable = () => {
  const lowLetterStarts = 97
  const upLetterStarts = 65
  const lettersCount = 26

  for (let i = 0; i < lettersCount; i++) {
    scoreTable[String.fromCharCode(i + lowLetterStarts)] = i + 1
    scoreTable[String.fromCharCode(i + upLetterStarts)] = i + 1 + lettersCount
  }
}
generateScoreTable()

const splitRucksackForHalf = (rucksack) => {
  const rucksackLength = rucksack.length
  const firstHalf = rucksack.split("").slice(0, rucksackLength / 2)
  const secondHalf = rucksack.split("").slice(rucksackLength / 2, rucksackLength)
  return [firstHalf, secondHalf]
}

const splitElvesIntoGroups = (rucksack) => {
  const groups = []
  const splitBy = 3
  let first = 0
  let last = splitBy

  for (let i = 0; i < rucksack.length / 3; i++) {
    groups.push(rucksack.slice(first, last))
    first += splitBy
    last += splitBy
  }
  return groups
}
const elfGroups = splitElvesIntoGroups(inputData)

const solve1 = () => {
  let score = 0
  inputData.forEach((rucksack) => {
    const [firstHalf, secondHalf] = splitRucksackForHalf(rucksack)

    for (let i = 0; i < firstHalf.length; i++) {
      if (secondHalf.includes(firstHalf[i])) {
        score += scoreTable[firstHalf[i]]
        return
      }
    }
  })
  return score
}

const solve2 = () => {
  let score = 0
  elfGroups.forEach((group) => {
    const parsedGroup = group.map((x) => x.split(""))
    const [first, second, third] = parsedGroup

    for (let i = 0; i < first.length; i++) {
      if (second.includes(first[i]) && third.includes(first[i])) {
        score += scoreTable[first[i]]
        return
      }
    }
  })

  return score
}

console.log(solve1())
console.log(solve2())
