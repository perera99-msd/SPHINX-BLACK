import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './styles/globals.css' // Ensures Tailwind loads
import { Provider } from 'react-redux' // Import Redux Provider
import { store } from './redux/store'   // Import your Store
import { BrowserRouter } from 'react-router-dom' // Import Router

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* App must be inside BrowserRouter because App uses useLocation() */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)