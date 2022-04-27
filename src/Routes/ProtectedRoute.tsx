import { Route, Redirect } from 'react-router-dom';
import { useAppSelector } from '../model/services/redux/reduxApi/app/hooks'
import { selectLoginTokenInRdx } from '../model/services/redux/reduxApi/features/auth/authSlice';

function ProtectedRoute(props: any) {
  const loginToken: string = useAppSelector(selectLoginTokenInRdx)

  if (!loginToken) return <Redirect to="/login" />

  return (
    <Route 
      exact
      path={props.path} 
      render={props.render}
    />
  )
}

export default ProtectedRoute
