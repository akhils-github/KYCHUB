import { MainLayout } from "./layouts/Main.Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Products } from "./pages/Products";
import { Compare } from "./pages/Compare";
import { useState } from "react";

function App() {
  const [products, setProducts] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route
            index
            element={<Products products={products} setProducts={setProducts} />}
          />
          <Route
            path="compare"
            element={<Compare products={products} setProducts={setProducts} />}
          />
          {/* <Route path="/sign-in" element={<SignIn />} />
        <Route path="/succes" element={<SignIn />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
<div className="w-screen h-screen overflow-hidden">
  <MainLayout />;
</div>;
