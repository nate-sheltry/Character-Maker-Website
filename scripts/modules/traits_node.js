import * as Sp from './special_node.js'
import * as Sk from './skill_node.js'
import * as Stat from './secondaryStatistics_node.js'

//HTML/CSS Objects
export const __trait1 = {label: document.querySelector("[data-reference=\"trait1\"]").querySelector(".trait-label"), button: document.querySelector("[data-reference=\"trait1\"]").querySelector(".trait-button")};
export const __trait2 = {label: document.querySelector("[data-reference=\"trait2\"]").querySelector(".trait-label"), button: document.querySelector("[data-reference=\"trait2\"]").querySelector(".trait-button")};
export const __trait3 = {label: document.querySelector("[data-reference=\"trait3\"]").querySelector(".trait-label"), button: document.querySelector("[data-reference=\"trait3\"]").querySelector(".trait-button")};
export const __trait4 = {label: document.querySelector("[data-reference=\"trait4\"]").querySelector(".trait-label"), button: document.querySelector("[data-reference=\"trait4\"]").querySelector(".trait-button")};
export const __trait5 = {label: document.querySelector("[data-reference=\"trait5\"]").querySelector(".trait-label"), button: document.querySelector("[data-reference=\"trait5\"]").querySelector(".trait-button")};
export const __trait6 = {label: document.querySelector("[data-reference=\"trait6\"]").querySelector(".trait-label"), button: document.querySelector("[data-reference=\"trait6\"]").querySelector(".trait-button")};
export const __trait7 = {label: document.querySelector("[data-reference=\"trait7\"]").querySelector(".trait-label"), button: document.querySelector("[data-reference=\"trait7\"]").querySelector(".trait-button")};
export const __trait8 = {label: document.querySelector("[data-reference=\"trait8\"]").querySelector(".trait-label"), button: document.querySelector("[data-reference=\"trait8\"]").querySelector(".trait-button")};

const __traitPageValue = document.querySelector(".traits-value")

//Combat
let traitPage = 1;

export let bruiser = false;	export let fastShot = false; export let finesse = false;
export let hvyHanded = false; export let jinxed = false; export let kamikaze = false;
export let oneHander = false; export let hotBlooded = false; 

export let builtToDestroy = false; export let triggerDiscipline = false;
export let hotBloodedCheck = false;

//non-Combat
export let chemReliant = false;	export let chemResistant = false; export let fastMetabolism = false;
export let gifted = false; export let goodNatured = false; 

export let nightPerson = false; export let skilled = false;	
export let smallFrame = false; export let techWizard = false;
export let techWizardCheck = false;

//Only Human
export let sexAppeal = false;	

//Mutants
let hamFisted = false; let hamFistedCheck = false; let vatSkin = false;

//Dog's - Deathclaw's
let domesticated = false; let rabid = false;

//Ghouls
let glowingOne = false; let fearTheReaper = false;

export function traitPageUpdate(){
    if(traitPage == 1){
        __trait1.label.textContent = "Bruiser";
        __trait2.label.textContent = "Fast Shot";
        __trait3.label.textContent = "Finesse";
        __trait4.label.textContent = "Heavy Handed";
        __trait5.label.textContent = "Jinxed";
        __trait6.label.textContent = "Kamikaze";
        __trait7.label.textContent = "One Hander";
        __trait8.label.textContent = "Hot Blooded";
    }
    else if(traitPage == 2){
        __trait1.label.textContent = "Built To Destroy";
        __trait2.label.textContent = "Trigger Discipline";
        __trait3.label.textContent = "Chem Reliant";
        __trait4.label.textContent = "Chem Resistant";
        __trait5.label.textContent = "Fast Metabolism";
        __trait6.label.textContent = "Gifted";
        __trait7.label.textContent = "Good Natured";
        __trait8.label.textContent = "Night Person";
    }
    else if(traitPage == 3){
        __trait1.label.textContent = "Skilled";
        __trait2.label.textContent = "Small Frame";
        __trait3.label.textContent = "Tech Wizard";
        __trait4.label.textContent = "Sex Appeal";
        __trait5.label.textContent = " ";
        __trait6.label.textContent = " ";
        __trait7.label.textContent = " ";
        __trait8.label.textContent = " ";
    }
}

export function traitPageHandler(e, button1, button2){
    if(e.target === button1){
        if(traitPage < 3)
            traitPage += 1;
    }
    if(e.target === button2){
        if(traitPage > 1)
            traitPage -= 1;
    }
    __traitPageValue.textContent = `${traitPage}`;
    traitPageUpdate();
}

export function traitSelect(e){
    if(e.target === __trait1){
        switch(traitPage){
            case 1:
                if(!Traits.bruiser)Traits.bruiser = true;
                else if(Traits.bruiser)Traits.bruiser = false;
                break;
            case 2:
                if(!Traits.builtToDestroy)Traits.builtToDestroy = true;
                else if(Traits.builtToDestroy)Traits.builtToDestroy = false;
                break;
            case 3:
                Traits.skilled = true;
                break;
        }
    }
    if(e.target === __trait2){
        switch(traitPage){
            case 1:
                Traits.fastShot = true;
                break;
            case 2:
                Traits.triggerDiscipline = true;
                break;
            case 3:
                Traits.smallFrame = true;
                break;
        }
    }
}

export function bruiserEffect(){
    Stat.AP -= 2;
    Sp.SPECIAL.S += 2;
    if(Sp.SPECIAL.S > 10){Sp.specialPoints += (Sp.SPECIAL.S - 10); Sp.SPECIAL.S = 10;}
}
