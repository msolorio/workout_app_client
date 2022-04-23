import Header from '../components/Header'
import Footer from '../components/Footer'
import Routes from '../Routes/index'
import useSyncToken from './useSyncToken'
import useInitData from '../utils/hooks/useInitData'

function App() {
  useSyncToken()
  useInitData()

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
