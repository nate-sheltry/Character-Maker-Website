import * as Pw from './powers_node.js';
import * as Ss from './secondary_statistics_node.js';

export const FASERIP = {F: 2, A: 2, S: 2, E: 2, R: 2, I: 2, P: 2};

export const ranks = ["Feeble", "Poor", "Typical", "Good", "Excellent", "Remarkable", "Incredible", "Amazing", "Monstrous", "Unearthly"];
export const ranksShortHand = ["(FE)", "(PR)", "(TY)", "(GD)", "(EX)", "(RM)", "(IN)", "(AM)", "(MN)", "(UN)"];
export const rankNum = [1, 3, 5, 8, 16, 26, 36, 46, 63, 88];
const costIncrease = 4;
const humanMax = 5; const mutantAltMax = 7; const alienMax = 8;
let rankMax = 7;
let powerMax = 4;
const rankMin = 1;

// 1 = PR, 2 = TY, 3 = GD, 4 = EX, 5 = RM, 6 = IN, 7 = AM, 8 = MN

export let faseripPoints = 14;
const subFaseripButton = "faserip-button-subtract";
const addFaseripButton = "faserip-button-add";
const __faseripPointText = document.querySelector("#faserip_box").querySelector("#points_value");

function changeCSSProperty(objects, property, value){
    for (let i = 0; i < objects.length; i++){
        document.querySelector(objects[i]).style.setProperty(property, value);
    }
}

export function determineMax(race){
    switch(race){
        case 'Human':
            changeCSSProperty(['#Altered_Human', '#Hi-Tech', '#Alien', '#Mutant'], 'background-color', 'lightgrey');
            rankMax = humanMax; powerMax = 4;
            break;
        case 'Hi-Tech':
            changeCSSProperty(['#Human', '#Altered_Human', '#Alien', '#Mutant'], 'background-color', 'lightgrey');
            rankMax = humanMax; powerMax = 4;
            break;
        case 'Altered_Human':
            changeCSSProperty(['#Human', '#Hi-Tech', '#Alien', '#Mutant'], 'background-color', 'lightgrey');
            rankMax = mutantAltMax; powerMax = 4;
            break;
        case 'Mutant':
            changeCSSProperty(['#Human', '#Hi-Tech', '#Altered_Human', '#Alien'], 'background-color', 'lightgrey');
            rankMax = mutantAltMax; powerMax = 5;
            break;
        case 'Alien':
            changeCSSProperty(['#Human', '#Hi-Tech', '#Altered_Human', '#Mutant'], 'background-color', 'lightgrey');
            rankMax = alienMax;  powerMax = 5;
            break;
    }
    changeCSSProperty(['#'+race], 'background-color', 'grey')
    Pw.updatePowerLimit(powerMax)
}

export function subtractFaserip(min, stat, Points){
	if(stat > min && stat < costIncrease + 1){
		stat -= 1;
		Points += 1;}
    else if(stat >= costIncrease + 1){
        stat -= 1;
        Points += 1+(stat - 3);}
	return [stat, Points]
}

export function addFaserip(max, stat, Points){
	if((stat < max && stat < costIncrease) && Points > 0){
		stat += 1;
		Points -= 1;}
    else if((stat >= costIncrease && stat < max) && Points >= (stat - 2)){
        stat += 1;
        Points -= (1+(stat - 4));}
	return [stat, Points]
}

function displayFaserip(rankName, rankInitials, rankValue, stat, description){
    rankName.textContent = ranks[stat];
    rankInitials.textContent = ranksShortHand[stat];
    rankValue.textContent = rankNum[stat].toString();
    __faseripPointText.textContent = faseripPoints.toString();

}

