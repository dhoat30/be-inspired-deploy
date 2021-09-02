import React, { useContext } from 'react'
import Header from './Header/Header'
import Notification from './UI/Notifications/Notification'
import NotificationContext from '../store/notification-context'

function Layout(props) {
    const notificationCtx = useContext(NotificationContext)
    const activeNotification = notificationCtx.notification

    return (
        <div>
            <Header></Header>
            <main>{props.children}</main>
            {activeNotification ? <Notification title={activeNotification.title} message={activeNotification.message} status={activeNotification.status} /> : null}
        </div>
    )
}

export default Layout
