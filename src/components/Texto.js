import { connect } from 'react-redux';
import { store } from '../store';
import { GetText } from '../actions';
import { Link, useParams } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/texto.scss";
import moment from 'moment';

function Texto(props) {

  var { id } = useParams();

  var texto = props.texto;

  var numero_fundo = Math.floor(Math.random() * 4);

  var numero_texto= Math.floor(Math.random() * 4);

  var cores_fundo = ["#fae9e5","#f4e0d8;","#f4f4f4","#e9e9e9"]

  var cores_texto = ["#747474", "#2a2a2a", "#782323", "#530000"]


  console.log(texto)

  if (texto === null || parseInt(id) !== texto.id) {
    store.dispatch(GetText(id))


    return (
      <div></div>
    )
  } else {

    return (
      <div>

        <Header></Header>
        
        <div className='texto'>
          <div className='texto__banner' style={{backgroundImage: `url('https://cinetica.nyc3.digitaloceanspaces.com/Trabalhos/Cin%C3%A9tica/Imagens/${texto.imagem}')`}}></div>

          <div className='texto__header'>

            <h1 className='texto__header__title'>{texto.titulo}</h1>
            <h2 className='texto__header__film'>{texto.filme}</h2>
            <h2 className='texto__header__date'>{moment(texto.data).utcOffset('+000').format('D/M/Y')}</h2>

          </div>

          <div className='texto__main' style={{backgroundColor: `${cores_fundo[numero_fundo]}`}}>
            <div className='texto__main__title'></div>

            <p className='texto__main__text' style={{color: `${cores_texto[numero_texto]}`}}>{texto.texto}</p>
          </div>

          <div className='texto__footer'>
            { texto.categorias.map( (item, index) =>

              <Link key={item.id} className="texto__footer__categories" to="/">{item.categoria}</Link>

            )}

            { texto.tags.map( (item, index) =>

              <Link key={item.id} className="texto__footer__tags" to="/">{item.tag}</Link>

            )}
          </div>

        </div>

        <Footer></Footer>

      </div>

    )

  }
  
}

function mapStateToProps(state) {
  return {
    texto: state.texto
  }
}

export default connect(
  mapStateToProps
)(Texto);
