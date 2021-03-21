import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom'
import {connect} from 'react-redux';
 
import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component'
import CheckoutPage from './pages/checkout/checkout.component';

import {auth, createUserProfileDocument} from './firebase/firebase.utils';

import {setCurrentUser} from './redux/user/user.action'

class App extends React.Component {
  // constructor(){
  //   super();

  //   this.state = {
  //     currentUser: null
  //   };
  // }

  unsubscribeFromAuth = null;

  componentDidMount(){
    const {setCurrentUser} = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log("userAuth",userAuth)
      if (userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data() // we need to call .data inorder to see data
          },()=> console.log("this.state signin", this.state))            
            console.log("this.state signUp", this.state)
          })
      }else{
        setCurrentUser(userAuth,()=> console.log("this.state signout", this.state))
      }
    });
  }

  componentWillUnmount(){
    console.log("componentWillUnmount")
    this.unsubscribeFromAuth()
  }

  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/shop" component={ShopPage}/>   
          <Route exact path='/checkout' component={CheckoutPage} /> 
          <Route exact
                 path='/signin' 
                 render={()=>
                  this.props.currentUser ? (
                    <Redirect to='/' />
                  ): (<SignInAndSignUpPage/>)
                 } /> 
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = ({user}) => ({
  currentUser:user.currentUser
})
// import { createStructuredSelector } from 'reselect'; (Using reselect)
// const mapStateToProps = createStructuredSelector({
//   currentUser: selectCurrentUser
// });

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})
export default connect(mapStateToProps, mapDispatchToProps)(App);
