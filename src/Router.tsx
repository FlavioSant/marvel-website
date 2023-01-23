import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Character } from './pages/Characters/Character';
import { Characters } from './pages/Characters/Characters';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/characters/:id" element={<Character />} />
      </Routes>
    </BrowserRouter>
  );
};
