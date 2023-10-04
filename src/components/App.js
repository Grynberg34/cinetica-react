import Header from './Header';
import Banner from './Banner';
import "../scss/app.scss";

function App(props) {

  return (
    <div id="home">
      <div className="home">

        <Header></Header>
        <Banner></Banner>

      </div>
    </div>
  )
  
}


export default App;