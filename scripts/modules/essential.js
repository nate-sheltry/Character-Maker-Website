
//Essential Variables
//SPECIAL
export const SPECIAL = {S: 5, P: 5, E: 5, C: 5, I: 5, A: 5, L: 5}
export const SPECIAL_MIN = {S: 1, P: 1, E: 1, C: 1, I: 1, A: 1, L: 1}
export const SPECIAL_MAX = {S: 10, P: 10, E: 10, C: 10, I: 10, A: 10, L: 10}

export let specialPoints = 5;

//Skills
export const barter = {value: 0, tagged: false};
export const bigGuns = {value: 0, tagged: false};
export const energyWeapons = {value: 0, tagged: false};
export const gambling = {value: 0, tagged: false};
export const lockpick = {value: 0, tagged: false};
export const medicine = {value: 0, tagged: false};
export const meleeWeapons = {value: 0, tagged: false};
export const repair = {value: 0, tagged: false};
export const science = {value: 0, tagged: false};
export const smallGuns = {value: 0, tagged: false};
export const sneak = {value: 0, tagged: false};
export const speech = {value: 0, tagged: false};
export const survival = {value: 0, tagged: false};
export const throwing = {value: 0, tagged: false};
export const traps = {value: 0, tagged: false};
export const unarmed = {value: 0, tagged: false};

export const skills = [barter, bigGuns, energyWeapons, gambling, lockpick, medicine, meleeWeapons, repair, science,
    smallGuns, sneak, speech, survival, throwing, traps, unarmed]

//Class for traits
export class Trait{

    constructor(name, stat, key, modifier, selected = false){
        this.name = name;
        this.stat = stat
        this.key = key;
        this.modifier = modifier;
        
        this.selected = selected;

    }
    run(){
        console.log(this.name);
    }
}