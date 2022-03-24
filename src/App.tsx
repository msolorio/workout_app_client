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
