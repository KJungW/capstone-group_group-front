import { useState } from "react";
import SignUpFormModal from "components/signup/SignUpFormModal";
import ModalBackground from "components/common/ModalBackground";
import SignUpCheckModel from "components/signup/SignUpCheckModel";

const SignUpModalPage = ({handleClose}) => {
    
    const [singUpFormData, setSignUpFormData] = useState();
    const [isCompletFormInput, setIsCompleteFormInput] = useState(false);

    const moveNextModal = (email, nickName, pw) => {
        setSignUpFormData({email:email, nickName:nickName, pw:pw});
        setIsCompleteFormInput(true);
    }

    return (
        <>
            <ModalBackground handleClose={handleClose}/>
            {!isCompletFormInput && <SignUpFormModal moveNextModal={moveNextModal}/>}
            {isCompletFormInput && <SignUpCheckModel formData={singUpFormData}/>}
        </>
    )
}

export default SignUpModalPage;