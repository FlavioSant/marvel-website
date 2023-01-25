import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ScrollToTopWrapper } from './components/ScrollToTopWrapper';

import { Character } from './pages/Characters/Character';
import { Characters } from './pages/Characters/Characters';
import { CharacterComics } from './pages/Characters/CharacterComics';
import { Comics } from './pages/Comics/Comics';
import { Comic } from './pages/Comics/Comic';
import { Creators } from './pages/Creators/Creators';
import { Creator } from './pages/Creators/Creator';
import { CreatorComics } from './pages/Creators/CreatorComics';

export const Router = () => {
  return (
    <BrowserRouter>
      <ScrollToTopWrapper>
        <Routes>
          <Route path="/" element={<Characters />} />
          <Route path="/characters/:id" element={<Character />} />
          <Route path="/characters/:id/comics" element={<CharacterComics />} />
          <Route path="/comics" element={<Comics />} />
          <Route path="/comics/:id" element={<Comic />} />
          <Route path="/creators" element={<Creators />} />
          <Route path="/creators/:id" element={<Creator />} />
          <Route path="/creators/:id/comics" element={<CreatorComics />} />
        </Routes>
      </ScrollToTopWrapper>
    </BrowserRouter>
  );
};
