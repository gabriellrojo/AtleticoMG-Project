import theme from "./theme";
import { ThemeProvider } from "styled-components"
import { createGlobalStyle } from "styled-components";
import Footer from "./components/Footer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Historia from "./pages/Historia";
import Titulos from "./pages/Titulos"
import Estrutura from "./pages/Estrutura";
import Elenco from "./pages/Elenco";
import Login from "./pages/Login";
import Register from "./pages/Register";

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
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/historia" element={<Historia/>}/>
          <Route path="/titulos" element={<Titulos/>}/>
          <Route path="/estrutura" element={<Estrutura/>}/>
          <Route path="/elenco" element={<Elenco/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
        </Routes>
        <Footer />
      </ThemeProvider>
      </BrowserRouter>
    </>
  );
}

export default App;