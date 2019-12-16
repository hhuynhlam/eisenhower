import React from 'react'
import styled from 'styled-components'
import theme from 'config/theme'

function Header() {
  return (
    <Header.Container className="row">
      <Header.Left className="col-xs-6 col-md-8">
        Eisenhower
      </Header.Left>

      <Header.Right className="col-xs-6 col-md-4">
        Logout
      </Header.Right>
    </Header.Container>
  )
}

Header.Container = styled.header`
  align-items: center;
  background-color: #101010;
  height: 3rem;
  justify-content: center;
  padding: 1rem 32px;
  margin: 0;
`
Header.Left = styled.div`
  color: ${theme.palette.neutralPrimary};
  font-size: 0.9rem;
`
Header.Right = styled.div`
  color: ${theme.palette.neutralPrimary};
  font-size: 0.7rem;
  text-align: right;
`

export default Header
