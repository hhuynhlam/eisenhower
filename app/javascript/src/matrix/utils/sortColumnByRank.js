import { filter, map, pipe, sortBy } from 'lodash/fp'
import getColumnTypeFilters from './getColumnTypeFilters'

const _map = map.convert({ cap: false })

function sortColumnByRank(type, items) {
  const filters = getColumnTypeFilters(type)

  return pipe([
    _map((val, key) => ({ id: key, ...val })),
    filter(filters),
    sortBy('rank'),
  ])(items)
}

export default sortColumnByRank
