import LoginFormModal from "components/login/LoginFormModal";
import ModalBackground from "components/common/ModalBackground";
import { useDispatch, useSelector } from "react-redux";
import { closeLoginModal } from "store/aboutStore";

const LoginModalPage = () => {
    const dispatch = useDispatch();
    const activeLoginModal = useSelector(state => state.activeLoginModal);

    const closeLoginModalPage = () => {
        dispatch(closeLoginModal());
    }

    // 로그인 완료 메서드
    const completeLogin = () => {
        closeLoginModalPage();
        window.location.reload();
    }

    return (
        <>
           {activeLoginModal && <ModalBackground handleClose={closeLoginModalPage}/>}
           {activeLoginModal && <LoginFormModal completeLogin={completeLogin}/>}
        </>
    )
}

export default LoginModalPage;