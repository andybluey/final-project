import React, { Component } from 'react';
import { Link } from 'react-router';

class Home extends Component {

  render() {
    return (
      <div>
        <div className="home">
          <img className="logo" src="../app/images/github-mark-logo.png" alt="github" />
          <h2>Animating Github</h2>
          <p>A visual representation of Githubs Users</p>
          <p>Made possible with the Github API and d3js</p>
          <p>
            <br/>
            <Link to ='/display' >
              <button>Enter</button>
            </ Link>
          </p>
        </div>
          <div className="footer-one">Inspired by <a href="https://github.audio/">Github Audio</a>
            <br/>Inspired by <a href="http://www.lucify.com/the-flow-towards-europe/">Lucify</a>
          </div>
          <div className="footer-two">Developed by <a href="https://github.com/andybluey">Andybluey</a>
          </div>
      </div>
    );
  }
}

Home.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Home;
