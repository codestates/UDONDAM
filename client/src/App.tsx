import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Intro from './pages/Intro';
import Login from './pages/Login';
import Area from './pages/area/Area';
import Content from './pages/Content';
import Interest from './pages/Interest';
import Mypage from './pages/Mypage';
import Nav from './pages/Nav';
import Postcontent from './pages/Postcontent';
import Search from './pages/search/Search';
import Signup from './pages/Signup';
import Timeline from './pages/timeLine/TimeLine';
import Footer from './pages/Footer';


import './styles/App.css';

function App() {

  return (
    <>
    <Nav />{/* 조건부렌더링이용:게스트/로그인 구분, 나오면 안되는창 구분 */}
    <div id='container'>
    <Switch>
      <Route exact path="/">
        <Intro />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/Area" component={Area}>
      </Route>
      <Route path="/Content">
        <Content />
      </Route>
      <Route path="/Interest">
        <Interest />
      </Route>
      <Route path="/Mypage">
        <Mypage />
      </Route>
      <Route path="/Postcontent">
        <Postcontent />
      </Route>
      <Route path="/Search">
        <Search />
      </Route>
      <Route path="/Signup">
        <Signup />
      </Route>
      <Route path="/Timeline">
        <Timeline />
      </Route>
    </Switch>
    <Footer />
    </div>
    </>
  );
}

export default App;
