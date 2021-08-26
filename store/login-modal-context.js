import { createContext, useState } from "react";

const LoginModalContext = createContext({
    modal: false,
    showModal: function () { },
    hideModal: function () { }
})

export function LoginModalContextProvider(props) {
    const [showModal, setShowModal] = useState(false)

    function showLoginModalHandler() {
        setShowModal(true)
    }
    function hideLoginModalHandler() {
        setShowModal(false)
    }

    const context = {
        modal: showModal,
        showModal: showLoginModalHandler,
        hideModal: hideLoginModalHandler
    }

    return <LoginModalContext.Provider value={context}>{props.children} </LoginModalContext.Provider>
}
export default LoginModalContext

