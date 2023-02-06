import React, { useState } from 'react';
import { SearchContext } from './context/context';
import Home from './pages/Home/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import NotFound from './pages/NotFound/NotFound';
import Cart from './pages/Cart/Cart';

function App() {
  const [searchValue, setSearchValue] = useState<string>('');

  return (
    <SearchContext.Provider
      value={{
        searchValue,
        setSearchValue,
      }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path={'/cart'} element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SearchContext.Provider>
  );
}

export default App;
