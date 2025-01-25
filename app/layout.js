import "./globals.css";
import Provider from "./Provider";


export default function RootLayout({ children }) {
  return ( 
    <html lang="en" suppressHydrationWarning>
      <body
      >
        <Provider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange>
        {children}
        </Provider>
      </body>
    </html>
  );
}
