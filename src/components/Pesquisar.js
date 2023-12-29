import { connect } from 'react-redux';
import { store } from '../store';
import { GetFields } from '../actions';
import { GetText } from '../actions';
import { SelectField } from '../actions';
import { FilterTerm } from '../actions';
import { SearchTexts } from '../actions';
import { RemoveField } from '../actions';
import { SetResultsPage } from '../actions';
import { Link } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/pesquisar.scss";
import moment from 'moment';
import "../scss/loader.scss";
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';

function Anos(props) {

  var pesquisa = props.pesquisa;

  var search = props.search;

  var filter = props.filter;

  var resultados = props.resultados;

  var texto = props.texto;

  var page = props.page;

  var mobile = props.mobile;

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true)
  };

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

  function setResultsPage(page) {
    store.dispatch(SetResultsPage(page))
  }

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

            {
              (resultados !== null && texto !== null)?
              <div className='pesquisar__content__banner'>
                
                <div className='pesquisar__content__banner__img kenburns-bottom' style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.7) 100%), url('https://cinetica.nyc3.digitaloceanspaces.com/Trabalhos/Cin%C3%A9tica/Imagens/${texto.imagem}')`}}></div>

                <Container fluid className='pesquisar__content__banner__container'>
                  <Row>
                    <Col md={6} xs={7}>

                    <h2 style={{marginTop: mobile === true && texto.titulo.length > 25?'8vw':''}} className="pesquisar__content__banner__date">{moment(texto.data).utcOffset('+000').format('D/M/Y')}</h2>
                      <h1 className="pesquisar__content__banner__title">{texto.titulo}</h1>
                      <h1 className="pesquisar__content__banner__film">{texto.filme}</h1>
                      <h2 className="pesquisar__content__banner__author">{texto.autores[0].nome} {texto.autores[1] !== undefined? <span>| {texto.autores[1].nome}</span>: null} {texto.autores[2] !== undefined? <span>| {texto.autores[2].nome}</span>: null} {texto.autores[3] !== undefined? <span>| {texto.autores[3].nome}</span>: null} </h2>

                    </Col>

                    {
                      mobile === false?
                      <Col md={4}>
                
                        <div className="pesquisar__content__banner__words">
                
                        { texto.categorias.map( (item, index) =>
                
                          <Link key={item.id} className="pesquisar__content__banner__words__categories" to={`/categorias/${item.categoria.toLowerCase()}/1`}>{item.categoria}</Link>
                
                          )}
                
                          { texto.tags.map( (item, index) =>
                
                          <Link key={item.id} className="pesquisar__content__banner__words__tag"  to={!item.tag.includes('20')?`/tags/${item.tag.toLowerCase()}/1`:`/anos/${item.tag.toLowerCase()}/1`}>{item.tag}</Link>
                
                        )}
                
                
                        </div>
                
                      </Col>
                      :<Col xs={2}>
                        <img onClick={() => handleShow()} className="pesquisar__content__banner__tag" src="/images/icons/tag.svg" alt="" />
                      </Col>
                    }

                    <Col md={2} xs={3}>
                      <Link className="pesquisar__content__banner__link" to={`/texto/${texto.id}`}>Acessar</Link>
                    </Col>
                  </Row>
                </Container>
    
              </div>
              :null
            }

            <div className="pesquisar__content__pesquisa">

              <Container fluid>
                <Row>
                  <Col md={2} xs={2}>
                    <img onClick={() => getField(pesquisa.active-1)} className="pesquisar__content__pesquisa__icon" src="/images/icons/galeria-right.png" alt="" />
                  </Col>

                  <Col md={8} xs={8}>
                    <h1 className="pesquisar__content__pesquisa__campo">{pesquisa.campos[pesquisa.active].campo}</h1>
                  </Col>

                  <Col md={2} xs={2}>
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
                      <Col md={4} xs={6}>
                        <div className="pesquisar__content__campos__campo">
                          <h3 className="pesquisar__content__campos__campo__title">Título <img onClick={() => removeField('título')} className='pesquisar__content__campos__campo__img' src="/images/icons/remove.png" alt="" /></h3>

                          <h4 className="pesquisar__content__campos__campo__selected">{search.título}</h4>
                        </div>
                      </Col>
                      :null
                    }

                    {
                      search.filme !== null ?
                      <Col md={4} xs={6}>
                        <div className="pesquisar__content__campos__campo">
                          <h3 className="pesquisar__content__campos__campo__title">Filme <img onClick={() => removeField('filme')} className='pesquisar__content__campos__campo__img' src="/images/icons/remove.png" alt="" /></h3>

                          <h4 className="pesquisar__content__campos__campo__selected">{search.filme}</h4>
                        </div>
                      </Col>
                      :null
                    } 

                    {
                      search.ano !== null ?
                      <Col md={4} xs={6}>
                        <div className="pesquisar__content__campos__campo">
                          <h3 className="pesquisar__content__campos__campo__title">Ano <img onClick={() => removeField('ano')} className='pesquisar__content__campos__campo__img' src="/images/icons/remove.png" alt="" /></h3>

                          <h4 className="pesquisar__content__campos__campo__selected">{search.ano}</h4>
                        </div>
                      </Col>
                      :null
                    } 

                    {
                      search.autor.length > 0 ?
                      <Col md={4} xs={6}>
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
                      <Col md={4} xs={6}>
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
                      <Col md={4} xs={6}>
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

                {
                  resultados.number === 1?
                  <h3 className="pesquisar__content__resultados__length">{resultados.number} resultado encontrado</h3>
                  :<h3 className="pesquisar__content__resultados__length">{resultados.number} resultados encontrados</h3>
                }


                <Container fluid>
                  <Row>
                    { resultados.results[page]?.map( (text, index) =>
                      <Col key={text.id} md={3} xs={6}>
                        {console.log(text)}
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

          <Footer></Footer>
        </div>

        {
          texto !== null?
            <Modal show={show} onHide={handleClose} className="modal">
            <div className='search'>
                      
              { texto.categorias.map( (item, index) =>
                <Link key={item.id} className="search__categories" to={`/categorias/${item.categoria.toLowerCase()}/1`}>{item.categoria}</Link>
              )}

              { texto.tags.map( (item, index) =>
                <Link key={item.id} className="search__tag"  to={!item.tag.includes('20')?`/tags/${item.tag.toLowerCase()}/1`:`/anos/${item.tag.toLowerCase()}/1`}>{item.tag}</Link>
              )}
            </div>
          </Modal>
          :null
        }

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
    page: state.page,
    mobile: state.mobile,
  }
}

export default connect(
  mapStateToProps
)(Anos);
