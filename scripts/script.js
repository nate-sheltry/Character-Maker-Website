//Import functions from other script files
import * as Sk from './modules/skill_node.js'
import * as Sp from './modules/special_node.js'

//import * as Special from './modules/special_calculations.js'

// any variable starting with __ is a reference to an html id or class.

let specialImage = "";
const sex = {male: true, female: false};

const root = document.documentElement;
const __nameBox = document.querySelector("#name_header");
const __specialWrapper = document.querySelector(".special-hoverable").parentElement;
const __specialHover = document.querySelector(".special-hoverable");
const __gender = document.querySelector("#gender_div");

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
    switch(e.target.parentElement.dataset.reference){
        case "Strength":
            specialImage = "url(\"../images/"+ gender +"/amber/special-hover-str.png\")";
            break;
        case "Perception":
            specialImage = "url(\"../images/"+ gender +"/amber/special-hover-per.png\")";
            break;
        case "Endurance":
            specialImage = "url(\"../images/"+ gender +"/amber/special-hover-end.png\")";
            break;
        case "Charisma":
            specialImage = "url(\"../images/"+ gender +"/amber/special-hover-cha.png\")";
            break;
        case "Intelligence":
            specialImage = "url(\"../images/"+ gender +"/amber/special-hover-int.png\")";
            break;
        case "Agility":
            specialImage = "url(\"../images/"+ gender +"/amber/special-hover-agi.png\")";
            break;
        case "Luck":
            specialImage = "url(\"../images/"+ gender +"/amber/special-hover-lck.png\")";
            break;
    }
    changeCSSVariable("--special-image", specialImage);
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
