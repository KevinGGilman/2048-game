import React from 'react'

const SelectSizePage = (props) => (
  <div id='page'>
    <h1>Select the size of the game</h1>
    <div className='container inline'>
      {[...Array(19)].map((v, index) => <SizeItem key={index} {...props} index={index} />)}

    </div>
  </div>
)

const SizeItem = (props) => (
  <span
    className='size-item button'
    onClick={() => props.global.setState({ page: 'game', tableSize: props.index + 2 })}
  >
    {`${props.index + 2} x ${props.index + 2}`}
  </span>
)

export default SelectSizePage
