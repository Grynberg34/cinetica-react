import Header from './Header';
import Banner from './Banner';
import Recentes from './Recentes';
import Destaques from './Destaques';
import Biblioteca from './Biblioteca';
import Footer from './Footer';
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
        <Footer></Footer>

      </div>
    </div>
  )
  
}


export default App;