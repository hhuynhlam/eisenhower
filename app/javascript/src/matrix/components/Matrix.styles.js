import styled from 'styled-components'
import theme from 'config/theme'

export const Cell = styled.div`
  height: 100%;
  padding: 0;

  &:nth-child(2) {
    border-left: 2px dashed #434343;
  }
`
export const Row = styled.div`
  height: 50%;

  &:last-child {
    border-bottom: 2px solid #434343;
  }

  @media (max-width: ${theme.breakpoints.sm}px) {
    display: block;
    height: auto;
    max-height: 100%;
    min-height: 300px;
  }
`
