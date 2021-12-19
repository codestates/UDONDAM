import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
    
function EmailTimer() {
  const [timeCount, setTimeCount] = useState<number>(179);
  const [timeout, setTimeout] = useState<boolean>(false)
  
  useEffect(() => {
    const countdown = setInterval(() => {
        if (timeCount > 0) {
            setTimeCount(timeCount - 1);
          }else if (timeCount === 0) {
              clearInterval(countdown);
              setTimeout(true)
              setTimeCount(179)
          }
        }, 1000);
        return () => {
          clearInterval(countdown)}; //이게 없으면 인터벌이 여러개 돌아서 숫자가 이상해짐
  }, [timeCount]);

  const retry = function(){
    setTimeCount(179)
    setTimeout(false)
    const countdown = setInterval(() => {
      if (timeCount > 0) {
          setTimeCount(timeCount - 1);
        }else if (timeCount === 0) {
            clearInterval(countdown);
            setTimeout(true)
        }
      }, 1000);
      return () => clearInterval(countdown);
  }

  return (
    timeout ? 
    <div onClick={retry}>재시도</div> 
    :
    <>{String(Math.floor(timeCount/60)).padStart(2,'0')}:{Math.floor(timeCount % 60) < 10 ? String(Math.floor(timeCount % 60)).padStart(2,'0') : String(Math.floor(timeCount % 60)).padEnd(2,'0')}</>
  )
}

export default EmailTimer