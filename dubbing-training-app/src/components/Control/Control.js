import './Control.scss'

const Control = (props) => {
    const {
        text,
        isDisabled,
        clickHandler,
        className,
    } = props;

    return (
        <li className='video-player__control'>
            <button
                type='button'
                className={`video-player__button ${className}`}
                onClick={clickHandler}
                disabled={isDisabled}
            >
                { text }
            </button>
        </li>
    )
}

export default Control;