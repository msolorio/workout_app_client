import Header from '../components/Header'
import Footer from '../components/Footer'
import Routes from '../Routes/index'
import model from '../model'

function App() {
  model.App.useSyncToken()
  model.App.useInitData()
  model.App.useSetWindowProcess()

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