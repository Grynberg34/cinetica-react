import { connect } from 'react-redux';
import { store } from '../store';
import { GetText } from '../actions';
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import "../scss/texto.scss";

function Biblioteca(props) {

  var biblioteca = props.biblioteca;

  if (biblioteca === null) {
    store.dispatch(GetText())

    return (
      <div></div>
    )
  } else {

    return (
      <div>

      </div>
    )

  }
  
}

function mapStateToProps(state) {
  return {
    biblioteca: state.biblioteca
  }
}

export default connect(
  mapStateToProps
)(Biblioteca);
