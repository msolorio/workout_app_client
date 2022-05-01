import { ExerciseInstanceType } from '../../../model/services/redux/reduxApi/features/exerciseInstance/exerciseInstancesSlice'
import ExerciseInstance from './ExerciseInstance'
import { HandleSetIncrementType } from '../../../model/Types'

interface Props {
  exInstances: ExerciseInstanceType[]
  handleSetIncrement: HandleSetIncrementType
}

function ExerciseInstances({
  exInstances,
  handleSetIncrement
}: Props): JSX.Element {
  function renderInstances(): React.ReactNode {
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
