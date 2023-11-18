import React from "react"
import ReactDOM from "react-dom/client"

import App from "./App"

import GlobalStyle from "./css/globalstyle"
import ResetStyle from "./css/resetstyle"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ResetStyle />
    <GlobalStyle />
    <App />
  </React.StrictMode>
)
