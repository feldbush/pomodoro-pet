import style from './button.module.css';
import classnames from 'classnames/bind';

const cx = classnames.bind(style);

type Props = {
    text: string
    onClick?: () => {} | void,
    disabled?: boolean
}

export const Button = (props: Props) => {
    const {
        text,
        onClick = () => {},
        disabled
    } = props;

    return (
        <button className={cx('btn')} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    )
}
