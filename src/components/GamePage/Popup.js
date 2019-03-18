import React from 'react'

export default function Popup (props) {
  return (
    <div className='popup'>
      <div className='content'>
        <h3>{props.title}</h3>
        <p>{`Vous avez accumulé ${this.getScrore()} points`}</p>
        {props.isWin && <span onClick={() => this.setState({ isContinue: true })}>Continuer</span>}
        <span onClick={() => this.props.global.setState({ page: 'selectSize' })}>Changer le format</span>
        <span onClick={() => this.setState({ table: this.setInitialTable() })}>Recommencer</span>
      </div>
    </div>
  )
}
