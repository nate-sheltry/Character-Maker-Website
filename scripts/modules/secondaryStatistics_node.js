import * as Sp from './special_node.js'
import * as Traits from './traits_node.js'

export const secStats = {HP:0, AC:0, AP:0, CW:0, MD:0, SQ:0, HR:0, CC:0, radResistance:0, poisResistance:0, elecResistance: 0}

//HTML/CSS Objects
const __secondaryStatisticsWrapper = document.querySelector("#secondary_statistics").querySelector("#statistics_box")
const __hpValue = document.querySelector("[data-reference=\"Hit Points\"]").querySelector(".statistic-value");
const __acValue = document.querySelector("[data-reference=\"Armor Class\"]").querySelector(".statistic-value");
const __apValue = document.querySelector("[data-reference=\"Action Points\"]").querySelector(".statistic-value");
const __cwValue = document.querySelector("[data-reference=\"Carry Weight\"]").querySelector(".statistic-value");
const __mdValue = document.querySelector("[data-reference=\"Melee Damage\"]").querySelector(".statistic-value");
const __drValue = document.querySelector("[data-reference=\"Damage Resistance\"]").querySelector(".statistic-value");
const __prValue = document.querySelector("[data-reference=\"Poison Resistance\"]").querySelector(".statistic-value");
const __rrValue = document.querySelector("[data-reference=\"Radiation Resistance\"]").querySelector(".statistic-value");
const __erValue = document.querySelector("[data-reference=\"Electric Resistance\"]").querySelector(".statistic-value");
const __sqValue = document.querySelector("[data-reference=\"Sequence\"]").querySelector(".statistic-value");
const __hrValue = document.querySelector("[data-reference=\"Healing Rate\"]").querySelector(".statistic-value");
const __ccValue = document.querySelector("[data-reference=\"Critical Chance\"]").querySelector(".statistic-value");


//strength, endurance, agility, Luck
//Healing Rate
function healingRate(){
	if(Sp.SPECIAL.E >= 11)
		return 4;
	else if ((Math.floor(Sp.SPECIAL.E / 3)) >= 1)
		return (Math.floor(Sp.SPECIAL.E / 3));
	return 1;
}
//MD function
function meleeDamage(){
	let x = 0;
	x = (Sp.SPECIAL.S - 5);
	if (x == 0)
		x = 1;
	return x;
}
//AP function
function apCalc(){
	let x = 0;
	x = [Math.floor(5 + (Sp.SPECIAL.A / 2))];
	if(x > 10) x = 10;
	return x;
}

function statTraitCheck(){
	//run code to check for trait effects
	
}
function checkStatistics(){
	secStats.forEach(stat => {
		if(stat < 0){stat = 0;}
	});
}

export function setSecondaryStatistics(){
	statTraitCheck();
	//checkStatistics();
	__hpValue.textContent = `${secStats.HP}/${secStats.HP}`;
	__acValue.textContent = `${secStats.AC}`;
	__apValue.textContent = `${secStats.AP}`;
	__cwValue.textContent = `${secStats.CW}`;
	__mdValue.textContent = `${secStats.MD}`;
	__drValue.textContent = `${0}%`;
	__prValue.textContent = `${secStats.poisResistance}%`;
	__rrValue.textContent = `${secStats.radResistance}%`;
	__erValue.textContent = `${secStats.elecResistance}%`;
	__sqValue.textContent = `${secStats.SQ}`;
	__hrValue.textContent = `${secStats.HR}`;
	__ccValue.textContent = `${secStats.CC}%`;


}

export function calcAllSecondaryStats(){
	//Calculate Them
	secStats.HP = (15 + (Sp.SPECIAL.S + (2 * Sp.SPECIAL.E)));
	secStats.AC = Sp.SPECIAL.A;

	secStats.AP = parseInt(apCalc());
	secStats.CW = (25 + (25 * Sp.SPECIAL.S));
	

	secStats.MD = parseInt(meleeDamage());
	secStats.SQ = (2 * Sp.SPECIAL.P);	

	secStats.HR = parseInt(healingRate());
	secStats.CC = Sp.SPECIAL.L;
	secStats.radResistance = (2*Sp.SPECIAL.E);
	secStats.poisResistance = (5*Sp.SPECIAL.E);
	secStats.elecResistance = 30;
//	switch(charRace){
//		case "human":
//			elecResistance = 30;
//			break;
//		case "ghoul":
//			radResistance += 80;
//			poisResistance += 30;
//			break;
//		case "mutant":
//			radResistance += 50;
//			poisResistance += 20;
//			break;
//		case "dog":
//			elecResistance = 50;
//			break;
//
//	}
}

export function calcStrengthStats(){

	secStats.HP = (15 + (Sp.SPECIAL.S + (2 * Sp.SPECIAL.E)));
	secStats.CW = (25 + (25 * Sp.SPECIAL.S));

	secStats.MD = parseInt(meleeDamage());
}

export function calcEnduranceStats(){
	secStats.HP = (15 + (Sp.SPECIAL.S + (2 * Sp.SPECIAL.E)));	

	secStats.HR = parseInt(healingRate());
	secStats.radResistance = (2*Sp.SPECIAL.E);
	secStats.poisResistance = (5*Sp.SPECIAL.E);
}

export function calcAgilityStats(){
	secStats.AC = Sp.SPECIAL.A;
	secStats.AP = parseInt(apCalc());
}
export function calcPerceptionStats() {secStats.SQ = (2 * Sp.SPECIAL.P);	}
export function calcCritChance() {secStats.CC = Sp.SPECIAL.L; }