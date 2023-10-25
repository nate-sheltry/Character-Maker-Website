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

//HP
function hpCalc(){
	let x = (15 + (Sp.SPECIAL.S + (2 * Sp.SPECIAL.E)));
	secStats.HP = parseInt(x);
}
//AC
function acCalc(){
	let x = Sp.SPECIAL.A;
	secStats.AC = parseInt(x);
	Sp.traitDict.kamikaze.repeatEffect1();
	if(secStats.AC < 0){secStats.AC = 0}
}
//AP
function apCalc(){
	let x = [Math.floor(5 + (Sp.SPECIAL.A / 2))];
	if(x > 10){x = 10;}
	secStats.AP =  parseInt(x);
	Sp.traitDict.bruiser.repeatEffect2();
	Sp.traitDict.builtToDestroy.repeatEffect1();
}
//CW
function cwCalc(){
	let x = (25 + (25 * Sp.SPECIAL.S));
	if(Sp.traitDict.smallFrame.getTagStatus()){
		x = 25 + (15 * Sp.SPECIAL.S);
	}
	secStats.CW = parseInt(x);
}
//MD
function meleeDamage(){
	let x = (Sp.SPECIAL.S - 5);
	if (x <= 0){x = 1;}
	secStats.MD = parseInt(x);
	Sp.traitDict.heavyHanded.repeatEffect1();
}
//SQ
function sqCalc(){
	let x = (2 * Sp.SPECIAL.P);
	secStats.SQ = parseInt(x);
	Sp.traitDict.kamikaze.repeatEffect2();
}
//Healing Rate
function healingRate(){
	let x;
	if(Sp.SPECIAL.E >= 11){x = 4;}
	else if ((Math.floor(Sp.SPECIAL.E / 3)) >= 1)
		x = (Math.floor(Sp.SPECIAL.E / 3));
	else {x = 1;}
	secStats.HR = parseInt(x); Sp.traitDict.fastMetabolism.repeatEffect1();
}
//Crit-Chance
function ccCalc(){
	let x = Sp.SPECIAL.L;
	secStats.CC = parseInt(x);
	Sp.traitDict.finesse.repeatEffect1();
}
//Resistances
function resistanceCalc(){
	let x = (2*Sp.SPECIAL.E); secStats.radResistance = parseInt(x);
	let y = (5*Sp.SPECIAL.E); secStats.poisResistance = parseInt(y);
	let z = 30; secStats.elecResistance = parseInt(z);
	Sp.traitDict.fastMetabolism.repeatEffect2();

	if(secStats.radResistance < 0){secStats.radResistance = 0}
	if(secStats.poisResistance < 0){secStats.poisResistance = 0}
}


function checkStatistics(){
	secStats.forEach(stat => {
		if(stat < 0){stat = 0;}
	});
}

export function setSecondaryStatistics(){
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
	hpCalc();
	acCalc();

	apCalc();
	cwCalc();
	
	meleeDamage();
	sqCalc();	

	healingRate();
	ccCalc();
	resistanceCalc();
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

	hpCalc();
	cwCalc();

	meleeDamage();
}

export function calcEnduranceStats(){
	hpCalc();	

	healingRate();
	resistanceCalc();
}

export function calcAgilityStats(){
	acCalc();
	apCalc();
}
export function calcPerceptionStats() {sqCalc();}
export function calcCritChance() {ccCalc()}