import { connect } from 'react-redux';
import { store } from '../store';
import { GetFields } from '../actions';
import { SelectField } from '../actions';
import { FilterTerm } from '../actions';
import { SearchTexts } from '../actions';
import { RemoveField } from '../actions';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/pesquisar.scss";

function PesquisarCampos(props) {

  var pesquisa = props.pesquisa;

  var search = props.search;

  var filter = props.filter;

  console.log(search);

  function getField(index) {

    if (index < 0) {
      index = 6
    }

    if (index > 6) {
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


  if (pesquisa === null) {
    store.dispatch(GetFields())

    return (
      <div>

      </div>
    )
  } else if (pesquisa !== null) {
    return (
      <div style={{position:'relative'}}> 

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
                  search.diretor !== null ?
                  <Col md={4} xs={6}>
                    <div className="pesquisar__content__campos__campo">
                      <h3 className="pesquisar__content__campos__campo__title">Diretor <img onClick={() => removeField('diretor')} className='pesquisar__content__campos__campo__img' src="/images/icons/remove.png" alt="" /></h3>

                      <h4 className="pesquisar__content__campos__campo__selected">{search.diretor}</h4>
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

      </div>
    )
  }
  
}

function mapStateToProps(state) {
  return {
    pesquisa: state.pesquisa,
    filter: state.filter,
    search: state.search,
  }
}

export default connect(
  mapStateToProps
)(PesquisarCampos);
