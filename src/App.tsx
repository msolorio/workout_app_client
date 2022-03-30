import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks'
import { storeLoginTokenInRdx, removeLoginTokenInRdx } from './features/auth/authSlice';
import { getLoginTokenFromLocalStorage } from './utils/authUtils';
import Header from './components/Header';
import Footer from './components/Footer';
import Routes from './Routes'

function App() {
  const dispatch = useAppDispatch()

  useEffect(() => {
    // sync login token in redux with local storage
    getLoginTokenFromLocalStorage()
    ? dispatch(storeLoginTokenInRdx)
    : dispatch(removeLoginTokenInRdx)

    // Temporary fix for this bug in react - https://stackoverflow.com/questions/70368760/react-uncaught-referenceerror-process-is-not-defined/70791920#70791920
    // @ts-ignore
    window.process = {
      ...window.process,
    }
  })

  return (
    <div className="window">
      <div className="mobileContainer">
        <Header />
        <Routes />
        <Footer />
      </div>
    </div>
  );
}

export default App;
