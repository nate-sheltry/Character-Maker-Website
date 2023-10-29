
const barter = {value: 0, baseValue: 35, pointsAdded: 0, bonus: 0, tagged: true}

let string = JSON.parse(barter, null, '\t');
console.log(string)