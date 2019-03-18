import React from 'react'

const InstructionsPage = (props) => (
  <div id='page'>
    <h1>Instructions</h1>
    <div className='container column'>
      <p>Le but du jeu est de réussir à jumeler les cases pour arriver au final à obtenir une case de 2048 points (ou plus)</p>
      <p>Seules les cases contenant le même numéro peuvent fusionner</p>
      <p>Pour y arriver, vous devez utiliser les flèches de votre clavier</p>
      <span
        className='button'
        onClick={() => props.global.setState({ page: 'selectSize' })}
      >
      Commencer
      </span>
    </div>
  </div>
)

export default InstructionsPage
