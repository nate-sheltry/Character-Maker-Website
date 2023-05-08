import * as Sp from './special_node.js'
import * as Traits from './traits_node.js'

export let HP = 0; export let AC = 0; export let AP = 0; export let carryWeight = 0; 
export let MD = 0; export let SQ = 0; export let HR = 0; export let CC = 0;
export let radResistance = 0; export let poisResistance = 0; export let elecResistance = 0;

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
	if(Traits.bruiser == true)
		AP -= 2;
	
}

export function setSecondaryStatistics(){
	statTraitCheck();
	__hpValue.textContent = `${HP}/${HP}`;
	__acValue.textContent = `${AC}`;
	__apValue.textContent = `${AP}`;
	__cwValue.textContent = `${carryWeight}`;
	__mdValue.textContent = `${MD}`;
	__drValue.textContent = `${0}%`;
	__prValue.textContent = `${poisResistance}%`;
	__rrValue.textContent = `${radResistance}%`;
	__erValue.textContent = `${elecResistance}%`;
	__sqValue.textContent = `${SQ}`;
	__hrValue.textContent = `${HR}`;
	__ccValue.textContent = `${CC}%`;


}

export function calcAllSecondaryStats(){
	//Calculate Them
	HP = (15 + (Sp.SPECIAL.S + (2 * Sp.SPECIAL.E)));
	AC = Sp.SPECIAL.A;

	AP = parseInt(apCalc());
	carryWeight = (25 + (25 * Sp.SPECIAL.S));
	

	MD = parseInt(meleeDamage());
	SQ = (2 * Sp.SPECIAL.P);	

	HR = parseInt(healingRate());
	CC = Sp.SPECIAL.L;
	radResistance = (2*Sp.SPECIAL.E);
	poisResistance = (5*Sp.SPECIAL.E);
	elecResistance = 30;
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

	HP = (15 + (Sp.SPECIAL.S + (2 * Sp.SPECIAL.E)));
	carryWeight = (25 + (25 * Sp.SPECIAL.S));

	MD = parseInt(meleeDamage());
}

export function calcEnduranceStats(){
	HP = (15 + (Sp.SPECIAL.S + (2 * Sp.SPECIAL.E)));	

	HR = parseInt(healingRate());
	radResistance = (2*Sp.SPECIAL.E);
	poisResistance = (5*Sp.SPECIAL.E);
}

export function calcAgilityStats(){
	AC = Sp.SPECIAL.A;
	AP = parseInt(apCalc());
}
export function calcPerceptionStats() {SQ = (2 * Sp.SPECIAL.P);	}
export function calcCritChance() {CC = Sp.SPECIAL.L; }