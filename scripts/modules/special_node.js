import * as Sk from './skill_node.js'
import * as Stat from './secondaryStatistics_node.js'
import {Trait, TYPE} from './traitsClass.js';

//colors
const defaultColor = '#fec726'
const invalidColor = '#rrrrrr'

//Enums/Trait Types

//Special
export const SPECIAL = {S: 5, P: 5, E: 5, C: 5, I: 5, A: 5, L: 5}
export const SPECIAL_MIN = {S: 1, P: 1, E: 1, C: 1, I: 1, A: 1, L: 1}
export const SPECIAL_MAX = {S: 10, P: 10, E: 10, C: 10, I: 10, A: 10, L: 10}
export const LEVEL_UP = {POINTS:0}

//Combat Traits
export const traitDict = {
bruiser: new Trait('Bruiser', TYPE.SPECIAL, SPECIAL, ['S'], 2, TYPE.STATISTIC, Stat.bruiserNeg, ['NULL'], -2),
fastShot: new Trait('Fast Shot', TYPE.DESCRIPTION),
finesse: new Trait('Finesse', TYPE.STATISTIC, Stat.finesseBonus, ['NULL'], 10),
// glowingOne: new Trait('Glowing One', TYPE.STATISTIC, Stat.secStats, ['radResistance'], 50);
// hamFisted: new Trait('Ham Fisted', TYPE.SKILL, Sk.skills.unarmed, ['tagged'], true, TYPE.SKILL, Sk.skills, ['smallGuns', 'medicine', 'repair', 'science', 'lockpick'], -20);
heavyHanded: new Trait('Heavy Handed', TYPE.STATISTIC, Stat.heavyHandedBonus, ['NULL'], 4),
jinxed: new Trait('Jinxed', TYPE.DESCRIPTION),
kamikaze: new Trait('Kamikaze', TYPE.STATISTIC, Stat.kamikazeNeg, ['NULL'], -20,  TYPE.STATISTIC, Stat.kamikazeBonus, ['NULL'], 5),
oneHander: new Trait('One Hander', TYPE.DESCRIPTION),
//rabid: new Trait('Rabid', TYPE.DESCRIPTION), //Only Animals
builtToDestroy: new Trait('Built To Destroy', TYPE.STATISTIC, Stat.builtToDestroyBonus, ['NULL'], 2,  TYPE.DESCRIPTION),
hotBlooded: new Trait('Hot Blooded', TYPE.DESCRIPTION),
triggerDiscipline: new Trait('Trigger Discipline', TYPE.DESCRIPTION),

//non-combat
chemReliant: new Trait('Chem Reliant', TYPE.DESCRIPTION),
chemResistant: new Trait('Chem Resistant', TYPE.DESCRIPTION),
//domesticated: new Trait('Domesticated', TYPE.SPECIAL, SPECIAL, ['S'], 1, TYPE.STATISTIC, Stat.secStats, ['MD'], -2), //Only Animal
fastMetabolism: new Trait('Fast Metabolism', TYPE.STATISTIC, Stat.fastMetBonus, ['NULL'], 2, TYPE.STATISTIC, Stat.fastMetaNeg, ['NULL'], -100),
//fearTheReaper: new Trait('Fear The Reaper', TYPE.DESCRIPTION), //Only Ghoul
//No Animal/Robot
goodNatured: new Trait('Good Natured', TYPE.SKILL, Sk.GoodNatureBonus, ['NULL'], 15, TYPE.SKILL, Sk.GoodNatureNeg, ['NULL'], -10),
nightPerson: new Trait('Night Person', TYPE.DESCRIPTION),
sexAppeal: new Trait('Sex Appeal', TYPE.DESCRIPTION),
skilled: new Trait('Skilled', TYPE.SKILL, Sk.SkilledMod, ['NULL'], 10, TYPE.DESCRIPTION),
smallFrame: new Trait('Small Frame', TYPE.SPECIAL, SPECIAL, ['A'], 1, TYPE.STATISTIC, Stat.smallFrameNeg, ['NULL'], -10),
techWizard: new Trait('Tech Wizard', TYPE.SPECIAL, SPECIAL, ['P'], -1, TYPE.SKILL, Sk.TechWizBonus, ['NULL'], 15)
}

console.log(traitDict.bruiser);
traitDict.bruiser.selected;
traitDict.bruiser.applyEffects();


export let specialPoints = 5;
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

export function calcLevelUpPoints(){
    LEVEL_UP.POINTS = SPECIAL.I + 5;
}

export function displaySpecial(textObject, stat, description){
    let max = SPECIAL_MAX[textObject.parentElement.getAttribute('data-reference')[0]];
    let min = SPECIAL_MIN[textObject.parentElement.getAttribute('data-reference')[0]];
    (stat > max || stat < min) ? textObject.classList.toggle('invalid-value', true) : textObject.classList.toggle('invalid-value', false);
    textObject.textContent = stat.toString();
    __specialPointText.textContent = specialPoints.toString();

}

