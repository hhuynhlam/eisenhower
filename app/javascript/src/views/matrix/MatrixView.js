import React from 'react'
import styled from 'styled-components'
import { Header } from 'header'
import { Matrix } from 'matrix'

function MatrixView() {
  return (
    <React.Fragment>
      <Header />

      <MatrixView.Content>
        <Matrix />
      </MatrixView.Content>
    </React.Fragment>
  )
}

MatrixView.Content = styled.section`
  height: calc(100vh - 3rem);
  overflow-x: hidden;
  overflow-y: auto;
`

export default MatrixView
