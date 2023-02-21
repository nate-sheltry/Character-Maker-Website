import * as Fr from './faserip_node.js'

let health = 0; let karma = 0;
let meleeDamage = 0; let movementSpeed = '0';

const __health = document.querySelector('[data-reference="Health"]').querySelector('.statistic-value');
const __karma = document.querySelector('[data-reference="Karma"]').querySelector('.statistic-value');
const __meleeDamage = document.querySelector('[data-reference="Melee Damage"]').querySelector('.statistic-value');
const __movementSpeed = document.querySelector('[data-reference="Movement Speed"]').querySelector('.statistic-value');

function calcMovementSpeed(){
    let speed = '';
    switch(Fr.FASERIP.E){
        case 0: case 1:
        case 2:
            speed = '1 Area';
            break;
        case 3: case 4: case 5:
        case 6:
            speed = '2 Areas';
            break;
        case 7: case 8: case 9:
        case 10:
            speed = '3 Areas';
            break;
    }
    return speed;
}

function calculate_statistics(){
    health = 
    Fr.rankNum[Fr.FASERIP.F] + Fr.rankNum[Fr.FASERIP.A] +
    Fr.rankNum[Fr.FASERIP.S] + Fr.rankNum[Fr.FASERIP.E];
    karma = 
    Fr.rankNum[Fr.FASERIP.R] + Fr.rankNum[Fr.FASERIP.I] +
    Fr.rankNum[Fr.FASERIP.P];
    meleeDamage = Fr.rankNum[Fr.FASERIP.S];
    movementSpeed = calcMovementSpeed()
}

export function displayStatistics(){
    calculate_statistics()
    __health.textContent = `${health.toString()}/${health.toString()}`;
    __karma.textContent = karma.toString();
    __meleeDamage.textContent = meleeDamage.toString();
    __movementSpeed.textContent = movementSpeed;
}