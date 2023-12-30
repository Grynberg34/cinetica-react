import { connect } from 'react-redux';
import { store } from '../store';
import { GetText } from '../actions';
import { SetResultsPage } from '../actions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/pesquisar.scss";
import moment from 'moment';
import "../scss/loader.scss";


function Pesquisar(props) {

  var resultados = props.resultados;

  var page = props.page;

  function getTextBanner(id) {
    store.dispatch(GetText(id))
  }

  function setResultsPage(page) {
    store.dispatch(SetResultsPage(page))
  }


  return (
    <div style={{position:'relative'}}> 

      {
        resultados !== null ?
        <div className="pesquisar__content__resultados">

          {
            resultados.number === 1?
            <h3 className="pesquisar__content__resultados__length">{resultados.number} resultado encontrado</h3>
            :<h3 className="pesquisar__content__resultados__length">{resultados.number} resultados encontrados</h3>
          }


          <Container fluid>
            <Row>
              { resultados.results[page]?.map( (text, index) =>
                <Col key={text.id} md={3} xs={6}>
                  <div onClick={()=> {getTextBanner(text.id)}} className='pesquisar__content__resultados__text'>
                    <div className='pesquisar__content__resultados__text__inner'>

                      <div className='pesquisar__content__resultados__text__inner__img' style={{backgroundImage: `url('https://cinetica.nyc3.digitaloceanspaces.com/Trabalhos/Cin%C3%A9tica/Imagens/${text.imagem}')`}}></div>
                      <Container fluid className='pesquisar__content__resultados__text__inner__container'>
                        <Row>
                          <Col md={9} xs={12}>

                            <div className="pesquisar__content__resultados__text__inner__info">
                              <h2 className="pesquisar__content__resultados__text__inner__info__title"> {text.titulo.length > 40 ? <span>{text.titulo.substring(0, 40) + '...'}</span>: <span>{text.titulo}</span>}</h2>
                              <h3 className='pesquisar__content__resultados__text__inner__info__film'>{text.filme}</h3>
                            </div>

                          </Col>
                          <Col md={3} xs={12}>
                            <h4 className="pesquisar__content__resultados__text__inner__date">{moment(text.data).utcOffset('+000').format('D/M/Y')}</h4>
                          </Col>
                        </Row>
                      </Container>
                            
                    </div>
                  </div>
                  
                </Col>
              )}
            </Row>
          </Container> 


            {
              resultados.number > 8?
              <div className="pesquisar__content__resultados__pages">
                <Container fluid>
                  <Row>
                    <Col md={2} xs={3}>
                      {
                        (page + 1) - 1 > 0 ?
                        <div>
                          <img  onClick={()=> {setResultsPage(page-1)}}  className='pesquisar__content__resultados__pages__icon' src="/images/icons/seta-esquerda.svg" alt="" />
                          <span className="pesquisar__content__resultados__pages__number left">{(page)}</span>
                        </div>
                        :null
                      }
                    </Col>
                    
                    <Col md={8} xs={6}>
                      <h1 className='pesquisar__content__resultados__pages__text'>{page+1}<span className="pesquisar__content__resultados__pages__text__sub">/{resultados.results.length}</span></h1>
                    </Col>
  
                    <Col md={2} xs={3}>
                      {
                        (page + 1) < resultados.results.length ?
                        <div>
                          <span className="pesquisar__content__resultados__pages__number right">{(page + 2)}</span>
                          <img onClick={()=> {setResultsPage(page+1)}} className='pesquisar__content__resultados__pages__icon next' src="/images/icons/seta-esquerda.svg" alt="" />
                        </div>
                        :null
                      }
                    </Col>
  
                  </Row>
                </Container>
              </div>

              :null
            }

        </div>
        :null
      }

    </div>
  )
  
  
}

function mapStateToProps(state) {
  return {
    filter: state.filter,
    resultados: state.resultados,
    page: state.page,
  }
}

export default connect(
  mapStateToProps
)(Pesquisar);
