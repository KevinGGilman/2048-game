import React from 'react'

export default function Nav (props) {
  return (
    <nav>
      <span onClick={() => this.setState({ table: this.setInitialTable() })}>Recommencer</span>
      <span onClick={() => this.props.global.setState({ page: 'selectSize' })}>Changer le format</span>
      <span onClick={() => this.props.global.setState({ page: 'instructions' })}>Instructions</span>
    </nav>
  )
}
