import styles from "styles/ModalBackground.module.css";
const ModalBackground = ({handleClose}) => {
   return <div className={styles.background} onClick={handleClose}></div>
}

export default ModalBackground;