import style from './dashboard.module.css';
import classnames from 'classnames/bind';
import {ReactComponent as Timer} from './timer.svg';
import {ReactComponent as Note} from './note.svg';
import {ReactComponent as Chart} from './chart.svg';
import {ReactComponent as User} from './user.svg';

import {SECTIONS} from '../../constants/constants';

const cx = classnames.bind(style);

type Props = {
    current: SECTIONS
}

export const Dashboard = (props: Props) => {

    const {
        current,
    } = props;

    return (
        <div className={cx('wrap')}>
            <nav className={style.container}>
                <a href="/" className={cx( 'navLink', {'active': (current === SECTIONS.TIMER ? true : false )} )}>
                    <Timer/>
                </a>
                <a href="/" className={cx( 'navLink', {'active': (current === SECTIONS.LIST ? true : false )} )}>
                    <Note/>
                </a>
                <a href="/" className={cx( 'navLink', {'active': (current === SECTIONS.STATISTICS ? true : false )} )}>
                    <Chart/>
                </a>
                <a href="/" className={cx( 'navLink', {'active': (current === SECTIONS.USER ? true : false )} )}>
                    <User/>
                </a>
            </nav>
        </div>
    )
}