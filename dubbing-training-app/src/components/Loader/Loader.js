import styles from './Loader.module.scss'

const Loader = ({ message }) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.ldsRing}>
                <div/>
                <div/>
                <div/>
                <div/>
            </div>

            {
                message && (
                    <h3 className={styles.message}>{message}</h3>
                )
            }
        </div>
    )
}

export default Loader