import React,{useState, useEffect} from 'react'
import { useDispatch, useSelector, RootStateOrAny } from "react-redux";
    
function EmailTimer() {
  const [timeCount, setTimeCount] = useState<number>(179);
  
  useEffect(() => {
    const countdown = setInterval(() => {
        if (timeCount > 0) {
            setTimeCount(timeCount - 1);
          }else if (timeCount === 0) {
              clearInterval(countdown);
            
          }
        }, 1000);
        return () => clearInterval(countdown); //이게 없으면 인터벌이 여러개 돌아서 숫자가 이상해짐
  }, [timeCount]);


  return (
    <>
    {String(Math.floor(timeCount/60)).padStart(2,'0')}:{Math.floor(timeCount % 60) < 10 ? String(Math.floor(timeCount % 60)).padStart(2,'0') : String(Math.floor(timeCount % 60)).padEnd(2,'0')}
    </>
  )
}

export default EmailTimer