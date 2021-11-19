import { ExerciseInstanceType } from '../../features/exerciseInstance/exerciseInstancesSlice'
import ExerciseInstance from './ExerciseInstance'

interface Props {
  exInstances: ExerciseInstanceType[]
}

function ExerciseInstances(props: Props) {
  function renderInstances() {
    return props.exInstances.map((exInst) => {
      return (
        <ExerciseInstance
          key={exInst.id}
          exInst={exInst}
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
