import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments';
class Header extends Component {
  renderContent(){
    switch (this.props.auth) {
      case null:      //Auth in progress
        return;
      case false:     //User not login
        return <li><a href="auth/google">Login with Google</a></li>;
      default:        //User Login
        return [<li key="1"><Payments /></li>,
                <li key="3" style={{ margin: '0 10px' }}>Credits: {this.props.auth.credits}</li>,
                <li key="2"><a href="/api/logout">Logout</a></li>
              ]
    }
  }
  
  render() {
      console.log(this.props);
      return (
        <nav>
          <div className="nav-wrapper">
            <Link
            to={this.props.auth ? '/surveys' : '/'}
            className="left brand-logo">
              React App
            </Link>
            <ul class="right">
              {this.renderContent()}
            </ul>
          </div>
        </nav>
    );
  }
}
function mapStateToProps({ auth }){
  return { auth };
}
export default connect(mapStateToProps) (Header);
