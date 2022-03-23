import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks'
import { storeLoginTokenInRdx, removeLoginTokenInRdx } from './features/auth/authSlice';
import { getLoginTokenFromLocalStorage } from './utils/authUtils';
import Header from './components/Header';
import Routes from './Routes'
import './App.css'


function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // sync login token in redux with local storage
    getLoginTokenFromLocalStorage()
    ? dispatch(storeLoginTokenInRdx)
    : dispatch(removeLoginTokenInRdx)
  })

  return (
    <div className="App">
      <h1>Workout App</h1>
      <Header />
      <Routes />
    </div>
  );
}

export default App;
