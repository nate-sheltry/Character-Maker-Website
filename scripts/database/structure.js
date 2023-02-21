const characterInfo = {}
const secondaryStatistics = {
    hp: 0, ac: 0, ap: 0,
    carryWeight: 0,
    md: 0, sq: 0, hr: 0, cc: 0,
    radResistance: 0,
    poisResistance: 0,
    elecResistance: 0
}
const special = {S: 5, P: 5, E: 5, C: 5, I: 5, A: 5, L: 5}
const skills = {
    barter: {value: 0, tagged: false, baseValue: 0, pointsAdded: 0, bonus: 0},
    bigGuns: {value: 0, tagged: false, baseValue: 0, pointsAdded: 0, bonus: 0},
    energyWeapons: {value: 0, tagged: false, baseValue: 0, pointsAdded: 0, bonus: 0},
    gambling: {value: 0, tagged: false, baseValue: 0, pointsAdded: 0, bonus: 0},
    lockpick: {value: 0, tagged: false, baseValue: 0, pointsAdded: 0, bonus: 0},
    medicine: {value: 0, tagged: false, baseValue: 0, pointsAdded: 0, bonus: 0},
    meleeWeapons: {value: 0, tagged: false, baseValue: 0, pointsAdded: 0, bonus: 0},
    repair: {value: 0, tagged: false, baseValue: 0, pointsAdded: 0, bonus: 0},
    science: {value: 0, tagged: false, baseValue: 0, pointsAdded: 0, bonus: 0},
    smallGuns: {value: 0, tagged: false, baseValue: 0, pointsAdded: 0, bonus: 0},
    sneak: {value: 0, tagged: false, baseValue: 0, pointsAdded: 0, bonus: 0},
    speech: {value: 0, tagged: false, baseValue: 0, pointsAdded: 0, bonus: 0},
    survival: {value: 0, tagged: false, baseValue: 0, pointsAdded: 0, bonus: 0},
    throwing: {value: 0, tagged: false, baseValue: 0, pointsAdded: 0, bonus: 0},
    traps: {value: 0, tagged: false, baseValue: 0, pointsAdded: 0, bonus: 0},
    unarmed: {value: 0, tagged: false, baseValue: 0, pointsAdded: 0, bonus: 0}
}
const traits = {}
const file = {characterInfo, secondaryStatistics, special, skills, traits}

let string = JSON.stringify(file, null, 4);
console.log(string);