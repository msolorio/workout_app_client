import convertMonth from '../utils/convertMonth'

interface Props {
  timestamp: number
}

function DateWidget({ timestamp }: Props) {
  const date = new Date(timestamp)
  const month = convertMonth(date.getMonth())
  const day = date.getDate()

  return (
    <p>{month} {day}</p>
  )
}

export default DateWidget
