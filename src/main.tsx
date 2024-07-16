import React from "react"
import ReactDOM from "react-dom/client"
import Auth from "./Auth.tsx"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Auth />
  </React.StrictMode>
)