import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Personagens } from './pages/Personagens';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Personagens />} />
      </Routes>
    </BrowserRouter>
  );
};
