export const TYPE = Object.freeze({
    SPECIAL: "SPECIAL",
    DESCRIPTION: "DESCRIPTION",
    STATISTIC: "STATISTIC",
    SKILL: "SKILL"
});

export class Trait{
    //Key parameters/arguments should always be an array to account for the various traits.
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
        if(this.type1 != null && this.selected == true){
            this.runEffect('type1', 'stat1', this.key1, this.effect1)
        }
        else if(this.type1 != null && this.selected == false){
            this.disableEffect('type1', 'stat1', this.key1, this.effect1)
        }
        if(this.type2 != null && this.selected == true){
            this.runEffect('type2', 'stat2', this.key2, this.effect2)
        }
        else if(this.type2 != null && this.selected == false){
            this.disableEffect('type2', 'stat2', this.key2, this.effect2)
        }
    }
    repeatEffect(type, stat, keys, effect){
        if(this[type])
        keys.forEach(key => {
            if(!this[stat].hasOwnProperty(key)){
                return;
            }
            //This isn't a repeat effect
            if(key == 'tagged')
                return;
        })
        if(this.selected != true)
            return;
        if(this.name == 'Small Frame'){
            switch(this[type]){
                case TYPE.STATISTIC:
                    this[stat][key] = effect;
                    break;
            }

        }
        switch(this[type]){
            case TYPE.STATISTIC:
                this[stat][key] += effect;
                break;
            case TYPE.SKILL:
                this[stat][key] += effect;
                break;
        }
    }
    runEffect(type, stat, keys, effect){
        console.log(this[type]);
        console.log(this[stat]);
        console.log(keys);
        console.log(effect)
        keys.forEach(key => {
            console.log(this[stat][key]+= 2)
        })
        keys.forEach(key => {
            if(!this[stat].hasOwnProperty(key)){
                return;
            }
        })
        switch(this[type]){
            case TYPE.STATISTIC:
                return;
            case TYPE.DESCRIPTION:
                return;
            case TYPE.SPECIAL:
                keys.forEach(key => {
                    this[stat][key] += effect;
                    console.log()
                });
                break;
            case TYPE.SKILL:
                keys.forEach(key => {
                    if(key == 'tagged'){
                        this[stat][key] = effect;
                        return;
                    }
                });
                break;

        }
    }
    disableEffect(type, stat, keys, effect){
        keys.forEach(key => {
            if(!this[stat].hasOwnProperty(key)){
                return;
            }
        })
        switch(this[type]){
            case TYPE.STATISTIC:
                return;
            case TYPE.DESCRIPTION:
                return;
            case TYPE.SPECIAL:
                keys.forEach(key => {
                    this[stat][key] -= effect;
                });
                break;
            case TYPE.SKILL:
                keys.forEach(key => {
                    if(key == 'tagged'){
                        this[stat][key] = !effect;
                        return;
                    }
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