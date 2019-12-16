import { TextField } from 'office-ui-fabric-react/lib/TextField'
import styled from 'styled-components'
import theme from 'config/theme'
import constants from '../constants'

const { COLUMN_TYPE } = constants

const COLOR_MAP = {
  [COLUMN_TYPE.DO]: '#FF3535',
  [COLUMN_TYPE.SCHEDULE]: '#35B0FF',
  [COLUMN_TYPE.DELEGATE]: '#FF7B35',
  [COLUMN_TYPE.WONTDO]: '#A2A2A2',
}

export const ColumnHeader = styled.div`
  align-items: flex-start;
  justify-content: center;
  background-color: ${({ type }) => (COLOR_MAP[type])};
  color: #FFFFFF;
  display: flex;
  font-weight: 500;
  flex-direction: column;
  height: 3rem;
  padding: 0 32px;
`
export const ColumnSubtitle = styled.div`
  font-size: 0.65rem;
  font-weight: 300;
`
export const ColumnContent = styled.div`
  height: calc(100% - 3rem - 32px);
  padding: 1rem 1rem 2rem 1rem;

  & .ms-Viewport {
    height: calc(100% - 3rem - 32px);
  }
  & .ms-DetailsList {
    height: 100%;
  }
`
export const ColumnInput = styled(TextField)`
  margin-bottom: 1rem;

  & label {
    padding-left: 0;
  }
`

export const TaskItem = styled.div`
  align-items: center;
  border-bottom: 1px solid ${theme.palette.grey};
  display: flex;
  font-size: 1rem;
  min-height: 38px;
  padding: 0.25rem 0;
`
