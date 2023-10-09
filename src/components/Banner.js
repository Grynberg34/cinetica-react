import { connect } from 'react-redux';
import { store } from '../store';
import { GetBannerTexts } from '../actions';
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import "../scss/bannerhome.scss";

function Banner(props) {

  var banner = props.banner;

  if (banner === null) {
    store.dispatch(GetBannerTexts())

    return (
      <div></div>
    )
  } else {

    return (
      <Carousel id="bannerhome" autoPlay={true} interval={5000} controls={false} indicators={false} pause={false}>

        <Carousel.Item className="banner">


          <div className="banner__first" style={{backgroundImage: `url('/images/banner/banner.png')`}}>
          

            <div className="banner__first__caption">

              <h1 className="banner__first__caption__title">Quem Somos</h1>

            </div>

          </div>


        </Carousel.Item>

        { banner.map( (text, index) => 

          <Carousel.Item key={text.id} className="banner">

            <Link  to={`/texto/${text.id}`}>

              <div className="banner__item" style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%,rgba(0,0,0,0.4) 100%), url('https://cinetica.nyc3.digitaloceanspaces.com/Trabalhos/Cin%C3%A9tica/Imagens/${text.imagem}')`}}>

                <div className="banner__item__caption">

                  <h1 className="banner__item__caption__title">{text.titulo}</h1>
                  <h2 className="banner__item__caption__author">{text.autores[0].nome} {text.autores[1] !== undefined? <span>| {text.autores[1].nome}</span>: null} {text.autores[2] !== undefined? <span>| {text.autores[2].nome}</span>: null} {text.autores[3] !== undefined? <span>| {text.autores[3].nome}</span>: null} </h2>

                </div>

              </div>

                
            </Link>

          </Carousel.Item>
        )}

      </Carousel>
    )

      

  }


  
}

function mapStateToProps(state) {
  return {
    banner: state.banner
  }
}

export default connect(
  mapStateToProps
)(Banner);
