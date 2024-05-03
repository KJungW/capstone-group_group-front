import { useState } from "react";
import SignUpFormModal from "components/signup/SignUpFormModal";
import ModalBackground from "components/common/ModalBackground";
import SignUpCheckModel from "components/signup/SignUpCheckModel";
import { useDispatch, useSelector } from "react-redux";
import { closeSignupModal } from "store/aboutStore";

const SignUpModalPage = () => {
    const dispatch = useDispatch();
    const activeLoginModal = useSelector(state => state.activeSignupModal);
    const [isCompletFormInput, setIsCompleteFormInput] = useState(false);
    const [singUpFormData, setSignUpFormData] = useState();

    const handleClose = () => {
        setIsCompleteFormInput(false);
        dispatch(closeSignupModal());
    }

    const moveNextModal = (email, nickName, pw) => {
        setSignUpFormData({email:email, nickName:nickName, pw:pw});
        setIsCompleteFormInput(true);
    }

    return (
        <>
            {activeLoginModal && <ModalBackground handleClose={handleClose}/>}
            {activeLoginModal && !isCompletFormInput && <SignUpFormModal moveNextModal={moveNextModal}/>}
            {activeLoginModal && isCompletFormInput && <SignUpCheckModel formData={singUpFormData}  handleClose={handleClose}/>}
        </>
    )
}

export default SignUpModalPage;