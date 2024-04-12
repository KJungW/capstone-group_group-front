import LoginFormModal from "components/login/LoginFormModal";
import ModalBackground from "components/common/ModalBackground";

const LoginModalPage = ({handleClose, completeLogin}) => {
    return (
        <>
            <ModalBackground handleClose={handleClose}/>
            <LoginFormModal completeLogin={completeLogin}/>
        </>
    )
}

export default LoginModalPage;