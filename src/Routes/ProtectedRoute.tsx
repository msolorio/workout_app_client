import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { useAppSelector } from '../model/services/redux/reduxApi/app/hooks'
import { selectLoginTokenInRdx } from '../model/services/redux/reduxApi/features/auth/authSlice';

interface Props {
  path: string
  render: (routeProps: RouteComponentProps<any>) => JSX.Element
}

function ProtectedRoute(props: Props): JSX.Element {
  const loginStatus: boolean = useAppSelector(selectLoginTokenInRdx)

  if (!loginStatus) return <Redirect to="/login" />

  return (
    <Route 
      exact
      path={props.path} 
      render={props.render}
    />
  )
}

export default ProtectedRoute
