let arrField = [];
let usedFields = [];
let globalLines = 0;
let globalColumns = 0;
let selectedBlock;

function startGame() {
    const mainBox = document.querySelector('.mainBox');

    mainBox.innerHTML = '';
    usedFields = [];
    arrField = [];

    let inputLines = document.querySelector('#lines').value;
    let inputColumns = document.querySelector('#columns').value;
    if (inputLines > 30 || inputLines < 5 || inputColumns > 30 || inputColumns < 5) {
        mainBox.innerHTML = '<span>Defina as dimensões do campo para iniciar (Min.: 5; Max.:30)</span>';
        alert('Defina um campo com dimensões válidas. Deve ser entre 5 e 30.');
        return;
    }

    for (let createdColumns = 0; createdColumns < inputColumns; createdColumns += 1) {
        let column = document.createElement('div');
    
        column.setAttribute('class', 'column');
        column.setAttribute('id', `${createdColumns}`)

        for (let createdLines = 0; createdLines < inputLines; createdLines += 1) {
            // System
            const objectBlock = {};
            objectBlock.coord = [createdColumns + 1, createdLines + 1];
            
            if (Math.random() * 100 < 20) {
                objectBlock.isABomb = true;
            } else {
                objectBlock.isABomb = false;
            }
    
            arrField.push(objectBlock);
    
            // Visual
            const lineBtn = document.createElement('button');
    
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
    usedFields.map(element => element === `${column}-${line}` ? isThisAUsedField = true : isThisAUsedField = false);

    if (!isThisAUsedField) {
        arrField.map(element => element.coord.toString() === [column, line].toString() ? selectedBlock = element : undefined);
        const inScopeSelectedBlock = document.getElementById(`${selectedBlock.coord[0]}-${selectedBlock.coord[1]}`)

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
    const inScopeSelectedBlock = document.getElementById(`${selectedBlock.coord[0]}-${selectedBlock.coord[1]}`);
    const isInside = column > 0 && line > 0 && column <= globalColumns && line <= globalLines;

    const responseHaveBombsAround = haveBombsAround(column, line);
    const quantityOfBombs = responseHaveBombsAround.numberOfBombs;

    if (isInside) {
        usedFields.push(`${column}-${line}`);
        quantityOfBombs ? inScopeSelectedBlock.innerHTML = quantityOfBombs : inScopeSelectedBlock.innerHTML = '';
        inScopeSelectedBlock.classList.add(`numOfBombs${quantityOfBombs}`);
        inScopeSelectedBlock.style.backgroundColor = '#a9a9a9';
    
        if (!responseHaveBombsAround.numberOfBombs) {
            noBombs(responseHaveBombsAround.fieldsAround);
        }
    }
    return quantityOfBombs;
}

function haveBombsAround(column, line) {
    let numberOfBombs = 0;
    const fieldsAround = {
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
        arrField.map(element => {
            if (element.coord.toString() === fieldsAround[key].toString() && element.isABomb) {
                numberOfBombs += 1;
            }
        })
    }
    return { numberOfBombs, fieldsAround };
}

function noBombs(receivedFields) {
    for (const key in receivedFields) {
        revealBlock(receivedFields[key][0], receivedFields[key][1]);
    }
}
