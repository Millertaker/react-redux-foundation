import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component{
  render() {
    return (
      <ul className="menu">
        <li><NavLink exact activeClassName="is-active" to="/">Home</NavLink></li>
        <li><NavLink activeClassName="is-active" to="about">About</NavLink></li>
        <li><NavLink activeClassName="is-active" to="lol">Non exist</NavLink></li>
      </ul>
    )
  }
}

export default Header
