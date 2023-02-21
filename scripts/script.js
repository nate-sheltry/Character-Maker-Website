"use strict";
//Import functions from other script files\

import * as Fr from './modules/faserip_node.js';
import * as Pw from './modules/powers_node.js';

//import .json
//const result = await fetch('../JSON/desc_Info.json').then((response) => {return response.json()} );
//const faseripInfo = result.faserip;
//const skillInfo = result.skills;
//const traitInfo = result.traits;

//import * as faserip from './modules/faserip_calculations.js'

//Any variable starting with __ is a reference to an html id or class.

let faseripImage = "";
const sex = {male: true, female: false};

const root = document.documentElement;
const __nameBox = document.querySelector("#name_header");
const __faseripWrapper = document.querySelector(".faserip-hoverable").parentElement;
const __faseripHover = "faserip-hoverable"
const __powersWrapper = document.querySelector(".powers-hoverable").parentElement;
const __talentsWrapper = document.querySelector(".talents-hoverable").parentElement;
const __pointsWrapper = document.querySelector("#point_to_limit_box");

const __descriptionTittle = document.querySelector("#description_box").querySelector("#description_tittle");
const __descriptionFormula = document.querySelector("#description_box").querySelector("#description_formula");
const __descriptionText = document.querySelector("#description_box").lastElementChild;

const __traitPageButtonSub = document.querySelector(".traits-button-subtract");
const __traitPageButtonAdd = document.querySelector(".traits-button-add");

const __characterTypeBox = document.querySelector("#character_type_box");

function changeCSSVariable(variable, value){
    root.style.setProperty(variable, value);
}

function hoverEffect(e){
    let data_reference;
    if(e.target.classList.contains(__faseripHover))
        data_reference = e.target.dataset.reference
    else if(e.target.parentElement.classList.contains(__faseripHover))
        data_reference = e.target.parentElement.dataset.reference
        switch(data_reference){
            case "Fighting":
                faseripImage = "url(\"../images/faserip-hover-fighting.png\")";
                //__descriptionText.textContent = faseripInfo.fighting;
                __descriptionTittle.textContent = data_reference
                break;
            case "Agility":
                faseripImage = "url(\"../images/faserip-hover-agility.png\")";
                //__descriptionText.textContent = faseripInfo.perception;
                __descriptionTittle.textContent = data_reference
                break;
            case "Strength":
                faseripImage = "url(\"../images/faserip-hover-strength.png\")";
                //__descriptionText.textContent = faseripInfo.endurance;
                __descriptionTittle.textContent = data_reference
                break;
            case "Endurance":
                faseripImage = "url(\"../images/faserip-hover-endurance.png\")";
                //__descriptionText.textContent = faseripInfo.charisma;
                __descriptionTittle.textContent = data_reference
                break;
            case "Reason":
                faseripImage = "url(\"../images/faserip-hover-reason.png\")";
                //__descriptionText.textContent = faseripInfo.intelligence;
                __descriptionTittle.textContent = data_reference
                break;
            case "Intuition":
                faseripImage = "url(\"../images/faserip-hover-intuition.png\")";
                //__descriptionText.textContent = faseripInfo.agility;
                __descriptionTittle.textContent = data_reference
                break;
            case "Psyche":
                faseripImage = "url(\"../images/faserip-hover-psyche.png\")";
                //__descriptionText.textContent = faseripInfo.luck;
                __descriptionTittle.textContent = data_reference
                break;
        }
    changeCSSVariable("--faserip-image", faseripImage);
}

function handleRace(e){
    switch(e.target.id){
        case 'Human': case 'Hi-Tech': case 'Altered_Human':
        case 'Alien': case 'Mutant':
            Fr.determineMax(e.target.id)
            break;
    }
}

function getRidOfFormula(){
    if(__descriptionText.style.marginTop == "-12px")
        return;
    __descriptionFormula.textContent = "";  __descriptionText.style.marginTop = "-12px";
}


function findTarget(e){
    console.log(e.target.parentElement);
    console.log(e.target.parentElement.parentElement.querySelector(".faserip-value"));
}

__nameBox.addEventListener("pointerover", hoverEffect);
__faseripWrapper.addEventListener("pointerover", hoverEffect);
__powersWrapper.addEventListener("pointerover", hoverEffect);
//faserip Buttons
__faseripWrapper.addEventListener("click", Fr.handleSubFaserip)
__faseripWrapper.addEventListener("click", Fr.handleAddFaserip)

__powersWrapper.addEventListener("click", Pw.handleSubPower)
__powersWrapper.addEventListener("click", Pw.handleAddPower)
__talentsWrapper.addEventListener("click", Pw.handleSubTalent)
__talentsWrapper.addEventListener("click", Pw.handleAddTalent)

__pointsWrapper.addEventListener("click", Pw.handleConvertPoint)
__pointsWrapper.addEventListener("click", Pw.handleConvertLimit)

__characterTypeBox.addEventListener("click", handleRace)