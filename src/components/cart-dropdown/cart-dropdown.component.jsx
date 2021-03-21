import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component'
import { selectCartItems } from '../../redux/cart/cart.selectors';
import { toggleCartHidden } from '../../redux/cart/cart.action.js';
import './cart-dropdown.styles.scss';

const CartDropdown = ({cartItems , history, dispatch}) => (
    <div className='cart-dropdown'>
      <div className='cart-items' >
      {cartItems.length?
      cartItems.map(cartItem => (
        <CartItem key={cartItem.id} item={cartItem} />
      ))
      :<spam className='empty-message'>Your cart is empty</spam>
      }
    </div>
    <CustomButton onClick={() => {
        history.push('/checkout');
        dispatch(toggleCartHidden());
      }}
      >
        GO TO CHECKOUT
        </CustomButton>
    </div>
  );
  
  // const mapStateToProps = ({ cart: { cartItems } }) => {
  //   console.log("CartDropdown mapStateToProps")
  //   return({
  //   cartItems
  // });}selectCartItems(state)


  const mapStateToProps = (state) => {
  console.log("CartDropdown mapStateToProps")
  return({
  cartItems:selectCartItems(state)
    });}
export default withRouter(connect(mapStateToProps)(CartDropdown));