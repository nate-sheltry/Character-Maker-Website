
export const POWERS = {P1: 0, P2: 0, P3: 0, P4: 0, P5: 0, P6: 0, P7: 0, P8: 0};
export const TALENTS = {T1: 0, T2: 0, T3: 0, T4: 0, T5: 0, T6: 0, T7: 0, T8: 0};

export const ranks = ["Shift-0", "Feeble", "Poor", "Typical", "Good", "Excellent", "Remarkable", "Incredible", "Amazing", "Monstrous", "Unearthly"];
export const ranksShortHand = ["(0)", "(FE)", "(PR)", "(TY)", "(GD)", "(EX)", "(RM)", "(IN)", "(AM)", "(MN)", "(UN)"];
export const rankNum = [0, 1, 3, 5, 8, 16, 26, 36, 46, 63, 88];
const costIncrease = 5;
let rankMax = 8;
const rankMin = 0;

// 0 = Shift-0, 1 = FE, 2 = PR, 3 = TY, 4 = GD, 5 = EX, 6 = RM, 7 = IN, 8 = AM, 9 = MN

export let powerPoints = 10;
export let powerLimit = 4;
export let converted = 0;
const subPowerButton = "powers-button-subtract";
const addPowerButton = "powers-button-add";
const subTalentButton = "talents-button-subtract";
const addTalentButton = "talents-button-add";
const subConvertButton = "slot-button-subtract";
const addConvertButton = "slot-button-add";
const __powerPointText = document.querySelector("#powers_box").querySelector("#power_points_value");
const __powerLimitText = document.querySelector("#powers_box").querySelector("#power_limit_value");

export function subtractTalent(stat, Points, cost){
    if(stat == 1){Points += cost; stat = 0;}
    return [stat, Points]
}

export function addTalent(stat, Points, cost){
    if(stat == 0){Points -= cost; stat = 1;}
    return [stat, Points]
}

export function convertLimitToPoint(Limit, Points, Converted){
    if(Limit >= 1){
        Limit -= 1; Points += 1;
        Converted += 1;
    }
    return [Limit, Points, Converted]
}

export function convertPointToLimit(Limit, Points, Converted){
    if(Converted > 0 & Points > 0){
        Limit += 1; Points -= 1;
        Converted -= 1;
    }
    return [Limit, Points, Converted]
}

export function subtractPower(min, stat, Points, InitialCost){
    if(stat == 1){
        stat -= 1;
        powerLimit += InitialCost;
    }
	else if(stat > 1 && stat < costIncrease + 1){
		stat -= 1;
		Points += 1;}
    else if(stat >= costIncrease + 1){
        stat -= 1;
        Points += (stat - 3);}
	return [stat, Points]
}

export function addPower(max, stat, Points, InitialCost){
    if(stat == 0 && powerLimit >= InitialCost){
        stat += 1;
        powerLimit -= InitialCost;
    }
	else if((stat > 0 && stat < max && stat < costIncrease) && Points > 0){
		stat += 1;
		Points -= 1;}
    else if((stat >= costIncrease && stat < max) && Points >= (stat - 3)){
        stat += 1;
        Points -= (stat - 4);}
	return [stat, Points]
}

export function updatePowerLimit(powersAmount){
    powerLimit = powersAmount;
    powerPoints = 10; converted = 0;
    __powerLimitText.textContent = powersAmount.toString();
}

function displayTalent(rankValue, stat){
    rankValue.textContent = stat.toString();
    __powerPointText.textContent = powerPoints.toString();

}

function displayPower(rankName, rankInitials, rankValue, stat, description){
    rankName.textContent = ranks[stat];
    rankInitials.textContent = ranksShortHand[stat];
    rankValue.textContent = rankNum[stat].toString();
    __powerPointText.textContent = powerPoints.toString();
    __powerLimitText.textContent = powerLimit.toString();

}

