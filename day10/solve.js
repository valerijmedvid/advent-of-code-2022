import fs from "fs"
import path from "path"
import { CLIENT_RENEG_LIMIT } from "tls"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const debug = true

const testFileName = "testData.txt"
const inputFileName = "inputData.txt"

const inputData = fs
  .readFileSync(path.resolve(__dirname, debug ? testFileName : inputFileName), "utf8")
  .split("\n")

const sig = {}

const scanSignal = (sign, cyc) => {
  if (cyc == 20) {
    sig[20] = sign * 20
  } else if ((cyc + 20) % 40 === 0) {
    sig[cyc + 20] = sign * cyc
  }
}

const solve1 = () => {
  let signal = 1
  let cycles = 0

  inputData.forEach((line) => {
    if (line.includes("addx")) {
      for (let i = 1; i <= 2; i++) {
        cycles++
        scanSignal(signal, cycles)
        if (i == 2) {
          const [command, instruction] = line.split(" ")
          signal += parseInt(instruction)
        }
      }
    } else {
      cycles++
      scanSignal(signal, cycles)
    }
  })

  return Object.values(sig).reduce((prev, curr) => prev + curr, 0)
}

console.log(solve1())
