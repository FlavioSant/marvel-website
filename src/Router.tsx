import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Character } from './pages/Characters/Character';
import { Characters } from './pages/Characters/Characters';
import { CharacterComics } from './pages/Characters/CharacterComics';
import { Comics } from './pages/Comics/Comics';
import { Comic } from './pages/Comics/Comic';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Characters />} />
        <Route path="/characters/:id" element={<Character />} />
        <Route path="/characters/:id/comics" element={<CharacterComics />} />
        <Route path="/comics" element={<Comics />} />
        <Route path="/comics/:id" element={<Comic />} />
      </Routes>
    </BrowserRouter>
  );
};
