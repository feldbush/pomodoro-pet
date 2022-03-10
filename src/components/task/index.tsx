import style from './task.module.css';
import classnames from 'classnames/bind';

const cx = classnames.bind(style);

type Props = {
    name: string
    totalTime: number
    numberTimeSegments: number
    currentTimeSegments: number
    intervalSize: number
    isPlay: boolean
}

export const Task = (props: Props) => {
    const {
        name,
        totalTime,
        currentTimeSegments,
        numberTimeSegments,
        intervalSize,
        isPlay = false
    } = props;

    return (
     <div className={cx('task')}>
         <div className={cx('marker')}></div>

         <div className={cx('name')}>
            {name}
            <span>
                {totalTime} min
            </span>
         </div>

         <div className={cx('time')}>
            {currentTimeSegments}/{numberTimeSegments}
            <span>
                {intervalSize} min
            </span>
         </div>

         <button className={cx('btnPlay')}>
             {isPlay ? 'Pause' : 'Start'}
         </button>
     </div>   
    )
}
