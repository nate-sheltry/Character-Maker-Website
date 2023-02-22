"use strict";
//Import functions from other script files\

import * as Sk from './modules/skill_node.js';
import * as Sp from './modules/special_node.js';
import * as Stat from './modules/secondaryStatistics_node.js';
import * as Traits from './modules/traits_node.js';

//import .json
const result = await fetch('../JSON/desc_Info.json').then((response) => {return response.json()} );
const specialInfo = result.special;
const skillInfo = result.skills;
const traitInfo = result.traits;

//import * as Special from './modules/special_calculations.js'

//Any variable starting with __ is a reference to an html id or class.

let specialImage = "";
const sex = {male: true, female: false};

const root = document.documentElement;
const __nameBox = document.querySelector("#name_header");
const __specialWrapper = document.querySelector(".special-hoverable").parentElement;
const __specialHover = "special-hoverable"
const __gender = document.querySelector("#gender_div");
const __skillWrapper = document.querySelector(".skill-hoverable").parentElement;
const __descriptionTittle = document.querySelector("#description_box").querySelector("#description_tittle");
const __descriptionFormula = document.querySelector("#description_box").querySelector("#description_formula");
const __descriptionText = document.querySelector("#description_box").lastElementChild;

const __traitPageButtonSub = document.querySelector(".traits-button-subtract");
const __traitPageButtonAdd = document.querySelector(".traits-button-add");


Sk.calculateAllSkills(Sp.SPECIAL.S, Sp.SPECIAL.P, Sp.SPECIAL.E, Sp.SPECIAL.C, Sp.SPECIAL.I, Sp.SPECIAL.A, Sp.SPECIAL.L);
Sk.skillValues();
Stat.calcAllSecondaryStats();Stat.setSecondaryStatistics();

function updateProgram(){
    Stat.calcAllSecondaryStats();Stat.setSecondaryStatistics(); Sk.skillValues();
    Sk.calculateAllSkills(Sp.SPECIAL.S, Sp.SPECIAL.P, Sp.SPECIAL.E, Sp.SPECIAL.C, Sp.SPECIAL.I, Sp.SPECIAL.A, Sp.SPECIAL.L);

}

function changeCSSVariable(variable, value){
    root.style.setProperty(variable, value);
}

function genderSelect(e){
    if(e.target == __gender.firstElementChild){
        sex.male = true; sex.female = false;
    }
    if(e.target == __gender.lastElementChild){
        sex.male = false; sex.female = true;
    }

}

function hoverEffect(e){
    getRidOfFormula();
    let gender = '';
    if(sex.male == true && sex.female == false){
        gender = "male";
    }
    else if(sex.male == false && sex.female == true){
        gender = "female";
    }
    if(e.target.parentElement == __nameBox){
        specialImage = "url(\"../images/"+ gender +"/amber/special-hover-name.png\")";
    }
    let data_reference;
    if(e.target.classList.contains(__specialHover))
        data_reference = e.target.dataset.reference
    else if(e.target.parentElement.classList.contains(__specialHover))
        data_reference = e.target.parentElement.dataset.reference
        switch(data_reference){
            case "Strength":
                specialImage = "url(\"../images/"+ gender +"/amber/special-hover-str.png\")";
                __descriptionText.textContent = specialInfo.strength;
                __descriptionTittle.textContent = data_reference
                break;
            case "Perception":
                specialImage = "url(\"../images/"+ gender +"/amber/special-hover-per.png\")";
                __descriptionText.textContent = specialInfo.perception;
                __descriptionTittle.textContent = data_reference
                break;
            case "Endurance":
                specialImage = "url(\"../images/"+ gender +"/amber/special-hover-end.png\")";
                __descriptionText.textContent = specialInfo.endurance;
                __descriptionTittle.textContent = data_reference
                break;
            case "Charisma":
                specialImage = "url(\"../images/"+ gender +"/amber/special-hover-cha.png\")";
                __descriptionText.textContent = specialInfo.charisma;
                __descriptionTittle.textContent = data_reference
                break;
            case "Intelligence":
                specialImage = "url(\"../images/"+ gender +"/amber/special-hover-int.png\")";
                __descriptionText.textContent = specialInfo.intelligence;
                __descriptionTittle.textContent = data_reference
                break;
            case "Agility":
                specialImage = "url(\"../images/"+ gender +"/amber/special-hover-agi.png\")";
                __descriptionText.textContent = specialInfo.agility;
                __descriptionTittle.textContent = data_reference
                break;
            case "Luck":
                specialImage = "url(\"../images/"+ gender +"/amber/special-hover-lck.png\")";
                __descriptionText.textContent = specialInfo.luck;
                __descriptionTittle.textContent = data_reference
                break;
        }
    changeCSSVariable("--special-image", specialImage);
}
function getRidOfFormula(){
    if(__descriptionText.style.marginTop == "-12px")
        return;
    __descriptionFormula.textContent = "";  __descriptionText.style.marginTop = "-12px";
}


function findTarget(e){
    console.log(e.target.parentElement);
    console.log(e.target.parentElement.parentElement.querySelector(".special-value"));
}

__nameBox.addEventListener("pointerover", hoverEffect);
__specialWrapper.addEventListener("pointerover", hoverEffect);
__gender.firstElementChild.addEventListener("click", genderSelect)
__gender.lastElementChild.addEventListener("click", genderSelect)
//Special Buttons
__specialWrapper.addEventListener("click", Sp.handleSubSpecial)
__specialWrapper.addEventListener("click", Sp.handleAddSpecial)
//Skills
__skillWrapper.addEventListener("pointerover", function(){Sk.hoverEffect(event, __descriptionText,__descriptionTittle, __descriptionFormula, skillInfo, __skillWrapper)});
__skillWrapper.addEventListener("click", Sk.handleSkillTag)
//Traits
__traitPageButtonAdd.addEventListener("click", () => {Traits.traitPageHandler(event, __traitPageButtonAdd, null)})
__traitPageButtonSub.addEventListener("click", () => {Traits.traitPageHandler(event, null ,__traitPageButtonSub)})

Traits.__trait1.button.addEventListener("click", () => {Traits.traitSelect(event);})