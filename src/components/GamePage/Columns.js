import React from 'react'
import Rows from './Rows'
const Columns = (props) => {
  return [...Array(props.global.tableSize)].map((v, index) => (
    <div className='row' key={index}>
      <Rows {...props} column={props.table[index]} />
    </div>
  ))
}
export default Columns
