import React from 'react';
import Home from './pages/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import NotFound from './pages/NotFound/NotFound';
import Cart from './pages/Cart/Cart';
import ProductId from './pages/ProductId/ProductId';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path={'product/:id'} element={<ProductId />} />
          <Route path={'/cart'} element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
