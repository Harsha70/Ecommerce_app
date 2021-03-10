import React from 'react';
import { Switch, Route } from 'react-router-dom'

import './App.css';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component'
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Header from './components/header/header.component'
import {auth, createUserProfileDocument} from './firebase/firebase.utils';

class App extends React.Component {
  constructor(){
    super();

    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount(){
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log("userAuth",userAuth)
      if (userAuth){
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser:{
              id: snapShot.id,
              ...snapShot.data() // we need to call .data inorder to see data
            }
            },()=> console.log("this.state signin", this.state));
            console.log("this.state signUp", this.state)
          })
      }else{
        this.setState({ currentUser:userAuth },()=> console.log("this.state signout", this.state))
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
        <Header currentUser={this.state.currentUser}/>
        <Switch>
          <Route exact path="/" component={HomePage}/>
          <Route path="/shop" component={ShopPage}/>    
          <Route path='/signin' component={SignInAndSignUpPage} /> 
        </Switch>
      </div>
    );
  }
}

export default App;
