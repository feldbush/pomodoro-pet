import { useCallback, useEffect } from 'react';
import { Button } from '../button';
import { Timer } from '../timer';
import { useAppDispatch, useAppSelector } from '../../store/hooks/useDispatch';
import { init, pause, run, setDocumentTitle, setTimerId, stop, tick } from '../../store/reducers/timerReducer';
import classnames from 'classnames/bind';
import style from './main-screen.module.css';
import { TimeInterval } from '../../constants/constants';

const cx = classnames.bind(style);

export const MainScreen = () => {
    const dispatch = useAppDispatch();
    const isRun = useAppSelector(state => state.timerReducer.isRun);
    const time = useAppSelector(state => state.timerReducer.tillEnd);
    const intervalType = useAppSelector(state => state.timerReducer.currentIntervalType);
  
    useEffect(() => {
      dispatch(init());
    }, [dispatch]);

    useEffect(() => {
      setDocumentTitle(time, intervalType);
    }, [intervalType, time]);
    
    const handelStartTimer = useCallback(() => {
      dispatch(run());
  
      const tickTack = () => {
        dispatch(tick());
  
        const timeoutId : ReturnType<typeof setTimeout> = setTimeout(
          tickTack,
          1000
        );
        dispatch(setTimerId(timeoutId))
      }
      tickTack();
    }, [dispatch]);
  
    const handelPause = useCallback(() => {
      if (isRun) {
        dispatch(pause());
      } else {
        handelStartTimer();
      }
    }, [dispatch, handelStartTimer, isRun]);

    return (
        <div className={cx({'screen': true, break: intervalType === TimeInterval.BREAK || intervalType === TimeInterval.LONG_BREAK})}>

            <div className={cx({'timerWrap': true, break: intervalType === TimeInterval.BREAK})}>
                <Timer
                    time={time}
                />
            </div>

            <div className={cx('btnsWrap')}>
            <Button onClick={() => { dispatch(stop()) } } text='Stop' disabled={!isRun}/>

            {
                isRun ?
                <Button onClick={handelPause} text='Pause'/>
                    :
                <Button onClick={handelStartTimer} text='Start'/>
            }
            </div>

      </div>
    )
}
