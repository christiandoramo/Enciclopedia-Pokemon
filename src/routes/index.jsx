import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Info from "../pages/info";
import Home from "../pages/home";
import { PokemonProvider } from "../contexts";

const AppRoutes = () => (
  <Router>
    <PokemonProvider>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/info/:id" element={<Info />} />
      </Routes>
    </PokemonProvider>
  </Router>
);

export default AppRoutes;
