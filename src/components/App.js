import Header from './Header';
import Banner from './Banner';
import Recentes from './Recentes';
import "../scss/app.scss";

function App(props) {

  return (
    <div id="home">
      <div className="home">

        <Header></Header>
        <Banner></Banner>
        <Recentes></Recentes>

      </div>
    </div>
  )
  
}


export default App;