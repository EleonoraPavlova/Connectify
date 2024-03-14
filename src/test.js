function camelCase(str) {
  const arr = str.split(' ')
  arr.map((e, index) => (index === 0 ? e : e[index][0].toUpperCase() + e.slice(1)))
  return arr.join('')
}
console.log(camelCase('wow hello'))
