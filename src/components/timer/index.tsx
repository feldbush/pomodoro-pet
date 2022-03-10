import style from './timer.module.css'
import classnames from 'classnames/bind';
import dayjs from 'dayjs'

const cx = classnames.bind(style);

type Props = {
    time: string 
}

export const Timer = (props:Props) => {
    const {
        time
    } = props;

    return (
        <div className={cx('timer')}>
            <div className={cx('circle')}>
                <div className={cx('outer')}>
                    <div className={cx('inner')}>
                        <div className={cx('content')}>
                            {dayjs(time).format('mm:ss')}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
