import React,{useState, useEffect} from 'react';
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
import MainPage from './pages/MainPage';
import Footer from './pages/Footer';
import { useHistory } from 'react-router-dom';
import TimeLine from './pages/timeLine/TimeLine';
import './styles/App.css';
import { contains } from 'jquery';

function App() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [triger, setTriger] = useState<boolean>(false)

  const isMobile = () => { 
    try { //이건 주먹구구라 일단 이렇게 해둠. 테스트때는 터치가 안먹혀서 터치로 판단못함.
     if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)/* || window.innerWidth < 640*/){
    return true;
    }
      document.createEvent("TouchEvent"); //이건 실제 핸드폰만 됨. 터치이벤트 발생시켜서 터치 먹히면 핸드폰이라 판단
      return true; 
    } 
    catch (e) {
      
       return false; 
      } 
    };

    const introPage = function(){
      history.push('/Search')
    }

    isMobile()
    const isDeskTop = !useSelector((state: RootStateOrAny)=>state.IsMobileReducer.isMobile);
    // useEffect(()=>{
    //   if(isDeskTop === true){
    //     document.body.style.minWidth='639px'
    //   }
    // },[])

    dispatch(IsMobileHandler(isMobile()))
  //console.log(document.documentElement)
  //console.log(useSelector((state: RootStateOrAny)=>state.IsMobileReducer.isMobile))
  return (
    <>
    <div id = 'logo'>
      <div className='logo_nav_left'></div>
      <div className='logo_nav_center'>
        <div className='logo_nav_center_logo'>
    <img className='logo_nav' src="로고-우동담-Dark-글자만-배경o.png" alt="logo" onClick={introPage}/>
        </div>
      </div>
    <div className='logo_nav_right'>
      {!useSelector((state: RootStateOrAny)=>state.IsMobileReducer.isMobile)? <div id={isMobile() === false ? 'nav_bar_desktop' : 'nav_bar'}><Nav /></div> : null}
    </div>
    
    </div>
    <div id ='container'>
    {/* {!useSelector((state: RootStateOrAny)=>state.IsMobileReducer.isMobile)? <div id='nav_bar'><Nav /></div> : null} */}
    {/* 조건부렌더링이용:게스트/로그인 구분, 나오면 안되는창 구분 */}
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
      <Route path="/MainPage">
        <MainPage />
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
      <Route path="/TimeLine" component={TimeLine}>
      </Route>
    </Switch>
    
    </div>
    <div id='footer'>
    {useSelector((state: RootStateOrAny)=>state.IsMobileReducer.isMobile)? <div id={isMobile() === false ? 'nav_bar_desktop' : 'nav_bar'}><Nav /></div> : null}
    {!useSelector((state: RootStateOrAny)=>state.IsMobileReducer.isMobile)? <Footer /> : null}
    </div>
    </>
  );
}

export default App;