//Event Handlers for Special Buttons.
export function handleAddSpecial(e){
    if(!e.target.classList.contains(addSpecialButton)){
        return
    }
    var margin = e.target.style.margin;
    let textObject = e.target.parentElement.querySelector(".special-value");
    switch(e.target.dataset.special){
        case "S":
            [SPECIAL.S, specialPoints] =
            addSpecial(SPECIAL_MAX.S, SPECIAL.S, specialPoints);
            displaySpecial(textObject, SPECIAL.S); Stat.calcStrengthStats();
            Sk.calculateStrengthSkills(SPECIAL.S, SPECIAL.A); break;
        case "P":
            [SPECIAL.P, specialPoints] =
            addSpecial(SPECIAL_MAX.P, SPECIAL.P, specialPoints);
            displaySpecial(textObject, SPECIAL.P); Stat.calcPerceptionStats();
            Sk.calculatePerceptionSkills(SPECIAL.P, SPECIAL.I, SPECIAL.A); break;
        case "E":
            [SPECIAL.E, specialPoints] =
            addSpecial(SPECIAL_MAX.E, SPECIAL.E, specialPoints);
            displaySpecial(textObject, SPECIAL.E, ); Stat.calcEnduranceStats();
            Sk.calculateEnduranceSkills(SPECIAL.E, SPECIAL.I); break;
        case "C":
            [SPECIAL.C, specialPoints] =
            addSpecial(SPECIAL_MAX.C, SPECIAL.C, specialPoints);
            displaySpecial(textObject, SPECIAL.C); 
            Sk.calculateCharismaSkills(SPECIAL.C, SPECIAL.L); break;
        case "I":
            [SPECIAL.I, specialPoints] =
            addSpecial(SPECIAL_MAX.I, SPECIAL.I, specialPoints);
            displaySpecial(textObject, SPECIAL.I); 
            Sk.calculateIntelligenceSkills(SPECIAL.P, SPECIAL.E, SPECIAL.I); break;
        case "A":
            [SPECIAL.A, specialPoints] =
            addSpecial(SPECIAL_MAX.A, SPECIAL.A, specialPoints);
            displaySpecial(textObject, SPECIAL.A); Stat.calcAgilityStats();
            Sk.calculateAgilitySkills(SPECIAL.S, SPECIAL.P, SPECIAL.A); break;
        case "L":
            [SPECIAL.L, specialPoints] =
            addSpecial(SPECIAL_MAX.L, SPECIAL.L, specialPoints);
            displaySpecial(textObject, SPECIAL.L); Stat.calcCritChance();
            Sk.calculateLuckSkills(SPECIAL.C, SPECIAL.L); break;
    }
    Stat.setSecondaryStatistics();
    setTimeout(function(){
    e.target.style.margin = margin;
    }, 50);
}

export function handleSubSpecial(e){
    if(!e.target.classList.contains(subSpecialButton)){
        return;
    }
    var margin = e.target.style.margin;
    let textObject = e.target.parentElement.querySelector(".special-value");
    switch(e.target.dataset.special){
        case "S":
            [SPECIAL.S, specialPoints] =
            subtractSpecial(SPECIAL_MIN.S, SPECIAL.S, specialPoints);
            displaySpecial(textObject, SPECIAL.S); Stat.calcStrengthStats();
            Sk.calculateStrengthSkills(SPECIAL.S, SPECIAL.A); break;
        case "P":
            [SPECIAL.P, specialPoints] =
            subtractSpecial(SPECIAL_MIN.P, SPECIAL.P, specialPoints);
            displaySpecial(textObject, SPECIAL.P); Stat.calcPerceptionStats();
            Sk.calculatePerceptionSkills(SPECIAL.P, SPECIAL.I, SPECIAL.A); break;
        case "E":
            [SPECIAL.E, specialPoints] =
            subtractSpecial(SPECIAL_MIN.E, SPECIAL.E, specialPoints);
            displaySpecial(textObject, SPECIAL.E); Stat.calcEnduranceStats();
            Sk.calculateEnduranceSkills(SPECIAL.E, SPECIAL.I); break;
        case "C":
            [SPECIAL.C, specialPoints] =
            subtractSpecial(SPECIAL_MIN.C, SPECIAL.C, specialPoints);
            displaySpecial(textObject, SPECIAL.C); 
            Sk.calculateCharismaSkills(SPECIAL.C, SPECIAL.L); break;
        case "I":
            [SPECIAL.I, specialPoints] =
            subtractSpecial(SPECIAL_MIN.I, SPECIAL.I, specialPoints);
            displaySpecial(textObject, SPECIAL.I); 
            Sk.calculateIntelligenceSkills(SPECIAL.P, SPECIAL.E, SPECIAL.I); break;
        case "A":
            [SPECIAL.A, specialPoints] =
            subtractSpecial(SPECIAL_MIN.A, SPECIAL.A, specialPoints);
            displaySpecial(textObject, SPECIAL.A); Stat.calcAgilityStats(); 
            Sk.calculateAgilitySkills(SPECIAL.S, SPECIAL.P, SPECIAL.A); break;
        case "L":
            [SPECIAL.L, specialPoints] =
            subtractSpecial(SPECIAL_MIN.L, SPECIAL.L, specialPoints);
            displaySpecial(textObject, SPECIAL.L); Stat.calcCritChance();
            Sk.calculateLuckSkills(SPECIAL.C, SPECIAL.L); break;
    }
    Stat.setSecondaryStatistics();
    setTimeout(function(){
    e.target.style.margin = margin;
    }, 50);
}
