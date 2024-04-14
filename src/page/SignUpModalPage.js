import { useState } from "react";
import SignUpFormModal from "components/signup/SignUpFormModal";
import ModalBackground from "components/common/ModalBackground";
import SignUpCheckModel from "components/signup/SignUpCheckModel";

const SignUpModalPage = ({isOpen, handleSignModalOpen}) => {
    const [isCompletFormInput, setIsCompleteFormInput] = useState(false);
    const [singUpFormData, setSignUpFormData] = useState();

    const handleClose = () => {
        setIsCompleteFormInput(false);
        handleSignModalOpen(false);
    }

    const moveNextModal = (email, nickName, pw) => {
        setSignUpFormData({email:email, nickName:nickName, pw:pw});
        setIsCompleteFormInput(true);
    }

    return (
        <>
            {isOpen && <ModalBackground handleClose={handleClose}/>}
            {isOpen && !isCompletFormInput && <SignUpFormModal moveNextModal={moveNextModal}/>}
            {isOpen && isCompletFormInput && <SignUpCheckModel formData={singUpFormData}  handleClose={()=>handleSignModalOpen(false)}/>}
        </>
    )
}

export default SignUpModalPage;