import React, { useEffect } from 'react';
import './App.css';
import { Switch, Route, Redirect, BrowserRouter as Router } from 'react-router-dom';

import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';

import { useDispatch, useSelector } from 'react-redux';


function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    let unsubscribeFromAuth = null;
    unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapShot => {
          dispatch(setCurrentUser({ id: snapShot.id, ...snapShot.data() }));
        });
      }
      dispatch(setCurrentUser(userAuth));
    });
    return function cleanup() {
      unsubscribeFromAuth();
    };
  }, []);

  return (

    <Router>
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route path='/shop' component={ShopPage} />
          <Route path='/signIn' component={() => currentUser ? <Redirect to="/" /> : <SignInAndSignUpPage />} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
