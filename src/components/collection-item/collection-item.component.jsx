import React from 'react'
import CustomButton from '../custom-button/custom-button.component';
import {connect} from 'react-redux'
import {addItem} from '../../redux/cart/cart.action';
import './collection-item.styles.scss'

const CollectionItem=({item, addItem})=> {
  // console.log("item1",item)
  const {name, price, imageUrl} = item;

  return(
    
  <div className='collection-item'>
    {/* {console.log("inside return addItem",addItem)} */}
    <div
      className='image'
      style={{
        backgroundImage: `url(${imageUrl})`
      }}
    />
    <div className='collection-footer'>
      <span className='name'>{name}</span>
      <span className='price'>{price}</span>
    </div>
    <CustomButton onClick={()=>addItem(item)} inverted>
        Add to cart
      </CustomButton>
  </div>
);
}

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
  
});


export default connect(
  null,
  mapDispatchToProps
  )(CollectionItem);