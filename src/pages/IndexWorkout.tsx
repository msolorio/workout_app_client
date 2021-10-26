import {
  useQuery,
  gql
} from '@apollo/client';

const WORKOUTS = gql`
  query GetWorkouts {
    workouts {
      id
      name
      description
      length
      location
    }
  }
`;


function Workouts() {
  const { loading, error, data } = useQuery(WORKOUTS);
  
  if (loading) return <h3>Loading...</h3>;
  
  if (error) {
    console.log(error);
    
    return <h3>Error</h3>
  }

  return data.workouts.map((workout: any, idx: number) => {
    return (
      <div key={idx}>
        <h2>{workout.name}</h2>
        <p>{workout.description}</p>
      </div>
    );
  });
}


function IndexWorkout() {
  return (
    <main>
      <h2>Index workout page</h2>
      <Workouts />
    </main>
  )
}

export default IndexWorkout;
