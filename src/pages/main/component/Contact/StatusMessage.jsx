import React, { useEffect } from 'react'
import './StatusMessage.css'

const StatusMessage = ({statusMessage}) => {

    return (
        <div className={`contact-status-message contact-status-message-${statusMessage.status}`}>{statusMessage.message}</div>
    )
}

export default StatusMessage