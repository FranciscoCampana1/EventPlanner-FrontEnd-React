import "./App.scss";
import { BrowserRouter } from "react-router-dom";
import { Footer, Header } from "./components";
import AppRouter from "./AppRouter";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <AppRouter />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
