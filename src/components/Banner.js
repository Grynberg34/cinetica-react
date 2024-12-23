import { connect } from 'react-redux';
import { store } from '../store';
import { GetBannerTexts } from '../actions';
import { Link } from "react-router-dom";
import Carousel from 'react-bootstrap/Carousel';
import "../scss/bannerhome.scss";

function Banner(props) {

  var banner = props.banner;

  var mobile = props.mobile;

  if (banner === null) {
    store.dispatch(GetBannerTexts())

    return (
      <div></div>
    )
  } else {

    return (
      <Carousel id="bannerhome" autoPlay={true} interval={5000} controls={false} indicators={false} pause={false}>

        { banner.map( (text, index) => 

          <Carousel.Item key={text.id} className="banner">

            <Link  to={`/texto/${text.id}`}>

              <div className="banner__item">

                <div className={mobile === false?'banner__item__img kenburns-bottom':'banner__item__img bg-pan-right'} style={{backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.4) 0%,rgba(0,0,0,0.4) 100%), url('https://cinetica.nyc3.digitaloceanspaces.com/Trabalhos/Cin%C3%A9tica/Imagens/${text.imagem}')`}}></div>

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
    banner: state.banner,
    mobile: state.mobile
  }
}

export default connect(
  mapStateToProps
)(Banner);
