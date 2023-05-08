
//We are using skill-tag, because the button div class is "skill-tag-btn", and the img class is "skill-tagged"
//So using contains("skill-tag") will run regardless of which element is the source of the event.
//We want this because the img class skill-tagged is placed over the skill-tag-btn class img.
const tagButton = ["skill-tag-button", "skill-tagged"]; 

const __barterValue = document.querySelector("[data-reference=\"Barter\"]").querySelector(".skill-value");
const __bigGunsValue = document.querySelector("[data-reference=\"Big Guns\"]").querySelector(".skill-value");
const __energyWeaponsValue = document.querySelector("[data-reference=\"Energy Weapons\"]").querySelector(".skill-value");
const __gamblingValue = document.querySelector("[data-reference=\"Gambling\"]").querySelector(".skill-value");
const __lockpickValue = document.querySelector("[data-reference=\"Lockpick\"]").querySelector(".skill-value");
const __medicineValue = document.querySelector("[data-reference=\"Medicine\"]").querySelector(".skill-value");
const __meleeWeaponsValue = document.querySelector("[data-reference=\"Melee Weapons\"]").querySelector(".skill-value");
const __repairValue = document.querySelector("[data-reference=\"Repair\"]").querySelector(".skill-value");
const __scienceValue = document.querySelector("[data-reference=\"Science\"]").querySelector(".skill-value");
const __smallGunsValue = document.querySelector("[data-reference=\"Small Guns\"]").querySelector(".skill-value");
const __sneakValue = document.querySelector("[data-reference=\"Sneak\"]").querySelector(".skill-value");
const __speechValue = document.querySelector("[data-reference=\"Speech\"]").querySelector(".skill-value");
const __survivalValue = document.querySelector("[data-reference=\"Survival\"]").querySelector(".skill-value");
const __throwingValue = document.querySelector("[data-reference=\"Throwing\"]").querySelector(".skill-value");
const __trapsValue = document.querySelector("[data-reference=\"Traps\"]").querySelector(".skill-value");
const __unarmedValue = document.querySelector("[data-reference=\"Unarmed\"]").querySelector(".skill-value");

const tagBonus = 20;

let tagPoints = 3;


//Skills
export const barter = {value: 0, tagged: false};
export const bigGuns = {value: 0, tagged: false};
export const energyWeapons = {value: 0, tagged: false};
export const gambling = {value: 0, tagged: false};
export const lockpick = {value: 0, tagged: false};
export const medicine = {value: 0, tagged: false};
export const meleeWeapons = {value: 0, tagged: false};
export const repair = {value: 0, tagged: false};
export const science = {value: 0, tagged: false};
export const smallGuns = {value: 0, tagged: false};
export const sneak = {value: 0, tagged: false};
export const speech = {value: 0, tagged: false};
export const survival = {value: 0, tagged: false};
export const throwing = {value: 0, tagged: false};
export const traps = {value: 0, tagged: false};
export const unarmed = {value: 0, tagged: false};

const skills = [barter, bigGuns, energyWeapons, gambling, lockpick, medicine, meleeWeapons, repair, science,
smallGuns, sneak, speech, survival, throwing, traps, unarmed]

export function calculateAllSkills(Str, Per, End, Cha, Int, Agi, Lck){
    barter.value = (4 * Cha);
    bigGuns.value = (2 * Agi);
    energyWeapons.value = (2 * Agi);
    gambling.value = (10 + (2 * Cha) + (2 * Lck));
    lockpick.value = (10 + (Per + Agi));
    medicine.value = (5 + Per + Int);
    meleeWeapons.value = (20 + (2 *(Agi + Str)));
    repair.value = (3 * Int);
    science.value = (4 * Int);
    smallGuns.value = (5 + (4 * Agi));
    sneak.value = (5 + (3 * Agi));
    speech.value = (5 * Cha);
    survival.value = (2 * (End + Int));
    throwing.value = (4 * Agi);
    traps.value = (10 + Per + Agi);
    unarmed.value = (30 + (2 * (Agi + Str)));
}

export function calculateStrengthSkills(Str, Agi){
    meleeWeapons.value = (20 + (2 *(Agi + Str)));
    unarmed.value = (30 + (2 * (Agi + Str)));
    skillValues();
}

export function calculatePerceptionSkills(Per, Int, Agi){
    lockpick.value = (10 + (Per + Agi));
    medicine.value = (5 + Per + Int);
    traps.value = (10 + Per + Agi);
    skillValues();
}

export function calculateEnduranceSkills(End, Int){
    survival.value = (2 * (End + Int));
    skillValues();
}

export function calculateCharismaSkills(Cha, Lck){
    barter.value = (4 * Cha);
    gambling.value = (10 + (2 * Cha) + (2 * Lck));
    speech.value = (5 * Cha);
    skillValues();
}

export function calculateIntelligenceSkills(Per, End, Int){
    medicine.value = (5 + Per + Int);
    repair.value = (3 * Int);
    science.value = (4 * Int);
    survival.value = (2 * (End + Int));
    skillValues();
}

export function calculateAgilitySkills(Str, Per, Agi){
    bigGuns.value = (2 * Agi);
    energyWeapons.value = (2 * Agi);
    lockpick.value = (10 + (Per + Agi));
    meleeWeapons.value = (20 + (2 *(Agi + Str)));
    smallGuns.value = (5 + (4 * Agi));
    sneak.value = (5 + (3 * Agi));
    throwing.value = (4 * Agi);
    traps.value = (10 + Per + Agi);
    unarmed.value = (30 + (2 * (Agi + Str)));
    skillValues();
}

export function calculateLuckSkills(Cha, Lck){
    gambling.value = (10 + (2 * Cha) + (2 * Lck));
    skillValues();
}

