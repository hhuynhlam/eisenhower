const COLUMN_TYPE = {
  DELEGATE: 'delegate',
  DO: 'do',
  SCHEDULE: 'schedule',
  WONTDO: 'wontdo',
}

const COLUMN_TITLE = {
  [COLUMN_TYPE.DELEGATE]: 'Delegate',
  [COLUMN_TYPE.DO]: 'Do',
  [COLUMN_TYPE.SCHEDULE]: 'Schedule',
  [COLUMN_TYPE.WONTDO]: 'Won\'t Do',
}

export default {
  COLUMN_TITLE,
  COLUMN_TYPE,
}
