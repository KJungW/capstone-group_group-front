import LoginFormModal from "components/login/LoginFormModal";
import ModalBackground from "components/common/ModalBackground";

const LoginModalPage = ({isOpen, handleLoginModalOpen}) => {

    const completeLogin = () => {
        handleLoginModalOpen(false);
        window.location.reload();
    }
    return (
        <>
           {isOpen && <ModalBackground handleClose={()=>handleLoginModalOpen(false)}/>}
           {isOpen && <LoginFormModal completeLogin={completeLogin}/>}
        </>
    )
}

export default LoginModalPage;