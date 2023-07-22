import Nav from './Component/NavBar.js';
import { Home } from './Component/Home.js';
import About from './Component/About.js';
import Contact from './Component/Contact.js';
import NotFoundMsg from './Component/Error404.js';
import ProductDetails from './Component/ProductDetails.js';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      
      <Nav />

      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFoundMsg />} />
        <Route path="product/:productId" element={<ProductDetails />} />


      </Routes>

    </>    
  );
}

export default App;