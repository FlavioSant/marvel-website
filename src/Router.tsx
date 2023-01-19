import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Characters } from './pages/Characters/Characters';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Characters />} />
      </Routes>
    </BrowserRouter>
  );
};
