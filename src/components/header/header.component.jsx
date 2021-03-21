import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';

import {auth} from '../../firebase/firebase.utils'
import CartIcon from '../cart-icon/cart-icon.component'
import CartDropdown from '../cart-dropdown/cart-dropdown.component'
import { ReactComponent as Logo } from '../../assets/crown.svg';

import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      <Logo className='logo' />
    </Link>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ):(
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
      <CartIcon/>
    </div>
    {hidden?null:<CartDropdown/>}
  </div>
);

// here state is a root reducer
const mapStateToProps = ({ user: { currentUser }, cart: { hidden } })=>({
  currentUser,
  hidden
})

// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser,     // i have not written selectCurrentUser in user.selectors.js
//   hidden: selectCartHidden  // i have not written selectCartHidden in user.selectors.js
// }); // for reselect check cart-icon.component and cart-dropdown.component

export default connect(mapStateToProps)(Header);
