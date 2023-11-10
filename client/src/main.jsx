import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { persistor, store } from './redux/store.js'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
    <Toaster position="top-right" dir='ltr' expand 
    visibleToasts={9} offset='60px'
    toastOptions={{
      style: { background: '#121212', color:'white', border: 'black', },
      className:'bg-[#121212] text-white',
    }}
    />
    <App />
    </PersistGate>
  </Provider>,
)
