import { Route, Redirect } from 'react-router-dom';
import { useAppSelector } from '../app/hooks'
import { selectLoginTokenInRdx } from '../features/auth/authSlice';

function ProtectedRoute(props: any) {
  const loginToken: string = useAppSelector(selectLoginTokenInRdx)

  if (!loginToken) return <Redirect to="/" />

  return (
    <Route 
      exact 
      path={props.path} 
      render={props.render}
    />
  )
}

export default ProtectedRoute
