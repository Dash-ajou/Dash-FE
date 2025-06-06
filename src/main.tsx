import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"
import { Provider } from "react-redux"
import { store } from "./store/store.ts"
import { GoogleOAuthProvider } from "@react-oauth/google"

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
                    <App />
                </GoogleOAuthProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
)
