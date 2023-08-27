'use client';
import './global.css';
import {ThemeProvider} from 'next-themes';


interface Props {
  children: React.ReactNode
}

export default function RootLayout({children}: Props) {


  return (
    <html>
      <head />
        <body> 
          <ThemeProvider enableSystem={true} attribute="class" defaultTheme='system'>
                      {children}
          </ThemeProvider>
        </body>
    </html>
  )
}
