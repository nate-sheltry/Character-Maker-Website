
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
}

export function calculatePerceptionSkills(Per, Int, Agi){
    lockpick.value = (10 + (Per + Agi));
    medicine.value = (5 + Per + Int);
    traps.value = (10 + Per + Agi);
}

export function calculateEnduranceSkills(End, Int){
    survival.value = (2 * (End + Int));
}

export function calculateCharismaSkills(Cha, Lck){
    barter.value = (4 * Cha);
    gambling.value = (10 + (2 * Cha) + (2 * Lck));
    speech.value = (5 * Cha);
}

export function calculateIntelligenceSkills(Per, End, Int){
    medicine.value = (5 + Per + Int);
    repair.value = (3 * Int);
    science.value = (4 * Int);
    survival.value = (2 * (End + Int));
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
}

export function calculateLuckSkills(Cha, Lck){
    gambling.value = (10 + (2 * Cha) + (2 * Lck));
}