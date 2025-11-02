import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { TaskProvider } from './context/TaskContext'
import { ThemeProvider } from './context/ThemeContext'
import { ToasterProvider } from './context/ToasterContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TaskProvider>
      <ThemeProvider>
        <ToasterProvider>
          <App />
        </ToasterProvider>
      </ThemeProvider>
    </TaskProvider>
  </StrictMode>
)
