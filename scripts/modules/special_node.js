
//Special
export const SPECIAL = {S: 5, P: 5, E: 5, C: 5, I: 5, A: 5, L: 5}
export const SPECIAL_MIN = {S: 1, P: 1, E: 1, C: 1, I: 1, A: 1, L: 1}
export const SPECIAL_MAX = {S: 10, P: 10, E: 10, C: 10, I: 10, A: 10, L: 10}

let specialPoints = 5;
const subSpecialButton = "special-button-subtract";
const addSpecialButton = "special-button-add";
const __specialPointText = document.querySelector("#points_value");
const __descriptionText = document.querySelector("#description");

const strengthDescription = ""

//Modify Special
export function subtractSpecial(min, stat, Points){
	if (stat > min){
		Points += 1;
		stat -= 1;}
	return [stat, Points]}

export function addSpecial(max, stat, Points){
	if(stat < max && Points > 0){
		stat += 1;
		Points -= 1;
		console.log(stat);}
	return [stat, Points]}



function displaySpecial(textObject, stat, description){
    textObject.textContent = stat.toString();
    __specialPointText.textContent = specialPoints.toString();

}

//Event Handlers for Special Buttons.
export function handleAddSpecial(e){
    if(!e.target.classList.contains(addSpecialButton)){
        return
    }
    e.target.style.marginRight = "-2px"; e.target.style.marginLeft = "12px";
    e.target.style.marginTop = "7px"; e.target.style.marginBottom = "3px";
    let textObject = e.target.parentElement.querySelector(".special-value");
    switch(e.target.dataset.special){
        case "S":
            [SPECIAL.S, specialPoints] =
            addSpecial(SPECIAL_MAX.S, SPECIAL.S, specialPoints);
            displaySpecial(textObject, SPECIAL.S); break;
        case "P":
            [SPECIAL.P, specialPoints] =
            addSpecial(SPECIAL_MAX.P, SPECIAL.P, specialPoints);
            displaySpecial(textObject, SPECIAL.P); break;
        case "E":
            [SPECIAL.E, specialPoints] =
            addSpecial(SPECIAL_MAX.E, SPECIAL.E, specialPoints);
            displaySpecial(textObject, SPECIAL.E, ); break;
        case "C":
            [SPECIAL.C, specialPoints] =
            addSpecial(SPECIAL_MAX.C, SPECIAL.C, specialPoints);
            displaySpecial(textObject, SPECIAL.C); break;
        case "I":
            [SPECIAL.I, specialPoints] =
            addSpecial(SPECIAL_MAX.I, SPECIAL.I, specialPoints);
            displaySpecial(textObject, SPECIAL.I); break;
        case "A":
            [SPECIAL.A, specialPoints] =
            addSpecial(SPECIAL_MAX.A, SPECIAL.A, specialPoints);
            displaySpecial(textObject, SPECIAL.A); break;
        case "L":
            [SPECIAL.L, specialPoints] =
            addSpecial(SPECIAL_MAX.L, SPECIAL.L, specialPoints);
            displaySpecial(textObject, SPECIAL.L); break;
    }
    setTimeout(function(){
    e.target.style.margin = "5px";e.target.style.marginRight = "0px";
    e.target.style.marginLeft = "10px";
    }, 50);
}

export function handleSubSpecial(e){
    if(!e.target.classList.contains(subSpecialButton)){
        return;
    }
    e.target.style.marginRight = "2px"; e.target.style.marginLeft = "8px";
    e.target.style.marginTop = "7px"; e.target.style.marginBottom = "3px";
    let textObject = e.target.parentElement.querySelector(".special-value");
    switch(e.target.dataset.special){
        case "S":
            [SPECIAL.S, specialPoints] =
            subtractSpecial(SPECIAL_MIN.S, SPECIAL.S, specialPoints);
            displaySpecial(textObject, SPECIAL.S); break;
        case "P":
            [SPECIAL.P, specialPoints] =
            subtractSpecial(SPECIAL_MIN.P, SPECIAL.P, specialPoints);
            displaySpecial(textObject, SPECIAL.P); break;
        case "E":
            [SPECIAL.E, specialPoints] =
            subtractSpecial(SPECIAL_MIN.E, SPECIAL.E, specialPoints);
            displaySpecial(textObject, SPECIAL.E); break;
        case "C":
            [SPECIAL.C, specialPoints] =
            subtractSpecial(SPECIAL_MIN.C, SPECIAL.C, specialPoints);
            displaySpecial(textObject, SPECIAL.C); break;
        case "I":
            [SPECIAL.I, specialPoints] =
            subtractSpecial(SPECIAL_MIN.I, SPECIAL.I, specialPoints);
            displaySpecial(textObject, SPECIAL.I); break;
        case "A":
            [SPECIAL.A, specialPoints] =
            subtractSpecial(SPECIAL_MIN.A, SPECIAL.A, specialPoints);
            displaySpecial(textObject, SPECIAL.A); break;
        case "L":
            [SPECIAL.L, specialPoints] =
            subtractSpecial(SPECIAL_MIN.L, SPECIAL.L, specialPoints);
            displaySpecial(textObject, SPECIAL.L); break;
    }
    setTimeout(function(){
        e.target.style.margin = "5px";e.target.style.marginRight = "0px";
        e.target.style.marginLeft = "10px";
    }, 50);
}