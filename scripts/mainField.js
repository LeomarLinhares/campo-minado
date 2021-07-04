var arrField = [];
var usedFields = [];
var globalLines = 0;
var globalColumns = 0;
var selectedBlock;

function startGame() {
    let mainBox = document.querySelector('.mainBox');

    mainBox.innerHTML = '';

    let inputLines = document.querySelector('#lines').value;
    let inputColumns = document.querySelector('#columns').value;

    let createdLines = 1;
    let createdColumns = 1;

    do {
        let column = document.createElement('div');

        column.setAttribute('class', 'column');
        column.setAttribute('id', `${createdColumns}`)
        
        do {
            // System

            var objectBlock = {};
            objectBlock.coord = [createdColumns, createdLines];
            
            if (Math.random() * 100 < 20) {
                objectBlock.isABomb = true;
            } else {
                objectBlock.isABomb = false;
            }

            arrField.push(objectBlock);

            // Visual

            let lineBtn = document.createElement('button');

            lineBtn.setAttribute('class', 'block');
            lineBtn.setAttribute('id', `${createdColumns}-${createdLines}`);
            lineBtn.setAttribute('onclick', `revealBlock(${createdColumns}, ${createdLines})`)

            column.appendChild(lineBtn)
            createdLines++

            globalLines = createdLines;

        } while (inputLines >= createdLines)

        mainBox.appendChild(column);
        createdColumns++
        createdLines = 1;

        globalColumns = createdColumns;

    } while (inputColumns >= createdColumns);
}

function revealBlock(column, line) {
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

function numberOfBombsAround(column, line) {
    let isThisAUsedField = false;
    let numberOfBombsAround = 0;
    let inScopeSelectedBlock = document.getElementById(`${selectedBlock.coord[0]}-${selectedBlock.coord[1]}`);
    let isInside = column > 0 && line > 0 && column <= globalColumns && line <= globalLines;

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

    for (let index = 0; index < usedFields.length; index++) {
        const element = usedFields[index];
        if (element === `${column}-${line}`) {
            isThisAUsedField = true;
        }
    }

    if (!isThisAUsedField && isInside) {
        for (const key in fieldsAround) {
            for (let index = 0; index < arrField.length; index++) {
                const element = arrField[index];
                if (element.coord.toString() === fieldsAround[key].toString() && element.isABomb) {
                    numberOfBombsAround += 1;
                }
            }
        }

        usedFields.push(`${column}-${line}`);
    
        if (numberOfBombsAround === 0 ) {
            for (const key in fieldsAround) {
                inScopeSelectedBlock.innerHTML = numberOfBombsAround;
                inScopeSelectedBlock.style.backgroundColor = '#a9a9a9';
                noBombs(fieldsAround[key][0], fieldsAround[key][1], fieldsAround);
            }
        }

        inScopeSelectedBlock.innerHTML = numberOfBombsAround;
        inScopeSelectedBlock.style.backgroundColor = '#a9a9a9';
    }
}

function noBombs(column, line, receivedFields) {
    for (const key in receivedFields) {
        
        numberOfBombsAround(column, line);
    }
}
