let arrField = [];
let usedFields = [];
let globalLines = 0;
let globalColumns = 0;
let selectedBlock;

function startGame() {
    let mainBox = document.querySelector('.mainBox');

    mainBox.innerHTML = '';
    usedFields = [];

    let inputLines = document.querySelector('#lines').value;
    let inputColumns = document.querySelector('#columns').value;

    for (let createdColumns = 0; createdColumns < inputColumns; createdColumns++) {
        let column = document.createElement('div');
    
        column.setAttribute('class', 'column');
        column.setAttribute('id', `${createdColumns}`)

        for (let createdLines = 0; createdLines < inputLines; createdLines++) {
            // System
            let objectBlock = {};
            objectBlock.coord = [createdColumns + 1, createdLines + 1];
            
            if (Math.random() * 100 < 20) {
                objectBlock.isABomb = true;
            } else {
                objectBlock.isABomb = false;
            }
    
            arrField.push(objectBlock);
    
            // Visual
            let lineBtn = document.createElement('button');
    
            lineBtn.setAttribute('class', 'block');
            lineBtn.setAttribute('id', `${createdColumns + 1}-${createdLines + 1}`);
            lineBtn.setAttribute('onclick', `revealBlock(${createdColumns + 1}, ${createdLines + 1})`)
    
            column.appendChild(lineBtn)
    
            globalLines = createdLines + 1;
        }
        mainBox.appendChild(column);
    
        globalColumns = createdColumns + 1;
    }
}

function revealBlock(column, line) {
    let isThisAUsedField = false;

    for (let index = 0; index < usedFields.length; index++) {
        const element = usedFields[index];
        if (element === `${column}-${line}`) {
            isThisAUsedField = true;
        }
    }

    if (!isThisAUsedField) {
        for (let index = 0; index < arrField.length; index++) {
            const element = arrField[index];
            const elCoord = element.coord;
            
            if (elCoord.toString() == [column, line].toString()) {
                selectedBlock = element;
            }
        }
        
        let inScopeSelectedBlock = document.getElementById(`${selectedBlock.coord[0]}-${selectedBlock.coord[1]}`)
        if (selectedBlock.isABomb) {
            console.error('IS A BOMB!')
            inScopeSelectedBlock.innerHTML = '*';
            inScopeSelectedBlock.style.backgroundColor = 'red';
            usedFields.push(`${column}-${line}`);
        } else {
            console.log(selectedBlock)
            numberOfBombsAround(column, line)
        }
    }
}

function numberOfBombsAround(column, line) {
    let inScopeSelectedBlock = document.getElementById(`${selectedBlock.coord[0]}-${selectedBlock.coord[1]}`);
    let isInside = column > 0 && line > 0 && column <= globalColumns && line <= globalLines;

    let responseHaveBombsAround = haveBombsAround(column, line);
    let quantityOfBombs = responseHaveBombsAround.numberOfBombs;

    if (isInside) {
        usedFields.push(`${column}-${line}`);
        inScopeSelectedBlock.innerHTML = quantityOfBombs;
        inScopeSelectedBlock.style.backgroundColor = '#a9a9a9';
    
        if (!responseHaveBombsAround.numberOfBombs) {
            noBombs(responseHaveBombsAround.fieldsAround);
        }
    }

    return quantityOfBombs;
}

function haveBombsAround(column, line) {
    let numberOfBombs = 0;
    let fieldsAround = {
        topLeft  : [column - 1, line - 1],
        top      : [column,     line - 1],
        topRight : [column + 1, line - 1],
    
        left     : [column - 1, line],
        right    : [column + 1, line],
    
        botLeft  : [column - 1, line + 1],
        bot      : [column,     line + 1],
        botRight : [column + 1, line + 1]
    }

    for (const key in fieldsAround) {
        for (let index = 0; index < arrField.length; index++) {
            const element = arrField[index];
            if (element.coord.toString() === fieldsAround[key].toString() && element.isABomb) {
                numberOfBombs += 1;
            }
        }
    }

    if (numberOfBombs > 0) {
        return {
            numberOfBombs,
            fieldsAround
        };
    } else if (numberOfBombs === 0) {
        return {
            numberOfBombs,
            fieldsAround
        };
    }
}

function noBombs(receivedFields) {
    for (const key in receivedFields) {
        revealBlock(receivedFields[key][0], receivedFields[key][1]);
    }
}
