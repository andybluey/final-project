import React, { Component } from 'react';

class Search extends Component {
  constructor() {
    super();
    this.state= {
      text: ''
    };
  }

  updateSearch(e) {
    // console.log( e.currentTarget.value );
    this.setState({ // Explicit mutations
      text: e.currentTarget.value
    });
  }

  handleSubmit(e) {
    const searchQuery = this.state.text;
    this.context.router.push( `/users/${searchQuery}` );
  }

  render() {
    // console.log( this.state );
    return (
      <div className="instructions">
        <h2 className="github-name">About</h2>
        <p>Enter a Github username and check out their details via some d3 magic</p>
        <p>Three different charts display information about the users Github account</p>
        <input
          type="text"
          name="search"
          value= {this.state.text}
          onChange={ this.updateSearch.bind(this) }
          placeholder='Github Username' />

        <input
          type="submit"
          className="button-primary"
          onClick={this.handleSubmit.bind(this)}
          value={`Search for ${this.state.text}`} />

      </div>
    );
  }
}

Search.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default Search;
