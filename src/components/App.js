import Header from './Header';
import Banner from './Banner';
import Recentes from './Recentes';
import Destaques from './Destaques';
import Biblioteca from './Biblioteca';
import "../scss/app.scss";

function App(props) {

  return (
    <div id="home">
      <div className="home">

        <Header></Header>
        <Banner></Banner>
        <Recentes></Recentes>
        <Destaques></Destaques>
        <Biblioteca></Biblioteca>

      </div>
    </div>
  )
  
}


export default App;