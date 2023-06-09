import * as Sk from './skill_node.js'
import * as Stat from './secondaryStatistics_node.js'
import {traitDict} from './special_node.js';

//HTML/CSS Objects
export const __trait1 = {label: document.querySelector("[data-reference=\"trait1\"]").querySelector(".trait-label"), button: document.querySelector("[data-reference=\"trait1\"]").querySelector(".trait-button")};
export const __trait2 = {label: document.querySelector("[data-reference=\"trait2\"]").querySelector(".trait-label"), button: document.querySelector("[data-reference=\"trait2\"]").querySelector(".trait-button")};
export const __trait3 = {label: document.querySelector("[data-reference=\"trait3\"]").querySelector(".trait-label"), button: document.querySelector("[data-reference=\"trait3\"]").querySelector(".trait-button")};
export const __trait4 = {label: document.querySelector("[data-reference=\"trait4\"]").querySelector(".trait-label"), button: document.querySelector("[data-reference=\"trait4\"]").querySelector(".trait-button")};
export const __trait5 = {label: document.querySelector("[data-reference=\"trait5\"]").querySelector(".trait-label"), button: document.querySelector("[data-reference=\"trait5\"]").querySelector(".trait-button")};
export const __trait6 = {label: document.querySelector("[data-reference=\"trait6\"]").querySelector(".trait-label"), button: document.querySelector("[data-reference=\"trait6\"]").querySelector(".trait-button")};
export const __trait7 = {label: document.querySelector("[data-reference=\"trait7\"]").querySelector(".trait-label"), button: document.querySelector("[data-reference=\"trait7\"]").querySelector(".trait-button")};
export const __trait8 = {label: document.querySelector("[data-reference=\"trait8\"]").querySelector(".trait-label"), button: document.querySelector("[data-reference=\"trait8\"]").querySelector(".trait-button")};

const __traitPageValue = document.querySelector(".traits-value")

//non-Combat

//Combat
let traitPage = 1;



export function traitPageUpdate(){
    let traits = Object.keys(traitDict)
    console.log(traits);
    let i;
    if(traitPage == 1){
        i = 0;
        __trait1.label.textContent = traitDict[traits[i]].name;
        __trait2.label.textContent = traitDict[traits[i+1]].name;
        __trait3.label.textContent = traitDict[traits[i+2]].name;
        __trait4.label.textContent = traitDict[traits[i+3]].name;
        __trait5.label.textContent = traitDict[traits[i+4]].name;
        __trait6.label.textContent = traitDict[traits[i+5]].name;
        __trait7.label.textContent = traitDict[traits[i+6]].name;
        __trait8.label.textContent = traitDict[traits[i+7]].name;
    }
    else if(traitPage == 2){
        i = 7;
        __trait1.label.textContent = traitDict[traits[i]].name;
        __trait2.label.textContent = traitDict[traits[i+1]].name;
        __trait3.label.textContent = traitDict[traits[i+2]].name;
        __trait4.label.textContent = traitDict[traits[i+3]].name;
        __trait5.label.textContent = traitDict[traits[i+4]].name;
        __trait6.label.textContent = traitDict[traits[i+5]].name;
        __trait7.label.textContent = traitDict[traits[i+6]].name;
        __trait8.label.textContent = traitDict[traits[i+7]].name;
    }
    else if(traitPage == 3){
        i = 14;
        __trait1.label.textContent = traitDict[traits[i]].name;
        try{__trait2.label.textContent = traitDict[traits[i+1]].name}catch (Exception){
            __trait2.label.textContent = "";
        };
        try{__trait3.label.textContent = traitDict[traits[i+2]].name}catch (Exception){
            __trait3.label.textContent = "";
        };
        try{__trait4.label.textContent = traitDict[traits[i+3]].name}catch (Exception){
            __trait4.label.textContent = "";
        };
        try{__trait5.label.textContent = traitDict[traits[i+4]].name}catch (Exception){
            __trait5.label.textContent = "";
        };
        try{__trait6.label.textContent = traitDict[traits[i+5]].name}catch (Exception){
            __trait6.label.textContent = "";
        };
        try{__trait7.label.textContent = traitDict[traits[i+6]].name}catch (Exception){
            __trait7.label.textContent = "";
        };
        try{__trait8.label.textContent = traitDict[traits[i+7]].name}catch (Exception){
            __trait8.label.textContent = "";
        };
    }
}

export function traitPageHandler(e, button1, button2){
    if(e.target === button1){
        if(traitPage < 3)
            traitPage += 1;
    }
    if(e.target === button2){
        if(traitPage > 1)
            traitPage -= 1;
    }
    __traitPageValue.textContent = `${traitPage}`;
    traitPageUpdate();
}

export function traitSelect(e){
    if(e.target === __trait1){
        switch(traitPage){
            case 1:
                if(!Traits.bruiser)Traits.bruiser = true;
                else if(Traits.bruiser)Traits.bruiser = false;
                break;
            case 2:
                if(!Traits.builtToDestroy)Traits.builtToDestroy = true;
                else if(Traits.builtToDestroy)Traits.builtToDestroy = false;
                break;
            case 3:
                Traits.skilled = true;
                break;
        }
    }
    if(e.target === __trait2){
        switch(traitPage){
            case 1:
                Traits.fastShot = true;
                break;
            case 2:
                Traits.triggerDiscipline = true;
                break;
            case 3:
                Traits.smallFrame = true;
                break;
        }
    }
}

export function bruiserEffect(){
    Stat.AP -= 2;
    Sp.SPECIAL.S += 2;
    if(Sp.SPECIAL.S > 10){Sp.specialPoints += (Sp.SPECIAL.S - 10); Sp.SPECIAL.S = 10;}
}