export function handleSubPower(e){
    if(!e.target.classList.contains(subPowerButton)){
        return
    }
    e.target.style.marginRight = "3px"; e.target.style.marginLeft = "7px";
    e.target.style.marginTop = "7px"; e.target.style.marginBottom = "3px";
    let powerRank = e.target.parentElement.querySelector(".powers-rank");
    let powerRank2 = e.target.parentElement.querySelector(".powers-rank2");
    let powerValue = e.target.parentElement.querySelector(".powers-value");
    switch(e.target.dataset.power){
        case "P.1":
            [POWERS.P1, powerPoints] =
            subtractPower(rankMin, POWERS.P1, powerPoints, 1);
            displayPower(powerRank, powerRank2, powerValue, POWERS.P1);
            break;
        case "P.2":
            [POWERS.P2, powerPoints] =
            subtractPower(rankMin, POWERS.P2, powerPoints, 1);
            displayPower(powerRank, powerRank2, powerValue, POWERS.P2);
            break;
        case "P.3":
            [POWERS.P3, powerPoints] =
            subtractPower(rankMin, POWERS.P3, powerPoints, 1);
            displayPower(powerRank, powerRank2, powerValue, POWERS.P3);
            break;
        case "P.4":
            [POWERS.P4, powerPoints] =
            subtractPower(rankMin, POWERS.P4, powerPoints, 2);
            displayPower(powerRank, powerRank2, powerValue, POWERS.P4);
            break;
        case "P.5":
            [POWERS.P5, powerPoints] =
            subtractPower(rankMin, POWERS.P5, powerPoints, 2);
            displayPower(powerRank, powerRank2, powerValue, POWERS.P5);
            break;
        case "P.6":
            [POWERS.P6, powerPoints] =
            subtractPower(rankMin, POWERS.P6, powerPoints, 2);
            displayPower(powerRank, powerRank2, powerValue, POWERS.P6);
            break;
        case "P.7":
            [POWERS.P7, powerPoints] =
            subtractPower(rankMin, POWERS.P7, powerPoints, 3);
            displayPower(powerRank, powerRank2, powerValue, POWERS.P7);
            break;
        case "P.8":
            [POWERS.P8, powerPoints] =
            subtractPower(rankMin, POWERS.P8, powerPoints, 3);
            displayPower(powerRank, powerRank2, powerValue, POWERS.P8);
            break;
    }
    setTimeout(function(){
        e.target.style.margin = "5px";e.target.style.marginRight = "0px";
        e.target.style.marginLeft = "10px";
    }, 50);
}

export function handleAddPower(e){
    if(!e.target.classList.contains(addPowerButton)){
        return
    }
    e.target.style.marginRight = "-2px"; e.target.style.marginLeft = "7px";
    e.target.style.marginTop = "7px"; e.target.style.marginBottom = "3px";
    let powerRank = e.target.parentElement.querySelector(".powers-rank");
    let powerRank2 = e.target.parentElement.querySelector(".powers-rank2");
    let powerValue = e.target.parentElement.querySelector(".powers-value");
    switch(e.target.dataset.power){
        case "P.1":
            [POWERS.P1, powerPoints] =
            addPower(rankMax, POWERS.P1, powerPoints, 1);
            displayPower(powerRank, powerRank2, powerValue, POWERS.P1);
            break;
        case "P.2":
            [POWERS.P2, powerPoints] =
            addPower(rankMax, POWERS.P2, powerPoints, 1);
            displayPower(powerRank, powerRank2, powerValue, POWERS.P2);
            break;
        case "P.3":
            [POWERS.P3, powerPoints] =
            addPower(rankMax, POWERS.P3, powerPoints, 1);
            displayPower(powerRank, powerRank2, powerValue, POWERS.P3);
            break;
        case "P.4":
            [POWERS.P4, powerPoints] =
            addPower(rankMax, POWERS.P4, powerPoints, 2);
            displayPower(powerRank, powerRank2, powerValue, POWERS.P4);
            break;
        case "P.5":
            [POWERS.P5, powerPoints] =
            addPower(rankMax, POWERS.P5, powerPoints, 2);
            displayPower(powerRank, powerRank2, powerValue, POWERS.P5);
            break;
        case "P.6":
            [POWERS.P6, powerPoints] =
            addPower(rankMax, POWERS.P6, powerPoints, 2);
            displayPower(powerRank, powerRank2, powerValue, POWERS.P6);
            break;
        case "P.7":
            [POWERS.P7, powerPoints] =
            addPower(rankMax, POWERS.P7, powerPoints, 3);
            displayPower(powerRank, powerRank2, powerValue, POWERS.P7);
            break;
        case "P.8":
            [POWERS.P8, powerPoints] =
            addPower(rankMax, POWERS.P8, powerPoints, 3);
            displayPower(powerRank, powerRank2, powerValue, POWERS.P8);
            break;
    }
    setTimeout(function(){
        e.target.style.margin = "5px";e.target.style.marginRight = "0px";
    }, 50);
}

function caseSubTalent(Talent, talentValue, cost){
    [Talent, powerPoints] =
    subtractTalent(Talent, powerPoints, cost);
    displayTalent(talentValue, Talent);
    return Talent;
}
function caseAddTalent(Talent, talentValue, cost){
    [Talent, powerPoints] =
    addTalent(Talent, powerPoints, cost);
    displayTalent(talentValue, Talent);
    return Talent;
}

