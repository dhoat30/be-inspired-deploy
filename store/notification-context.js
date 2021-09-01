import { createContext } from 'react'

const NotificationContext = createContext({
    notification: null,
    showNotification: function () { },
    hideNotification: function () { }
})

function NotificationContextProvider() {
    return (<NotificationContext.Provider>
        {props.children}
    </NotificationContext.Provider>)
}

export default NotificationContext