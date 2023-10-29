import * as Sp from './special_node.js'
import * as Traits from './traits_node.js'

export const smallFrameNeg = {value:0};;
export const bruiserNeg = {value:0};
export const kamikazeBonus = {value:0};
export const kamikazeNeg = {value:0};
export const builtToDestroyBonus = {value:0};
export const heavyHandedBonus = {value:0};

export const fastMetaNeg = {value:0};
export const fastMetBonus = {value:0};

export const finesseBonus = {value:0};

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
	let x = Sp.SPECIAL.A + kamikazeNeg.value; if(x < 0) x = 0;
	secStats.AC = parseInt(x);
}
//AP
function apCalc(){
	let x = (Math.floor(5 + (Sp.SPECIAL.A / 2))) + bruiserNeg.value + builtToDestroyBonus.value;
	console.log('Bruiser negative' + bruiserNeg.value)
	secStats.AP =  parseInt(x);
}
//CW
function cwCalc(){
	let x = (25 + ((25 + smallFrameNeg.value) * Sp.SPECIAL.S));
	secStats.CW = parseInt(x);
}
//MD
function meleeDamage(){
	let x = (Sp.SPECIAL.S - 5) + heavyHandedBonus.value;
	if (x <= 0){x = 1;}
	secStats.MD = parseInt(x);
}
//SQ
function sqCalc(){
	let x = (2 * Sp.SPECIAL.P) + kamikazeBonus.value;
	secStats.SQ = parseInt(x);
}
//Healing Rate
function healingRate(){
	let x;
	if(Sp.SPECIAL.E >= 11){x = 4;}
	else if ((Math.floor(Sp.SPECIAL.E / 3)) >= 1)
		x = (Math.floor(Sp.SPECIAL.E / 3));
	else {x = 1;}
	x += fastMetBonus.value;
	secStats.HR = parseInt(x);
}
//Crit-Chance
function ccCalc(){
	let x = Sp.SPECIAL.L + finesseBonus.value;
	secStats.CC = parseInt(x);
}
//Resistances
function resistanceCalc(){
	let x = (2*Sp.SPECIAL.E + fastMetaNeg.value); if(x < 0) x = 0;
	secStats.radResistance = parseInt(x); 
	let y = (5*Sp.SPECIAL.E + fastMetaNeg.value); if(y < 0) y = 0;
	secStats.poisResistance = parseInt(y);
	let z = 30; secStats.elecResistance = parseInt(z);
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
	setSecondaryStatistics();
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