export function handleSubTalent(e){
    if(!e.target.classList.contains(subTalentButton)){
        return
    }
    e.target.style.marginRight = "3px"; e.target.style.marginLeft = "7px";
    e.target.style.marginTop = "7px"; e.target.style.marginBottom = "3px";
    let talentValue = e.target.parentElement.querySelector(".talents-value");
    switch(e.target.dataset.talent){
        case "T.1":
            TALENTS.T1 = caseSubTalent(TALENTS.T1, talentValue, 1);
            break;
        case "T.2":
            TALENTS.T2 = caseSubTalent(TALENTS.T2, talentValue, 1);
            break;
        case "T.3":
            TALENTS.T3 = caseSubTalent(TALENTS.T3, talentValue, 1);
            break;
        case "T.4":
            TALENTS.T4 = caseSubTalent(TALENTS.T4, talentValue, 1);
            break;
        case "T.5":
            TALENTS.T5 = caseSubTalent(TALENTS.T5, talentValue, 2);
            break;
        case "T.6":
            TALENTS.T6 = caseSubTalent(TALENTS.T6, talentValue, 2);
            break;
        case "T.7":
            TALENTS.T7 = caseSubTalent(TALENTS.T7, talentValue, 2);
            break;
        case "T.8":
            TALENTS.T8 = caseSubTalent(TALENTS.T8, talentValue, 2);
            break;
    }
    setTimeout(function(){
        e.target.style.margin = "5px";e.target.style.marginRight = "0px";
        e.target.style.marginLeft = "10px";
    }, 50);
}

export function handleAddTalent(e){
    if(!e.target.classList.contains(addTalentButton)){
        return
    }
    e.target.style.marginRight = "-2px"; e.target.style.marginLeft = "7px";
    e.target.style.marginTop = "7px"; e.target.style.marginBottom = "3px";
    let talentValue = e.target.parentElement.querySelector(".talents-value");
    switch(e.target.dataset.talent){
        case "T.1":
            TALENTS.T1 = caseAddTalent(TALENTS.T1, talentValue, 1);
            break;
        case "T.2":
            TALENTS.T2 = caseAddTalent(TALENTS.T2, talentValue, 1);
            break;
        case "T.3":
            TALENTS.T3 = caseAddTalent(TALENTS.T3, talentValue, 1);
            break;
        case "T.4":
            TALENTS.T4 = caseAddTalent(TALENTS.T4, talentValue, 1);
            break;
        case "T.5":
            TALENTS.T5 = caseAddTalent(TALENTS.T5, talentValue, 2);
            break;
        case "T.6":
            TALENTS.T6 = caseAddTalent(TALENTS.T6, talentValue, 2);
            break;
        case "T.7":
            TALENTS.T7 = caseAddTalent(TALENTS.T7, talentValue, 2);
            break;
        case "T.8":
            TALENTS.T8 = caseAddTalent(TALENTS.T8, talentValue, 2);
            break;
    }
    setTimeout(function(){
        e.target.style.margin = "5px";e.target.style.marginRight = "0px";
    }, 50);
}

export function handleConvertPoint(e){
    if(!e.target.classList.contains(addConvertButton)){
        return
    }
    e.target.style.marginRight = "3px"; e.target.style.marginLeft = "7px";
    e.target.style.marginTop = "27px"; e.target.style.marginBottom = "3px";
    [powerLimit, powerPoints, converted] = 
    convertPointToLimit(powerLimit, powerPoints, converted);
    __powerPointText.textContent = powerPoints.toString();
    __powerLimitText.textContent = powerLimit.toString();
    setTimeout(function(){
        e.target.style.margin = "5px";e.target.style.marginRight = "0px";
        e.target.style.marginTop = "25px";
    }, 50);
}

export function handleConvertLimit(e){
    if(!e.target.classList.contains(subConvertButton)){
        return
    }
    e.target.style.marginLeft = "98px";
    e.target.style.marginTop = "27px"; e.target.style.marginBottom = "3px";
    [powerLimit, powerPoints, converted] = 
    convertLimitToPoint(powerLimit, powerPoints, converted);
    __powerPointText.textContent = powerPoints.toString();
    __powerLimitText.textContent = powerLimit.toString();
    setTimeout(function(){
        e.target.style.marginTop = "25px"; e.target.style.marginLeft = "100px";
    }, 50);
}
