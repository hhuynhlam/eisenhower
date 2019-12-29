import constants from '../constants'
import ducks from '../ducks'

const { COLUMN_TITLE, COLUMN_TYPE } = constants

function getMenuActions(dispatch) {
  return (type, draggableId) => {
    function moveItem(droppableId) {
      return () => dispatch(ducks.moveItem(draggableId, {}, { droppableId }))
    }

    switch (type) {
      case COLUMN_TYPE.DO:
        return [
          {
            key: COLUMN_TYPE.SCHEDULE,
            onClick: moveItem(COLUMN_TYPE.SCHEDULE),
            text: COLUMN_TITLE[COLUMN_TYPE.SCHEDULE],
          },
          {
            key: COLUMN_TYPE.DELEGATE,
            onClick: moveItem(COLUMN_TYPE.DELEGATE),
            text: COLUMN_TITLE[COLUMN_TYPE.DELEGATE],
          },
          {
            key: COLUMN_TYPE.WONTDO,
            onClick: moveItem(COLUMN_TYPE.WONTDO),
            text: COLUMN_TITLE[COLUMN_TYPE.WONTDO],
          },
        ]
      case COLUMN_TYPE.SCHEDULE:
        return [
          {
            key: COLUMN_TYPE.DO,
            onClick: moveItem(COLUMN_TYPE.DO),
            text: COLUMN_TITLE[COLUMN_TYPE.DO],
          },
          {
            key: COLUMN_TYPE.DELEGATE,
            onClick: moveItem(COLUMN_TYPE.DELEGATE),
            text: COLUMN_TITLE[COLUMN_TYPE.DELEGATE],
          },
          {
            key: COLUMN_TYPE.WONTDO,
            onClick: moveItem(COLUMN_TYPE.WONTDO),
            text: COLUMN_TITLE[COLUMN_TYPE.WONTDO],
          },
        ]
      case COLUMN_TYPE.DELEGATE:
        return [
          {
            key: COLUMN_TYPE.DO,
            onClick: moveItem(COLUMN_TYPE.DO),
            text: COLUMN_TITLE[COLUMN_TYPE.DO],
          },
          {
            key: COLUMN_TYPE.SCHEDULE,
            onClick: moveItem(COLUMN_TYPE.SCHEDULE),
            text: COLUMN_TITLE[COLUMN_TYPE.SCHEDULE],
          },
          {
            key: COLUMN_TYPE.WONTDO,
            onClick: moveItem(COLUMN_TYPE.WONTDO),
            text: COLUMN_TITLE[COLUMN_TYPE.WONTDO],
          },
        ]
      default:
        return [
          {
            key: COLUMN_TYPE.DO,
            onClick: moveItem(COLUMN_TYPE.DO),
            text: COLUMN_TITLE[COLUMN_TYPE.DO],
          },
          {
            key: COLUMN_TYPE.SCHEDULE,
            onClick: moveItem(COLUMN_TYPE.SCHEDULE),
            text: COLUMN_TITLE[COLUMN_TYPE.SCHEDULE],
          },
          {
            key: COLUMN_TYPE.DELEGATE,
            onClick: moveItem(COLUMN_TYPE.DELEGATE),
            text: COLUMN_TITLE[COLUMN_TYPE.DELEGATE],
          },
        ]
    }
  }
}

export default getMenuActions
