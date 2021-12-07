import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector, RootStateOrAny } from 'react-redux';
import { IsMobileHandler } from './redux/modules/IsMobile';
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
  const dispatch = useDispatch()
  console.log(navigator.userAgent)
  const isMobile = () => { 
    try { //이건 주먹구구라 일단 이렇게 해둠. 테스트때는 터치가 안먹혀서 터치로 판단못함.
     if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
    return true;
    }
      document.createEvent("TouchEvent"); //이건 실제 핸드폰만 됨. 터치이벤트 발생시켜서 터치 먹히면 핸드폰이라 판단
      return true; 
    } 
    catch (e) {
       return false; 
      } 
    };
    isMobile()
    dispatch(IsMobileHandler(isMobile()))
  console.log(document.documentElement)
  console.log(useSelector((state: RootStateOrAny)=>state.IsMobileReducer.isMobile))
  return (
    <>
    <div id = 'logo_nav_container'>
    <img className='logo_nav' src="로고-우동담-Dark-글자만-배경o.png" alt="logo" />
    {!useSelector((state: RootStateOrAny)=>state.IsMobileReducer.isMobile)? <Nav /> : null}
    </div>
    {/* 조건부렌더링이용:게스트/로그인 구분, 나오면 안되는창 구분 */}
    <div id ='container'>
    <Switch>
      <Route exact path="/">
        <Intro />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/Area" component={Area}>
      </Route>
      <Route path="/Content" component={Content}>
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
    {useSelector((state: RootStateOrAny)=>state.IsMobileReducer.isMobile)? <Nav /> : null}
    <Footer />
    </div>
    </>
  );
}

export default App;
