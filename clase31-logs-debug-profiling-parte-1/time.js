console.time('timer')
let results = []

for (let i = 0; i < 10000; i++) {
  results.push(i)
}
console.timeEnd('timer')