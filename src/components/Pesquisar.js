import { connect } from 'react-redux';
import { store } from '../store';
import { GetFields } from '../actions';
import Header from './Header';
import Footer from './Footer';
import PesquisarBanner from './PesquisarBanner';
import PesquisarCampos from './PesquisarCampos';
import PesquisarResultados from './PesquisarResultados';
import "../scss/pesquisar.scss";
import "../scss/loader.scss";


function Pesquisar(props) {

  var pesquisa = props.pesquisa;

  if (pesquisa === null) {
    store.dispatch(GetFields())

    return (
      <div id='loader'>
        <Header></Header>

        <div className="spinner"></div>
      </div>
    )
  } else if (pesquisa !== null) {
    return (
      <div style={{position:'relative'}}> 

        <div className="pesquisar">
          
          <Header></Header>

          <div className="pesquisar__content">

            <PesquisarBanner></PesquisarBanner>

            <PesquisarCampos></PesquisarCampos>

            <PesquisarResultados></PesquisarResultados>

          </div>

          <Footer></Footer>

        </div>

      </div>
    )
  }
  
}

function mapStateToProps(state) {
  return {
    pesquisa: state.pesquisa,
  }
}

export default connect(
  mapStateToProps
)(Pesquisar);
