const targetShotCSV = "./csv-files/target-shot.csv"
const critTableCSV = "./csv-files/crit-table.csv"
const cripTableCSV = './csv-files/cripple-effects-height.csv'
const radiationTableCSV = './csv-files/radiation-levels.csv'
const critEffectsJSON = "./crit-effects.json"
const firearmsAmmoJSON = '../db_files/firearms_ammunition.json'
const armorJSON = '../db_files/armor.json'
const removeQuote = /[\"]/g;
const colspanCharacter = /=$/
const HOST = 'https://nate-sheltry.github.io/Fallout-Character-Maker-Website';

const clipBoardStack = [];
const keyIsDown = {Control: false};

const navigatorAPI = !!navigator.clipboard;

document.addEventListener('keydown', function(event) {
    if(event.key == 'Control') keyIsDown[event.key] = true;
});

document.addEventListener('keyup', function(event) {
    if(event.key == 'Control') keyIsDown[event.key] = false;
});

function moveDataToClipboard(dataCopy){
    if(navigatorAPI){
        if(keyIsDown.Control) {
            const clipboardData = clipBoardStack.join('\n');
            navigator.clipboard.writeText(clipboardData + dataCopy)
            clipBoardStack.push(dataCopy);
        }
        else {
            navigator.clipboard.writeText(dataCopy)
            clipBoardStack.length = 0;
        }
    }
    else{
        let copyElem = document.createElement('textarea')
        copyElem.value = dataCopy; copyElem.style.maxHeight = '0px';
        document.body.append(copyElem)
        copyElem.select();
        document.execCommand("copy");
        copyElem.remove();
    }
}

function copyAmmoData(e, name){
    const ulElem = e.target.parentElement;
    const liArray = ulElem.querySelectorAll('li span');
            
    const dataCopy = `\`\`\`AMMO: ${name}\n   Cost: ${liArray[0].textContent}\n\n   AC: ${liArray[1].textContent}\n   DR: ${liArray[3].textContent}\n   Dmg: ${liArray[4].textContent}\n   Vol: ${liArray[2].textContent}\n\`\`\``
    moveDataToClipboard(dataCopy);
    
}
function copyArmorData(e, name){
    const filter = /(<\/?span>)?(<span class\="damage-info">)?/g
    const parElem = e.target.parentElement;
    const liElems = parElem.querySelectorAll('li')
    const liInfo = []
    for(let i = 0; i < liElems.length; i++){
        if(liElems[i].innerHTML.includes('DT | DR')) liInfo.push('\n   '+ liElems[i].innerHTML.replace(filter,''))
        else if(liElems[i].innerHTML.includes('Fire:')) liInfo.push(liElems[i].innerHTML.replace('Fire:', 'Fire:  ').replace(filter,''))
        else if(liElems[i].innerHTML.includes('Laser:')) liInfo.push(liElems[i].innerHTML.replace('Laser:', 'Laser: ').replace(filter,''))
        else if(liElems[i].innerHTML.includes('Explo:')) liInfo.push(liElems[i].innerHTML.replace('Explo:', 'Explo: ').replace(filter,''))
        else liInfo.push(liElems[i].innerHTML.replace(filter,''))
    }
    const bonusElem = parElem.querySelector('p:last-of-type').innerHTML.replace(filter, '');
            
    const dataCopy = `\`\`\`ARMOR: ${name}\n   ${liInfo.join('\n   ')}\n   ${bonusElem}\n\`\`\`
    `
    moveDataToClipboard(dataCopy);
}

// function sortDict(data){
//     const sortedKeys = Object.keys(data).sort();
//     const objects = sortedKeys.map(key => (data[key]));
//     const newDict = {};
//     for(let i = 0; i < sortedKeys.length; i++){
//         newDict[sortedKeys[i]] = objects[i]
//     }
//     console.log('stringify')
//     console.log(JSON.stringify(newDict))
//     return newDict;
// }

async function getData(file){
    return await fetch(file).then(res => (res.json()))
    // .then(data => {console.log(data); return sortDict(data)})
}

async function makeTable(file, data = null, headerRow = 2, headerColumn = 1){
    const csvData = await getCSV(file)
    const lines = csvData.split('\n');
    const html = ["<table>\n"];
    const dataKeys = data ? Object.keys(data) : null;

    for(let i = 0; i < lines.length; i++){
        const line = lines[i].replace(removeQuote, "")
        const columns = line.split('`');
        if(i < headerRow){
            html.push("  <tr>\n");
            if(columns.length == 2 && columns[1][columns[1].length-2] == "="){
                html.push(`    <th colspan="${columns[1].replace("=",  "")}">` + columns[0] + "</th>\n");
            }
            else {
                columns.forEach((column)=>{
                    html.push("    <th>" + column + "</th>\n");
                });
            }
            html.push("  </tr>\n");
        }
        else if(columns.length == 2 && columns[0][0] == "-"){
            html.push(`    <th colspan="${columns[1].replace("=",  "")}">` + "<hr>" + "</th>\n");
        }
        else if(data != null){
            let strArr = [];
            for(x = 0; x < columns.length; x++){
                const column = columns[x]
                if(x < headerColumn) strArr.push("    <th>" + column + "</th>\n");
                else strArr.push(`    <td class="chart-index" data-tooltip="${data[dataKeys[x-headerColumn]][i-headerRow]}">` + column + "</td>\n");
            };
            html.push("  <tr>\n" + strArr.join('') +"  </tr>\n");
        }
        else{
            let strArr = [];
            for(x = 0; x < columns.length; x++){
                const column = columns[x]
                if(x < headerColumn) strArr.push("    <th>" + column + "</th>\n");
                else strArr.push(`    <td class="chart-index">` + column + "</td>\n");
            };
            html.push("  <tr>\n" + strArr.join('') +"  </tr>\n");
        }
    }
    html.push("</table>");
    return html.join('');
}

async function getCSV(file){
    let data = await fetch(file).then(response => response.text())
    return data;
}

async function prepareTable(file, CLASS, data, hidden){
    let html = await makeTable(file, data)
    let container = document.createElement('div');
    container.classList.add(CLASS)
    container.innerHTML = html;
    container.hidden = hidden;
    return container;
}

function removeTooltips(){
    let elem = document.querySelectorAll('.tooltip');
    if(elem.length < 1){
        return
    }
    setTimeout(()=>{
        if(elem[0].matches(':hover')){
            return;
        }
        else {
            elem.forEach(symbol => {symbol.style.animation = "fadeOut .1s ease";});
            setTimeout(()=>{
                elem.forEach(symbol => {symbol.remove()});
            }, 100);
        }
    }, 50)
}

function makeAmmo(data){
    const validValues = new Set(['ap', 'fmj', 'hn', 'jhp', '(emp)', 'emp', 'ec', '','lr']);
    let object = Object.keys(data).map(ammo =>{
        const currentAmmo = data[ammo];
        const title = ammo.replace(/[_]/g, '.').split('-').map(
            part => {
                if(validValues.has(part)) return part.toUpperCase();
                if(part[0] == '(') part = part[0] + part[1].toUpperCase() + part.slice(2);
                else part = part[0].toUpperCase() + part.slice(1);
                return part;
            }
        ).join(' ').trim();
        const categories = currentAmmo.category.join(',');

        return `<div class="ammo" data-category="${categories}">
            <p class="title">${title}</p>
            <img src="${HOST}/no_image.png" srcset="${HOST}/db_files/resources/ammunition/${currentAmmo.img}" alt="ammunition image" loading="lazy">
            <ul>
                <li>Cost<span>${currentAmmo.value}</span></li>
                <button class="copy-button">Copy Data</button>
                <hr>
                <li>AC<span>${currentAmmo.ac}</span></li>
                <li>Vol.<span>${currentAmmo.vol}</span></li>
                <li>DR<span>${currentAmmo.dr}</span></li>
                <li>Dmg.<span>${currentAmmo.dmg}</span></li>
            </ul>
        </div>`
    })
    return object.join('');
}

function makeArmor(data){
    const validValues = new Set(['mk', 'ii', 'i', 'iii']);
    let object = Object.keys(data).map(armor =>{
        const currentArmor = data[armor];
        const title = armor.split('-').map(
            part => {
                if(validValues.has(part)) return part.toUpperCase();
                if(part[0] == '(') part = part[0] + part[1].toUpperCase() + part.slice(2);
                else part = part[0].toUpperCase() + part.slice(1);
                return part;
            }
        ).join(' ').trim();
        //const categories = currentArmor.category.join(',');

        return `<div class="armor">
        <p class="title">${title}</p>
        <img src="${HOST}/no_image.png">
        <button class="copy-button">Copy Data</button>
        <ul>
            <li>Value: <span>${currentArmor.value.toLocaleString()}</span></li>
            <li>AC: <span>${currentArmor.ac}</span></li>
            <li>Elec. Res: <span>${currentArmor.elecRes}</span></li>
            <li>Pois. Res: <span>${currentArmor.poisRes}</span></li>
            <li>Rad. Res: <span>${currentArmor.radRes}</span></li>
            <li>Weight: <span>${currentArmor.weight}</span></li>
        </ul>
        <ul>
            <li>DT | DR</li>
            <li>Normal: <span class="damage-info"><span>${currentArmor.dt.normal}</span>|<span>${currentArmor.dr.normal}</span></span></li>
            <li>Fire: <span class="damage-info"><span>${currentArmor.dt.fire}</span>|<span>${currentArmor.dr.fire}</span></span></li>
            <li>Plasma: <span class="damage-info"><span>${currentArmor.dt.plasma}</span>|<span>${currentArmor.dr.plasma}</span></span></li>
            <li>Laser: <span class="damage-info"><span>${currentArmor.dt.laser}</span>|<span>${currentArmor.dr.laser}</span></span></li>
            <li>Explo: <span class="damage-info"><span>${currentArmor.dt.explosion}</span>|<span>${currentArmor.dr.explosion}</span></span></li>
        </ul>
        <p>Other Bonuses: <span>${currentArmor.otherBonuses}</span></p>
    </div>`
    })
    return object.join('');
}

function makeIndex(className){
    let nodes = document.getElementsByClassName(className)
    const index = []
    for(let i = 0; i < nodes.length; i++){
        const item = nodes[i];
        const categories = item.getAttribute('data-category');
        const name = item.querySelector('.title').textContent;
        item.querySelector('.copy-button').addEventListener('click', (e)=>{
            switch(className){
                case 'ammo':
                    copyAmmoData(e, name);
                    break;
                case 'armor':
                    copyArmorData(e, name);
                    break;
            }
        })
        index.push({name: name.toLowerCase(), category: categories, object: item});
    }
    return index;
}

function searchAmmo(ammoIndex){

}

async function main(){
    const data = await getData(critEffectsJSON)
    let hiddenState = Boolean();
    if(window.innerWidth > 720) hiddenState = true;
    else hiddenState = false;

    const ammoData = await getData(firearmsAmmoJSON);
    let ammoElems = makeAmmo(ammoData);
    let ammunitionContainer = document.getElementById('ammunition_container').children[1]
    ammunitionContainer.innerHTML = ammoElems;
    const ammoIndex = makeIndex('ammo');

    const armorData = await getData(armorJSON);
    let armorElems = makeArmor(armorData);
    let armorContainer = document.getElementById('armor_container').children[1]
    armorContainer.innerHTML = armorElems;
    const armorIndex = makeIndex('armor');



    let targetShotTable = await prepareTable(targetShotCSV, 'targetshot-table', null, hiddenState)
    let crippleTable = await prepareTable(cripTableCSV, 'cripple-table', null, hiddenState)
    let critTable = await prepareTable(critTableCSV, 'crit-table', data, hiddenState)
    let radiationTable = await prepareTable(radiationTableCSV, 'radiation-table', null, hiddenState)

    let right_bar = document.querySelector('#right_bar div');
    right_bar.append(targetShotTable)
    right_bar.append(crippleTable)
    right_bar.append(critTable)
    right_bar.append(radiationTable)


    let dataColumns = document.querySelectorAll('td')
    dataColumns.forEach(td => {
        if(td.getAttribute('data-tooltip') == null) return
        td.addEventListener('click', (e)=>{
            let parElem = td.parentElement.parentElement;
            let tooltip = document.createElement('div');
            tooltip.classList.add('tooltip');
            tooltip.innerHTML = e.target.getAttribute('data-tooltip');

            // if(e.clientX > parElem.clientWidth/2+40) tooltip.style.right = `${parElem.clientWidth + 25 - e.clientX}px`;
            // else tooltip.style.left = `${e.clientX + 10}px`;
            // tooltip.style.bottom = `${parElem.clientHeight - e.clientY/2}px`;

            document.querySelector('main').appendChild(tooltip);

            let targetCoord = e.target.getBoundingClientRect()

            tooltip.style.top = targetCoord.bottom + window.scrollY -5 + 'px';
            if(targetCoord.left > parElem.clientWidth/2) tooltip.style.left = targetCoord.right + window.scrollX - tooltip.clientWidth + 10 + 'px';
            else tooltip.style.left = targetCoord.left + window.scrollX + 'px';
            
            tooltip.style.zIndex = 10;

            tooltip.style.background = getComputedStyle(td).backgroundColor.replace('rgb', 'rgba').replace(')',', .95)');
            tooltip.addEventListener('pointerleave', (e)=>{
                e.target.style.animation = "fadeOut .1s ease";
                setTimeout(()=>{
                    e.target.remove();
                }, 100);
            })
        })
        td.addEventListener('pointerleave', (e)=>{
            removeTooltips();
        })
    })

    let expButtons = document.querySelectorAll('.expand-button');
    expButtons.forEach(button => {
        button.addEventListener('pointerdown', (e)=>{    
            const parElem = e.target.parentElement;
            let elements = Array.from(parElem.children[1].children);
            let timer = 0;
            if(elements[0].hidden) {parElem.style.width = 'min(40vw, 29em)';}
            else if(!elements[0].hidden) { parElem.style.width = '20px'; timer = 700}
            setTimeout(()=>{
            elements.forEach(index => {index.hidden = !index.hidden;})}, timer);
                
        })
    })
    document.querySelector('#ammunition_container .top-middle-elem input').addEventListener('input', (e)=>{
        let search = e.target.value.toLowerCase();
        for(let i = 0; i < ammoIndex.length; i++){
            if(ammoIndex[i].name.includes(search) || ammoIndex[i].category.includes(search)){
                ammoIndex[i].object.classList.toggle('hide', false)
            }
            else ammoIndex[i].object.classList.toggle('hide', true);
        }
    })

    document.querySelector('#armor_container .top-middle-elem input').addEventListener('input', (e)=>{
        let search = e.target.value.toLowerCase();
        for(let i = 0; i < armorIndex.length; i++){
            if(armorIndex[i].name.includes(search)){
                armorIndex[i].object.classList.toggle('hide', false)
            }
            else armorIndex[i].object.classList.toggle('hide', true);
        }
    })
    
    document.querySelectorAll('#ammunition_container .top-middle-elem .buttons').forEach(button =>{
        button.addEventListener('pointerdown', (e)=>{
            let value = e.target.textContent;
            let input = e.target.parentElement.parentElement.children[1];
            if(input.value != value) input.value = value;
            else if(input.value == value) input.value = '';
            let search = value.toLowerCase();
            for(let i = 0; i < ammoIndex.length; i++){
                if(ammoIndex[i].name.includes(search) || ammoIndex[i].category.includes(search)){
                    ammoIndex[i].object.classList.toggle('hide', false)
                }
                else ammoIndex[i].object.classList.toggle('hide', true);
            }
        })
    });
}

async function test(loops = [10], func, ...args){
    for(let i = 0; i < loops.length; i++){
        const start = performance.now();
        for(let x = 0; x < loops[i]; x++){
            await func(...args);
        }
        const end = performance.now();
        const result = end - start;
        console.log(`Test ${loops[i]}: Result - ${result} milliseconds`)
    }
}

function runTest(){
    test([1], main)
}

runTest();