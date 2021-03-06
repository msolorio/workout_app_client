import Header from '../components/Header'
import Footer from '../components/Footer'
import MessageBanner from '../components/MessageBanner'
import Routes from '../Routes/index'
import model from '../model'

function App(): JSX.Element {
  model.App.useInitData()
  model.App.useSetWindowProcess()

  return (
    <div className="window">
      <div className="mobileContainer">
        <Header />
        <MessageBanner />
        <Routes />
        <Footer />
      </div>
    </div>
  );
}

export default App;
