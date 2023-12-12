import React from 'react'
import { Navigate } from 'react-router-dom'

const PrivateRouter = ({ children }: { children: any }) => {
    const { user } = JSON.parse(localStorage.getItem("user")! || "{}")
    if (!user || Object.keys(user).length === 0 || user?.id != 1)
        return <Navigate to="/signin" />
    return children
}

export default PrivateRouter