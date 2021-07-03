var arrField = [];
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

        } while (inputLines >= createdLines)

        mainBox.appendChild(column);
        createdColumns++
        createdLines = 1;

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
    
    if (selectedBlock.isABomb) {
        console.error('IS A BOMB!')
    } else {
        numberOfBombsAround(column, line)
    }
}

function numberOfBombsAround(column, line) {
    let numberOfBombsAround = 0;
    let fieldsAround = {
        topLeft  : [column--, line--],
        top      : [column, line--],
        topRight : [column++, line--],
    
        left     : [column--, line],
        right    : [column++, line],
    
        botLeft  : [column--, line++],
        bot      : [column, line++],
        botRight : [column++, line++]
    }
    
}
