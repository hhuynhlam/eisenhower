import constants from '../constants'

const { COLUMN_TYPE } = constants

function getColumnTypeFilters(type) {
  const filters = {}

  switch (type) {
    case COLUMN_TYPE.DO:
      filters.important = true
      filters.urgent = true
      break
    case COLUMN_TYPE.SCHEDULE:
      filters.important = true
      filters.urgent = false
      break
    case COLUMN_TYPE.DELEGATE:
      filters.important = false
      filters.urgent = true
      break
    default:
      filters.important = false
      filters.urgent = false
  }

  return filters
}

export default getColumnTypeFilters
