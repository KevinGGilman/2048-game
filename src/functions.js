export function setInitialTable () {
    const getRandomPosition = () => Math.floor(Math.random() * this.props.global.tableSize)
    const line = [...Array(this.props.global.tableSize)].map(() => 0)
    const table = line.slice().map(() => line.slice())
    // it is possible that the table starts with only one item (it is the same in the reel game)
    table[getRandomPosition()][getRandomPosition()] = (Math.floor(Math.random() * 2) + 1) * 2
    table[getRandomPosition()][getRandomPosition()] = (Math.floor(Math.random() * 2) + 1) * 2
    return table
  }

  export function getMoveParams (key) {
    return {
      ArrowLeft: { isReverse: false, isVertical: false },
      ArrowRight: { isReverse: true, isVertical: false },
      ArrowUp: { isReverse: false, isVertical: true },
      ArrowDown: { isReverse: true, isVertical: true }
    }[key]
  }

  export async function  moveSquares ({ key }) {
    const { isReverse, isVertical } = this.getMoveParams(key)
    let newTable
    if (key === 'ArrowLeft') newTable = this.move(isReverse, isVertical)
    else if (key === 'ArrowRight') newTable = this.move(isReverse, isVertical)
    else if (key === 'ArrowUp') newTable = this.move(isReverse, isVertical)
    else if (key === 'ArrowDown') newTable = this.move(isReverse, isVertical)
    else return
    const nodes = await this.doAnimations(isReverse, isVertical)

    this.setState({ table: newTable })
  }

  // rotate table so that rows change to columns for easier manipulation
export function rotateTable (table) {
    const length = this.props.global.tableSize
    const line = [...Array(length)].map(() => 0)
    const newTable = line.slice().map(() => line.slice())
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length; j++) {
        newTable[i][j] = table[j][i]
      }
    }
    return newTable
  }
  // moving in any directions do the same algorythm, if necessary, we just :
  // initially, reverse the order of rows and/or rotate the table
  // and finally, again, we reverse the order of rows and/or rotate the table
export function move (isReverse, isVertical) {
    let table = this.state.table
    if (isVertical) table = this.rotateTable(table)
    let newTable = table.map((row) => {
      let rowNumbers = row.filter((num) => num !== 0)
      if (isReverse) rowNumbers = rowNumbers.reverse()
      const index = rowNumbers.findIndex((num, index) => num === rowNumbers[index + 1])
      if (index > -1) {
        rowNumbers[index] += rowNumbers[index + 1]
        rowNumbers.splice(index + 1, 1)
      }
      let newRow = row.map((num, index) => rowNumbers[index] || 0)
      if (isReverse) newRow = newRow.reverse()
      return newRow
    })
    if (isVertical) newTable = this.rotateTable(newTable)
    // if table has changed add an item
    if (JSON.stringify(newTable) !== JSON.stringify(this.state.table)) {
      newTable = this.addItemToTable(newTable)
    }
    return newTable
  }

export async function  doAnimations (isReverse, isVertical) {
    const animationList = []
    const length = this.props.global.tableSize
    const itemSize = this.tableRef.clientWidth / this.props.global.tableSize
    const table = isVertical ? this.rotateTable(this.state.table) : this.state.table

    table.forEach((row, rowIndex) => {
      row = isReverse ? row.reverse() : row
      for (let colIndex = 0; colIndex < length; colIndex++) {
        if (row[colIndex]) {
          let distCount = 0
          for (let i = colIndex - 1; i >= 0; i--) {
            if (row[i] !== 0) i = -1
            else {
              distCount++
              row[i] = row[i + 1]
              row[i + 1] = 0
            }
          }
          if (distCount) {
            let realCol = isReverse ? length - 1 - colIndex : colIndex
            const realRow = isVertical ? realCol : rowIndex
            realCol = isVertical ? rowIndex : realCol
            const node = this.tableRef.children[realRow].children[realCol].children[0]
            const dist = itemSize * distCount
            const translate = `translate${isVertical ? 'Y' : 'X'}(${isReverse ? '' : '-'}${dist}px)`
            node.style.transform = translate
            node.style.transition = '0.3s all ease-in-out'
            animationList.push(node)
          }
        }
      }
    })
    await new Promise((resolve) => setTimeout(() => resolve(), 300))
    return animationList.forEach((node) => {
      node.style.transform = ''
      node.style.transition = '0s'
    })
  }

  // if we can't move in any direction and there is no 0 in the table
  isGameOver () {
    const newTableList = [
      this.move(false, false),
      this.move(true, false),
      this.move(false, true),
      this.move(true, true)
    ]
    const isAllSame = newTableList.every((newTable) => (
      JSON.stringify(this.state.table) === JSON.stringify(newTable)
    ))
    return isAllSame && !this.getNumberList().includes(0)
  }

  // add an item to the table when the move changes the table
  addItemToTable (table) {
    const arrayOfEmptyPositions = []
    table.forEach((row, rowIndex) => {
      row.forEach((num, colIndex) => {
        if (num === 0) arrayOfEmptyPositions.push({ row: rowIndex, col: colIndex })
      })
    })
    if (!arrayOfEmptyPositions.length) {
      this.setState({ isGameOver: true })
    }
    const indexInserted = Math.floor(Math.random() * arrayOfEmptyPositions.length)
    const { row, col } = arrayOfEmptyPositions[indexInserted]
    table[row][col] = (Math.floor(Math.random() * 2) + 1) * 2
    return table
  }

  componentDidMount () {
    this.pageRef.focus() // handle keyboard event on first load
    this.setStyle()
  }

  componentDidUpdate () {
    this.setStyle()
  }

  setStyle () {
    this.tableRef.style.height = this.tableRef.clientWidth + 'px'
  }

  getNumberList () {
    let pointTable = JSON.stringify(this.state.table)
    return pointTable.split('[').join('').split(']').join('').split(',')
  }

  getScrore () {
    const numbers = this.getNumberList()
    return numbers.reduce((count, num) => {
      count += Number(num)
      return count
    }, 0)
  }