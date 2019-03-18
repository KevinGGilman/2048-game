import React from 'react'

const Rows = (props) => {
  return [...Array(props.global.tableSize)].map((v, index) => (
    <div className='square' key={index}>
      {!!props.column[index] &&
      <span className={`point p${props.column[index]}`}>
        {props.column[index]}
      </span>
      }
    </div>
  ))
}
export default Rows
