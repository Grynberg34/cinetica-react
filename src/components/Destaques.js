import { connect } from 'react-redux';
import { store } from '../store';
import { GetDestaqueTexts } from '../actions';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import moment from 'moment';
import "../scss/destaques.scss";

function Destaques(props) {

  var destaques = props.destaques;

  if (destaques === null) {
    store.dispatch(GetDestaqueTexts())

    return (
      <div></div>
    )
  } else {

    return (
      <div className='destaques'>
        <h1 className='destaques__title'>Destaques</h1>

        <Container fluid className="destaques__container">
          <Row>
          { destaques.map( (text, index) =>
            <Col key={text.id} md={4} className='destaques__col'>

              <div className='destaques__text'>
                <div className='destaques__text__inner'>

                  <Link to={`/texto/${text.Texto.id}`}><div className='destaques__text__inner__img' style={{backgroundImage: `url('https://cinetica.nyc3.digitaloceanspaces.com/Trabalhos/Cin%C3%A9tica/Imagens/${text.Texto.imagem}')`}}></div></Link>
                  <Container fluid>
                    <Row>
                      <Col md={8}>
                        <Link className='destaques__text__inner__link' to="/">
                          <div className="destaques__text__inner__info">
                            <h2 className="destaques__text__inner__info__title"> {text.Texto.titulo.length > 30 ? <span>{text.Texto.titulo.substring(0, 30) + '...'}</span>: <span>{text.Texto.titulo}</span>}</h2>
                            <h3 className='destaques__text__inner__info__film'>{text.Texto.filme}</h3>
                          </div>
                        </Link>
                      </Col>
                      <Col md={4}>
                        <h4 className="destaques__text__inner__date">{moment(text.Texto.data).utcOffset('+000').format('D/M/Y')}</h4>
                      </Col>
                    </Row>
                  </Container>

                  <div className="destaques__text__inner__words">
                  
                    { text.Texto.categorias.map( (item, index) =>

                      <Link key={item.id} className="destaques__text__inner__words__categories" to="/">{item.categoria}</Link>

                    )}

                    { text.Texto.tags.map( (item, index) =>

                      <Link key={item.id} className="destaques__text__inner__words__tag" to="/">{item.tag}</Link>

                    )}

                  
                  </div>
                        
                </div>
              </div>
              


            </Col>
          )}
          </Row>
        </Container>          

      </div>
    )

  }
  
}

function mapStateToProps(state) {
  return {
    destaques: state.destaques
  }
}

export default connect(
  mapStateToProps
)(Destaques);
