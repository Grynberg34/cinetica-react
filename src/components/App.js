import { connect } from 'react-redux';
import { store } from '../store';
import { Navigate } from "react-router-dom";
import Header from './Header';
import "../scss/app.scss";

function App(props) {


  return (
    <div id="home">
      <div className="home">

        <Header></Header>

      </div>
    </div>
  )
  
}

function mapStateToProps(state) {
  return {

  }
}

export default connect(
  mapStateToProps
)(App);