export function handleSubFaserip(e){
    if(!e.target.classList.contains(subFaseripButton)){
        return
    }
    e.target.style.marginRight = "3px"; e.target.style.marginLeft = "7px";
    e.target.style.marginTop = "7px"; e.target.style.marginBottom = "3px";
    let faseripRank = e.target.parentElement.querySelector(".faserip-rank");
    let faseripRank2 = e.target.parentElement.querySelector(".faserip-rank2");
    let faseripValue = e.target.parentElement.querySelector(".faserip-value");
    switch(e.target.dataset.faserip){
        case "F":
            [FASERIP.F, faseripPoints] =
            subtractFaserip(rankMin, FASERIP.F, faseripPoints);
            displayFaserip(faseripRank, faseripRank2, faseripValue, FASERIP.F);
            break;
        case "A":
            [FASERIP.A, faseripPoints] =
            subtractFaserip(rankMin, FASERIP.A, faseripPoints);
            displayFaserip(faseripRank, faseripRank2, faseripValue, FASERIP.A);
            break;
        case "S":
            [FASERIP.S, faseripPoints] =
            subtractFaserip(rankMin, FASERIP.S, faseripPoints);
            displayFaserip(faseripRank, faseripRank2, faseripValue, FASERIP.S);
            break;
        case "E":
            [FASERIP.E, faseripPoints] =
            subtractFaserip(rankMin, FASERIP.E, faseripPoints);
            displayFaserip(faseripRank, faseripRank2, faseripValue, FASERIP.E);
            break;
        case "R":
            [FASERIP.R, faseripPoints] =
            subtractFaserip(rankMin, FASERIP.R, faseripPoints);
            displayFaserip(faseripRank, faseripRank2, faseripValue, FASERIP.R);
            break;
        case "I":
            [FASERIP.I, faseripPoints] =
            subtractFaserip(rankMin, FASERIP.I, faseripPoints);
            displayFaserip(faseripRank, faseripRank2, faseripValue, FASERIP.I);
            break;
        case "P":
            [FASERIP.P, faseripPoints] =
            subtractFaserip(rankMin, FASERIP.P, faseripPoints);
            displayFaserip(faseripRank, faseripRank2, faseripValue, FASERIP.P);
            break;
    }
    Ss.displayStatistics()
    setTimeout(function(){
        e.target.style.margin = "5px";e.target.style.marginRight = "0px";
        e.target.style.marginLeft = "10px";
    }, 50);
}

export function handleAddFaserip(e){
    if(!e.target.classList.contains(addFaseripButton)){
        return
    }
    e.target.style.marginRight = "-2px"; e.target.style.marginLeft = "7px";
    e.target.style.marginTop = "7px"; e.target.style.marginBottom = "3px";
    let faseripRank = e.target.parentElement.querySelector(".faserip-rank");
    let faseripRank2 = e.target.parentElement.querySelector(".faserip-rank2");
    let faseripValue = e.target.parentElement.querySelector(".faserip-value");
    switch(e.target.dataset.faserip){
        case "F":
            [FASERIP.F, faseripPoints] =
            addFaserip(rankMax, FASERIP.F, faseripPoints);
            displayFaserip(faseripRank, faseripRank2, faseripValue, FASERIP.F);
            break;
        case "A":
            [FASERIP.A, faseripPoints] =
            addFaserip(rankMax, FASERIP.A, faseripPoints);
            displayFaserip(faseripRank, faseripRank2, faseripValue, FASERIP.A);
            break;
        case "S":
            [FASERIP.S, faseripPoints] =
            addFaserip(rankMax, FASERIP.S, faseripPoints);
            displayFaserip(faseripRank, faseripRank2, faseripValue, FASERIP.S);
            break;
        case "E":
            [FASERIP.E, faseripPoints] =
            addFaserip(rankMax, FASERIP.E, faseripPoints);
            displayFaserip(faseripRank, faseripRank2, faseripValue, FASERIP.E);
            break;
        case "R":
            [FASERIP.R, faseripPoints] =
            addFaserip(rankMax, FASERIP.R, faseripPoints);
            displayFaserip(faseripRank, faseripRank2, faseripValue, FASERIP.R);
            break;
        case "I":
            [FASERIP.I, faseripPoints] =
            addFaserip(rankMax, FASERIP.I, faseripPoints);
            displayFaserip(faseripRank, faseripRank2, faseripValue, FASERIP.I);
            break;
        case "P":
            [FASERIP.P, faseripPoints] =
            addFaserip(rankMax, FASERIP.P, faseripPoints);
            displayFaserip(faseripRank, faseripRank2, faseripValue, FASERIP.P);
            break;
    }
    Ss.displayStatistics()
    setTimeout(function(){
        e.target.style.margin = "5px";e.target.style.marginRight = "0px";
    }, 50);
}
