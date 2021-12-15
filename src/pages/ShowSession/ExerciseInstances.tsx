import { ExerciseInstanceType } from '../../features/exerciseInstance/exerciseInstancesSlice'
import ExerciseInstance from './ExerciseInstance'

interface Props {
  exInstances: ExerciseInstanceType[]
  sessionId: string
}

function ExerciseInstances({ exInstances, sessionId }: Props) {
  function renderInstances() {
    return exInstances.map((exInst) => {
      return (
        <ExerciseInstance
          key={exInst.id}
          exInst={exInst}
          sessionId={sessionId}
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
