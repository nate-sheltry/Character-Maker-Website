import * as Sk from './skill_node.js'
import * as Stat from './secondaryStatistics_node.js'
import {traitDict} from './special_node.js';
let traitPoints = 2;

//HTML/CSS Objects
export const __trait1 = {label: document.querySelector("[data-reference=\"trait1\"]").querySelector(".trait-label"), button: document.querySelector("[data-reference=\"trait1\"]").querySelector(".trait-button"), trait: null};
export const __trait2 = {label: document.querySelector("[data-reference=\"trait2\"]").querySelector(".trait-label"), button: document.querySelector("[data-reference=\"trait2\"]").querySelector(".trait-button"), trait: null};
export const __trait3 = {label: document.querySelector("[data-reference=\"trait3\"]").querySelector(".trait-label"), button: document.querySelector("[data-reference=\"trait3\"]").querySelector(".trait-button"), trait: null};
export const __trait4 = {label: document.querySelector("[data-reference=\"trait4\"]").querySelector(".trait-label"), button: document.querySelector("[data-reference=\"trait4\"]").querySelector(".trait-button"), trait: null};
export const __trait5 = {label: document.querySelector("[data-reference=\"trait5\"]").querySelector(".trait-label"), button: document.querySelector("[data-reference=\"trait5\"]").querySelector(".trait-button"), trait: null};
export const __trait6 = {label: document.querySelector("[data-reference=\"trait6\"]").querySelector(".trait-label"), button: document.querySelector("[data-reference=\"trait6\"]").querySelector(".trait-button"), trait: null};
export const __trait7 = {label: document.querySelector("[data-reference=\"trait7\"]").querySelector(".trait-label"), button: document.querySelector("[data-reference=\"trait7\"]").querySelector(".trait-button"), trait: null};
export const __trait8 = {label: document.querySelector("[data-reference=\"trait8\"]").querySelector(".trait-label"), button: document.querySelector("[data-reference=\"trait8\"]").querySelector(".trait-button"), trait: null};
export const __traitObjects = [__trait1, __trait2, __trait3, __trait4, __trait5, __trait6, __trait7, __trait8];

function tagBtn(object, trait){
    let selected = trait.selected;
    if(object.classList.contains('trait-selected'))
        object = object.parentElement;
    if((selected == false || selected == undefined) && traitPoints > 0){
        trait.tag()
        traitPoints -= 1;
        trait.applyEffects()
        object.style.backgroundImage = `url("images/tag_btn_down.png")`;
        object.firstChild.style.visibility = "visible";}
    else if(selected == true){
        trait.tag()
        traitPoints += 1;
        trait.applyEffects()
        object.style.backgroundImage = `url("images/tag_btn.png")`;
        object.firstChild.style.visibility = "hidden";}
}

__traitObjects.forEach( traitObject => {
    let btn = traitObject.button;
    btn.addEventListener('pointerdown', (e) => {
        console.log()
        tagBtn(e.target, traitObject.trait)
    });
});

const __traitPageValue = document.querySelector("#traits-value")
//non-Combat

//Combat
let traitPage = 1;

function changeTraitDisplay(object){
    (object.trait.selected != true) ?
        (object.button.style.backgroundImage = `url("images/tag_btn.png")`, object.button.firstChild.style.visibility = "hidden"):
        (object.button.style.backgroundImage = `url("images/tag_btn_down.png")`, object.button.firstChild.style.visibility = "visible");
}
function displayTrait(element, object, traits, i){
    object.setAttribute('data-name', traits[i]);
    element.label.textContent = traitDict[traits[i]] ? (object.style.visibility = 'visible',
    element.trait = traitDict[traits[i]], traitDict[traits[i]].name) : object.style.visibility = 'hidden';
}

export function traitPageUpdate(){
    let traits = Object.keys(traitDict)
    console.log(traits);
    let i;
    switch(traitPage){
        default:
        case 1: i = 0; break
        case 2: i = 8; break
        case 3: i = 16; break
    }
    
    displayTrait(__trait1, __trait1.label.parentElement, traits, i);displayTrait(__trait2, __trait2.label.parentElement, traits, i+1);
    displayTrait(__trait3, __trait3.label.parentElement, traits, i+2);displayTrait(__trait4, __trait4.label.parentElement, traits, i+3);
    displayTrait(__trait5, __trait5.label.parentElement, traits, i+4);displayTrait(__trait6, __trait6.label.parentElement, traits, i+5);
    displayTrait(__trait7, __trait7.label.parentElement, traits, i+6);displayTrait(__trait8, __trait8.label.parentElement, traits, i+7);

    changeTraitDisplay(__trait1);changeTraitDisplay(__trait2)
    changeTraitDisplay(__trait3);changeTraitDisplay(__trait4)
    changeTraitDisplay(__trait5);changeTraitDisplay(__trait6)
    changeTraitDisplay(__trait7);changeTraitDisplay(__trait8)

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
    console.log('not working jhimmy')
    __traitPageValue.textContent = `${traitPage}`;
    traitPageUpdate();
}