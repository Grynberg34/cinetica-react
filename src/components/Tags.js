import { connect } from 'react-redux';
import { store } from '../store';
import { GetTags } from '../actions';
import { SearchTags } from '../actions';
import { Link } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/tags.scss";


function Tags(props) {

  var tags = props.tags;

  function searchTag(filter) {
    store.dispatch(SearchTags(filter, tags.all))
  }

  if (tags === null) {
    store.dispatch(GetTags())

    return (
      <div></div>
    )
  } else if (tags !== null) {
    return (
      <div id='tags' className='tags'>
        <Header></Header>
  
        <div className='tags__content'>
          <div className='tags__content__header'>
            <Container fluid>
              <Row>

                <Col md={6}>
                  <h2 className='tags__content__header__title'>Tags</h2>
                </Col>

                <Col md={6}>

                  <label className='tags__content__header__label'>Filtrar tag</label>
                  <input onChange={(e)=> searchTag(e.target.value)} className="tags__content__header__input" type="text" />

                </Col>

              </Row>
            </Container>
          </div>

  
          <div className='tags__content__tags'>
            <Container fluid>
              <Row>
              { tags.filter.map( (tag, index) =>
  
                <Col key={index} md={4}>
                  <div className='tags__content__tag'>
                    <Link className='tags__content__tag__title'  to={`/tags/${tag.tag.toLowerCase()}/1`}>{tag.tag}</Link>
                  </div>
                </Col>
              )}
              </Row>
            </Container>
          </div>
  
        </div>

        <Footer></Footer>
  
      </div>
    )
  }
  
}

function mapStateToProps(state) {
  return {
    tags: state.tags
  }
}

export default connect(
  mapStateToProps
)(Tags);