//Handlers and their functions
export function skillValues() {

    __barterValue.textContent = skillValueTagCheck(barter);
    __bigGunsValue.textContent = skillValueTagCheck(bigGuns);
    __energyWeaponsValue.textContent = skillValueTagCheck(energyWeapons);
    __gamblingValue.textContent = skillValueTagCheck(gambling);
    __lockpickValue.textContent = skillValueTagCheck(lockpick);
    __medicineValue.textContent = skillValueTagCheck(medicine);
    __meleeWeaponsValue.textContent = skillValueTagCheck(meleeWeapons);
    __repairValue.textContent = skillValueTagCheck(repair);
    __scienceValue.textContent = skillValueTagCheck(science);
    __smallGunsValue.textContent = skillValueTagCheck(smallGuns);
    __sneakValue.textContent = skillValueTagCheck(sneak);
    __speechValue.textContent = skillValueTagCheck(speech);
    __survivalValue.textContent = skillValueTagCheck(survival);
    __throwingValue.textContent = skillValueTagCheck(throwing);
    __trapsValue.textContent = skillValueTagCheck(traps);
    __unarmedValue.textContent = skillValueTagCheck(unarmed);
}

export function skillValueTagCheck(skill) {
    if(skill.tagged == true)
        return ((skill.value + tagBonus).toString() + "%");
    else if(skill.tagged == false)
        return ((skill.value).toString() + "%");
}

export function hoverEffect(e, textBox, tittleBox, formulaBox, info, __skillWrapper) {
    if(e.target.classList.contains(tagButton[1])){
        return
    }
    let dataReference;
    if(e.target.parentElement.classList.contains("skill-hoverable"))
        dataReference = e.target.parentElement.dataset.reference
    else if(e.target.classList.contains("skill-hoverable"))
        dataReference = e.target.dataset.reference
    else
        return;
    textBox.style.marginTop = "0px";
    tittleBox.textContent = dataReference
    switch(dataReference){
        case "Barter":  textBox.textContent = info.barter.info; formulaBox.textContent = info.barter.formula; break;
        case "Big Guns": textBox.textContent = info.bigGuns.info; formulaBox.textContent = info.bigGuns.formula; break;
        case "Energy Weapons": textBox.textContent = info.energyWeapons.info; formulaBox.textContent = info.energyWeapons.formula; break;
        case "Gambling": textBox.textContent = info.gambling.info; formulaBox.textContent = info.gambling.formula; break;
        case "Lockpick": textBox.textContent = info.lockpick.info; formulaBox.textContent = info.lockpick.formula; break;
        case "Medicine": textBox.textContent = info.medicine.info; formulaBox.textContent = info.medicine.formula; break;
        case "Melee Weapons": textBox.textContent = info.meleeWeapons.info; formulaBox.textContent = info.meleeWeapons.formula; break;
        case "Repair": textBox.textContent = info.repair.info; formulaBox.textContent = info.repair.formula; break;
        case "Science": textBox.textContent = info.science.info; formulaBox.textContent = info.science.formula; break;
        case "Small Guns": textBox.textContent = info.smallGuns.info; formulaBox.textContent = info.smallGuns.formula; break;
        case "Sneak": textBox.textContent = info.sneak.info; formulaBox.textContent = info.sneak.formula; break;
        case "Speech": textBox.textContent = info.speech.info; formulaBox.textContent = info.speech.formula; break;
        case "Survival": textBox.textContent = info.survival.info; formulaBox.textContent = info.survival.formula; break;
        case "Throwing": textBox.textContent = info.throwing.info; formulaBox.textContent = info.throwing.formula; break;
        case "Traps": textBox.textContent = info.traps.info; formulaBox.textContent = info.traps.formula; break;
        case "Unarmed": textBox.textContent = info.unarmed.info; formulaBox.textContent = info.unarmed.formula; break;
        default: console.log("I shouldn't have ran.")
    }
}


function tagSkill(object, skill){
    if(skill.tagged == false && tagPoints > 0){skill.tagged = true;
        tagPoints -= 1;
        object.style.backgroundImage = "url(\"../../images/tag_btn_down.png\")";
        object.firstChild.style.visibility = "visible";}
    else if(skill.tagged == true){skill.tagged = false;
        tagPoints += 1;
        object.style.backgroundImage = "url(\"../../images/tag_btn.png\")";
        object.firstChild.style.visibility = "hidden";}
}

export function handleSkillTag(e) {
    let __target;
    switch(e.target.className){
        case tagButton[0]:
            __target = e.target;
            break;
        case tagButton[1]:
            __target = e.target.parentElement;
            break;
        default:
            return;
    }
    switch(__target.parentElement.dataset.reference){
        case "Barter": tagSkill(__target, barter); break;
        case "Big Guns": tagSkill(__target, bigGuns); break;
        case "Energy Weapons": tagSkill(__target, energyWeapons); break;
        case "Gambling": tagSkill(__target, gambling); break;
        case "Lockpick": tagSkill(__target, lockpick); break;
        case "Medicine": tagSkill(__target, medicine); break;
        case "Melee Weapons": tagSkill(__target, meleeWeapons); break;
        case "Repair": tagSkill(__target, repair); break;
        case "Science": tagSkill(__target, science); break;
        case "Small Guns": tagSkill(__target, smallGuns); break;
        case "Sneak": tagSkill(__target, sneak); break;
        case "Speech": tagSkill(__target, speech); break;
        case "Survival": tagSkill(__target, survival); break;
        case "Throwing": tagSkill(__target, throwing); break;
        case "Traps": tagSkill(__target, traps); break;
        case "Unarmed": tagSkill(__target, unarmed); break;
    }
    skillValues();
}