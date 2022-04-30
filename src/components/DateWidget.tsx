import convertMonth from '../utils/convertMonth'

interface Props {
  timestamp: number
}

function DateWidget({ timestamp }: Props): JSX.Element {
  const date = new Date(timestamp)
  const month = convertMonth(date.getMonth())
  const day = date.getDate()

  return (
    <h2 className="subHeader">{month} {day}</h2>
  )
}

export default DateWidget
