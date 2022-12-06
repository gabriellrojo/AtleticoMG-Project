import theme from "./theme";
import { ThemeProvider } from "styled-components"
import { createGlobalStyle } from "styled-components";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";

const GlobalStyle = createGlobalStyle`
  * {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  text-decoration: none;
  }
`

function App() {
  return (
    <>
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <h1>Olá React</h1>
        <Routes>
        </Routes>
        <Footer />
      </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
