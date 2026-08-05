// Theme context for dark/light mode
import { createContext, useContext, useState } from 'react'

export const ThemeCtx = createContext()

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(false)
  return (
    <ThemeCtx.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      <div className={dark ? 'theme-dark' : 'theme-light'} style={{ width:'100%', minHeight:'100vh', display:'flex', flexDirection:'column' }}>
        {children}
      </div>
    </ThemeCtx.Provider>
  )
}

export const useTheme = () => useContext(ThemeCtx)
