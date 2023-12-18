import { connect } from 'react-redux';
import { store } from '../store';
import { GetFields } from '../actions';
import { GetText } from '../actions';
import { SelectField } from '../actions';
import { FilterTerm } from '../actions';
import { SearchTexts } from '../actions';
import { RemoveField } from '../actions';
import { Link } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/pesquisar.scss";
import moment from 'moment';
import "../scss/loader.scss";

function Anos(props) {

  var pesquisa = props.pesquisa;

  var search = props.search;

  var filter = props.filter;

  var resultados = props.resultados;

  var texto = props.texto;

  function getField(index) {

    if (index < 0) {
      index = 5
    }

    if (index > 5) {
      index = 0
    }

    store.dispatch(SelectField(index))
  }

  function searchTerm(term) {

    var list = pesquisa.campos[pesquisa.active];

    store.dispatch(FilterTerm(term, list))
  }

  function selectTerm(term) {
    store.dispatch(SearchTexts(term, pesquisa.campos[pesquisa.active].campo, search))
  }

  function removeField(campo) {
    store.dispatch(RemoveField(campo, search))
  }

  function getTextBanner(id) {
    store.dispatch(GetText(id))
  }

  if (pesquisa === null) {
    store.dispatch(GetFields())

    return (
      <div id='loader'>
        <Header></Header>

        <div class="spinner"></div>
      </div>
    )
  } else if (pesquisa !== null) {
    return (
      <div className="pesquisar">
        <Header></Header>

        <div className="pesquisar__content">

          {
            (resultados !== null && texto !== null)?
            <div className='pesquisa__content__banner' style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.7) 100%), url('https://cinetica.nyc3.digitaloceanspaces.com/Trabalhos/Cin%C3%A9tica/Imagens/${texto.imagem}')`}}>
  
            <Container fluid>
              <Row>
                <Col md={6}>

                  <h2 className="pesquisa__content__banner__date">{moment(texto.data).utcOffset('+000').format('D/M/Y')}</h2>
                  <h1 className="pesquisa__content__banner__title">{texto.titulo}</h1>
                  <h1 className="pesquisa__content__banner__film">{texto.filme}</h1>
                  <h2 className="pesquisa__content__banner__author">{texto.autores[0].nome} {texto.autores[1] !== undefined? <span>| {texto.autores[1].nome}</span>: null} {texto.autores[2] !== undefined? <span>| {texto.autores[2].nome}</span>: null} {texto.autores[3] !== undefined? <span>| {texto.autores[3].nome}</span>: null} </h2>

                </Col>

                <Col md={4}>

                  <div className="pesquisa__content__banner__words">

                  { texto.categorias.map( (item, index) =>

                    <Link key={item.id} className="pesquisa__content__banner__words__categories" to={`/categorias/${item.categoria.toLowerCase()}/1`}>{item.categoria}</Link>

                    )}

                    { texto.tags.map( (item, index) =>

                    <Link key={item.id} className="pesquisa__content__banner__words__tag"  to={!item.tag.includes('20')?`/tags/${item.tag.toLowerCase()}/1`:`/anos/${item.tag.toLowerCase()}/1`}>{item.tag}</Link>

                  )}


                  </div>

                </Col>

                <Col md={2}>
                  <Link className="pesquisa__content__banner__link" to={`/texto/${texto.id}`}>Acessar</Link>
                </Col>
              </Row>
            </Container>
  
            </div>
            :null
          }

          <div className="pesquisar__content__pesquisa">

            <Container fluid>
              <Row>
                <Col md={2}>
                  <img onClick={() => getField(pesquisa.active-1)} className="pesquisar__content__pesquisa__icon" src="/images/icons/galeria-right.png" alt="" />
                </Col>

                <Col md={8}>
                  <h1 className="pesquisar__content__pesquisa__campo">{pesquisa.campos[pesquisa.active].campo}</h1>
                </Col>

                <Col md={2}>
                  <img onClick={() => getField(pesquisa.active+1)} className="pesquisar__content__pesquisa__icon" src="/images/icons/galeria.png" alt="" />
                </Col>
              </Row>
            </Container>

            <input  onClick={() => filter === null?  searchTerm('', pesquisa.active): null} onChange={(e) => searchTerm(e.target.value, pesquisa.active)} type="text" className="pesquisar__content__pesquisa__input" />

            {
              (filter !== null && filter.length > 0) ?
              <div className='pesquisar__content__pesquisa__termos'>
                { filter.map( (item, index) =>
                  <h2 onClick={() => selectTerm(Object.values(item)[1])} key={index} className='pesquisar__content__pesquisa__termos__termo'>
                    {Object.values(item)[1]}
                  </h2>
                )}
              </div>
              :null
            }

          </div>

          <div className="pesquisar__content__campos">

            {
              search !== null?
              <Container fluid>
                <Row>

                  {
                    search.título !== null ?
                    <Col md={4}>
                      <div className="pesquisar__content__campos__campo">
                        <h3 className="pesquisar__content__campos__campo__title">Título <img onClick={() => removeField('título')} className='pesquisar__content__campos__campo__img' src="/images/icons/remove.png" alt="" /></h3>

                        <h4 className="pesquisar__content__campos__campo__selected">{search.título}</h4>
                      </div>
                    </Col>
                    :null
                  }

                  {
                    search.filme !== null ?
                    <Col md={4}>
                      <div className="pesquisar__content__campos__campo">
                        <h3 className="pesquisar__content__campos__campo__title">Filme <img onClick={() => removeField('filme')} className='pesquisar__content__campos__campo__img' src="/images/icons/remove.png" alt="" /></h3>

                        <h4 className="pesquisar__content__campos__campo__selected">{search.filme}</h4>
                      </div>
                    </Col>
                    :null
                  } 

                  {
                    search.ano !== null ?
                    <Col md={4}>
                      <div className="pesquisar__content__campos__campo">
                        <h3 className="pesquisar__content__campos__campo__title">Ano <img onClick={() => removeField('ano')} className='pesquisar__content__campos__campo__img' src="/images/icons/remove.png" alt="" /></h3>

                        <h4 className="pesquisar__content__campos__campo__selected">{search.ano}</h4>
                      </div>
                    </Col>
                    :null
                  } 

                  {
                    search.autor.length > 0 ?
                    <Col md={4}>
                      <div className="pesquisar__content__campos__campo">
                        <h3 className="pesquisar__content__campos__campo__title">Autor <img onClick={() => removeField('autor')} className='pesquisar__content__campos__campo__img' src="/images/icons/remove.png" alt="" /></h3>

                        { search.autor.map( (autor, index) =>

                          <h4 key={index} className="pesquisar__content__campos__campo__selected">{autor}</h4>

                          )}
                      </div>
                    </Col>
                    :null
                  } 

                  {
                    search.categoria.length > 0 ?
                    <Col md={4}>
                      <div className="pesquisar__content__campos__campo">
                        <h3 className="pesquisar__content__campos__campo__title">Categorias <img onClick={() => removeField('categoria')} className='pesquisar__content__campos__campo__img' src="/images/icons/remove.png" alt="" /></h3>

                        { search.categoria.map( (categoria, index) =>

                          <h4 key={index} className="pesquisar__content__campos__campo__selected">{categoria}</h4>

                        )}

                      </div>
                    </Col>
                    :null
                  } 

                  {
                    search.tag.length > 0 ?
                    <Col md={4}>
                      <div className="pesquisar__content__campos__campo">
                        <h3 className="pesquisar__content__campos__campo__title">Tags <img onClick={() => removeField('tag')} className='pesquisar__content__campos__campo__img' src="/images/icons/remove.png" alt="" /></h3>

                        { search.tag.map( (tag, index) =>

                          <h4 key={index} className="pesquisar__content__campos__campo__selected">{tag}</h4>

                        )}

                      </div>
                    </Col>
                    :null
                  } 
 
                </Row>
              </Container>
              :null
            }


          </div>

          {
            resultados !== null ?
            <div className="pesquisar__content__resultados">

              <h3 className="pesquisar__content__resultados__length">{resultados.length} resultado(s) encontrado(s)</h3>

              <Container fluid>
                <Row>
                  { resultados.map( (text, index) =>
                    <Col key={text.id} md={3}>
                      <div onClick={()=> getTextBanner(text.id)} className='pesquisar__content__resultados__text'>
                        <div className='pesquisar__content__resultados__text__inner'>
    
                          <div className='pesquisar__content__resultados__text__inner__img' style={{backgroundImage: `url('https://cinetica.nyc3.digitaloceanspaces.com/Trabalhos/Cin%C3%A9tica/Imagens/${text.imagem}')`}}></div>
                          <Container fluid className='pesquisar__content__resultados__text__inner__container'>
                            <Row>
                              <Col md={9}>
  
                                <div className="pesquisar__content__resultados__text__inner__info">
                                  <h2 className="pesquisar__content__resultados__text__inner__info__title"> {text.titulo.length > 40 ? <span>{text.titulo.substring(0, 40) + '...'}</span>: <span>{text.titulo}</span>}</h2>
                                  <h3 className='pesquisar__content__resultados__text__inner__info__film'>{text.filme}</h3>
                                </div>

                              </Col>
                              <Col md={3}>
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
            </div>
            :null
          }

        </div>

        <Footer></Footer>
      </div>
    )
  }
  
}

function mapStateToProps(state) {
  return {
    pesquisa: state.pesquisa,
    filter: state.filter,
    search: state.search,
    resultados: state.resultados,
    texto: state.texto,
  }
}

export default connect(
  mapStateToProps
)(Anos);
