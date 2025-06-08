import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"
import { getUserInfo } from "../../services/authService.ts"

interface ProtectedRouteProps {
    children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await getUserInfo()
                if (response.success) {
                    setIsAuthenticated(true)
                } else {
                    setIsAuthenticated(false)
                }
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
            } catch (error) {
                setIsAuthenticated(false)
            }
        }
        checkAuth()
    }, [])

    if (isAuthenticated === null) {
        return null
    }

    if (!isAuthenticated) {
        return <Navigate to="/" replace />
    }

    return <>{children}</>
}

export default ProtectedRoute
