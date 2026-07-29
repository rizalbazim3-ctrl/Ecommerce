import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from "react-router-dom"
import { QueryClient,QueryClientProvider } from '@tanstack/react-query'
import {Toaster} from "sonner"
import {Store} from "./store/Store.js"
import {Provider} from "react-redux"

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store = {Store}>
      <QueryClientProvider client = {queryClient}>
      <BrowserRouter>
       <Toaster
          position="top-right"
          toastOptions={{
            classNames: {
              error: "bg-red-600 text-white border-red-700",
              success: "bg-green-600 text-white border-green-700",
            },
          }}
        />
        <App />
      </BrowserRouter>
    </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
