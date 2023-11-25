import { connect } from 'react-redux';
import { store } from '../store';
import { GetYears } from '../actions';
import { Link } from "react-router-dom";
import Header from './Header';
import Footer from './Footer';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/anos.scss";


function Anos(props) {

  var anos = props.anos;

  if (anos === null) {
    store.dispatch(GetYears())

    return (
      <div></div>
    )
  } else if (anos !== null) {
    return (
      <div id='anos' className='anos'>
        <Header></Header>
        
        <div className='anos__banner'>
          <img className='anos__banner__img' src="/images/banner/banner-explore.png" alt="" />
          <h1 className='anos__banner__text'>Explore nossa biblioteca</h1>
        </div>
  
        <div className='anos__content'>
          <h2 className='anos__content__title'>Anos</h2>
  
          <div>
            <Container fluid>
              <Row>
              { anos.map( (ano, index) =>
  
                <Col key={index} md={4}>
                  <div className='anos__content__ano' style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.6) 0%,rgba(0,0,0,0.6) 100%), url('https://cinetica.nyc3.digitaloceanspaces.com/Trabalhos/Cin%C3%A9tica/Imagens/${ano.imagem}')`}}>
                    <Link className='anos__content__ano__title'  to={`/anos/${ano.numero}/1`}>{ano.numero}</Link>
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
    anos: state.anos
  }
}

export default connect(
  mapStateToProps
)(Anos);