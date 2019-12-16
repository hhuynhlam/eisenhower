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

const COLUMN_SUBTITLE = {
  [COLUMN_TYPE.DELEGATE]: 'Urgent, Not Important',
  [COLUMN_TYPE.DO]: 'Urgent, Important',
  [COLUMN_TYPE.SCHEDULE]: 'Not Urgent, Important',
  [COLUMN_TYPE.WONTDO]: 'Not Urgent, Not Important',
}

export default {
  COLUMN_SUBTITLE,
  COLUMN_TITLE,
  COLUMN_TYPE,
}
