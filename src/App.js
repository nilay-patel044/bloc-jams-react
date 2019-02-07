import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing';
import Library from './components/Library';
import Album from './components/Album';

class App extends Component {
  render() {
    return (
      <div className="App">
      <header>
        <nav>
            <div className ="nav-link-main">
              <Link to='/'>Kaival Upasana</Link>
            </div>
            <div className ="nav-links">
              <Link to='/'>Home   </Link>
              <Link to='/library'>   Library </Link>
            </div>
        </nav>
      </header>
      <main>
        <Route exact path="/" component={Landing} />
        <Route path="/library" component={Library} />
        <Route path="/album/:slug" component={Album} />
      </main>
      </div>

    );
  }
}

export default App;
