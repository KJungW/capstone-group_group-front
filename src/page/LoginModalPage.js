import LoginFormModal from "components/login/LoginFormModal";
import ModalBackground from "components/common/ModalBackground";

const LoginModalPage = ({handleClose}) => {
    return (
        <>
            <ModalBackground handleClose={handleClose}/>
            <LoginFormModal handleClose={handleClose}/>
        </>
    )
}

export default LoginModalPage;