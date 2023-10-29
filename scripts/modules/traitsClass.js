import * as Sp from './special_node.js';
import * as Stat from './secondaryStatistics_node.js';
import * as Sk from './skill_node.js';

export const TYPE = Object.freeze({
    SPECIAL: "SPECIAL",
    DESCRIPTION: "DESCRIPTION",
    STATISTIC: "STATISTIC",
    SKILL: "SKILL"
});

export class Trait{
    //Key parameters/arguments should always be an array to account for the various traits.
    //trait(name, 2x(type[special/skill/stat], array, index, value_modifier), selected = is it in effect or no?)
    constructor(name, type1, stat1 = null, key1  = null, effect1  = null, type2 = null, stat2 = null, key2 = null, effect2 = null, selected = undefined,){
        this.name = name;
        this.type1 = type1;

        this.stat1 = stat1
        this.key1 = key1;
        this.effect1 = effect1;
        
        this.type2 = type2;
        this.stat2 = stat2
        this.key2 = key2;
        this.effect2 = effect2;
        
        this.selected = selected;

    }
    applyEffects(){
        if((this.type1 != null && this.type1 != TYPE.DESCRIPTION) && this.selected == true){
            this.runEffect('type1', 'stat1', this.key1, this.effect1)
        }
        else if((this.type1 != null && this.type1 != TYPE.DESCRIPTION) && this.selected == false){
            this.disableEffect('type1', 'stat1', this.key1, this.effect1)
        }
        if((this.type2 != null && this.type2 != TYPE.DESCRIPTION) && this.selected == true){
            this.runEffect('type2', 'stat2', this.key2, this.effect2)
        }
        else if((this.type2 != null && this.type2 != TYPE.DESCRIPTION) && this.selected == false){
            this.disableEffect('type2', 'stat2', this.key2, this.effect2)
        }
        
    }
    determineSpecialStat(key){
        let value;
        switch(key){
            case 'S':
                value = "Strength";  break;
            case 'P':
                value = "Perception";  break;
            case 'E':
                value = "Endurance";  break;
            case 'C':
                value = "Charisma";  break;
            case 'I':
                value = "Intelligence";  break;
            case 'A':
                value = "Agility";  break;
            case 'L':
                value = "Luck";  break;
        }
        return value;
    }
    runEffect(type, stat, keys, effect){
        console.log(this[type]);
        console.log(this[stat]);
        console.log(keys);
        console.log(effect)
        keys.forEach(key => {
            if(!this[stat].hasOwnProperty(key) && keys != 'NULL')
                return;
            switch(this[type]){
                case TYPE.STATISTIC:
                    this[stat].value = effect;
                    console.log(this[stat])
                    Stat.calcAllSecondaryStats();
                    return;
                case TYPE.DESCRIPTION:
                    return;
                case TYPE.SPECIAL:
                    let dataReference = this.determineSpecialStat(key);
                    let textObject = document.querySelector(`[data-reference="${dataReference}"]`).querySelector('.special-value');
                    console.log(this[stat][key])
                    this[stat][key] += effect;
                    Sp.SPECIAL_MIN[key] += effect;
                    Sp.displaySpecial(textObject, this[stat][key]);
                    console.log()
                    break;
                case TYPE.SKILL:
                    if(key == 'tagged'){
                        this[stat][key] = effect;
                        return;
                    }
                    else this[stat].value = effect;
                    Sk.calculateAllSkills(Sp.SPECIAL.S,Sp.SPECIAL.P,Sp.SPECIAL.E,Sp.SPECIAL.C,Sp.SPECIAL.I,Sp.SPECIAL.A,Sp.SPECIAL.L);
                    break;

            }
        })
    }
    disableEffect(type, stat, keys, effect){
        keys.forEach(key => {
            if(!this[stat].hasOwnProperty(key)){
                return;
            }
        })
        switch(this[type]){
            case TYPE.STATISTIC:
                this[stat].value -= effect;
                Stat.calcAllSecondaryStats();
                return;
            case TYPE.DESCRIPTION:
                return;
            case TYPE.SPECIAL:
                keys.forEach(key => {
                    let dataReference = this.determineSpecialStat(key);
                    let textObject = document.querySelector(`[data-reference="${dataReference}"]`).querySelector('.special-value');
                    this[stat][key] -= effect;
                    Sp.SPECIAL_MIN[key] = 1;
                    Sp.displaySpecial(textObject, this[stat][key]);
                });
                break;
            case TYPE.SKILL:
                keys.forEach(key => {
                    if(key == 'tagged'){
                        this[stat][key] = !effect;
                        return;
                    }
                    this[stat].value -= effect;
                    Sk.calculateAllSkills(Sp.SPECIAL.S,Sp.SPECIAL.P,Sp.SPECIAL.E,Sp.SPECIAL.C,Sp.SPECIAL.I,Sp.SPECIAL.A,Sp.SPECIAL.L);
                });
                break;

        }
    }
    tag(){
        if(this.selected == undefined || this.selected == false)
            this.selected = true;
        else if(this.selected == true)
            this.selected = false;
    }
    getTagStatus(){
        if(this.selected === undefined)
            return false;
        return this.selected;
    }
}