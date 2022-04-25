import { ExerciseInstanceType } from '../../model/services/redux/features/exerciseInstance/exerciseInstancesSlice'
import ExerciseInstance from './ExerciseInstance'

interface Props {
  exInstances: ExerciseInstanceType[]
  handleSetIncrement: any
}

function ExerciseInstances({
  exInstances,
  handleSetIncrement
}: Props) {
  function renderInstances() {
    return exInstances.map((exInst) => {
      return (
        <ExerciseInstance
          key={exInst.id}
          exInst={exInst}
          handleSetIncrement={handleSetIncrement}
        />
      )
    })
  }

  return (
    <ul>
      {renderInstances()}
    </ul>
  )
}

export default ExerciseInstances
