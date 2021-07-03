function numberOfBombsAround(column, line) {
    let numberOfBombsAround = 0;

    let topLeft  = [column--, line--]
    let top      = [column, line--]
    let topRight = [column++, line--]

    let left     = [column--, line]
    let right    = [column++, line]

    let botLeft  = [column--, line++]
    let bot      = [column, line++]
    let botRight = [column++, line++]

    
}

