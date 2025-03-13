import { root } from '@lynx-js/react';
import { MemoryRouter, Routes, Route } from 'react-router';

import { App } from './App.jsx';
import PokemonList from './components/PokemonList.tsx';
import Todo from './components/Todo.tsx';
import Storage from './components/Storage.tsx';
import Scratchpad from './components/Scratchpad.tsx';
import DatePicker from './components/DatePicker.tsx';

root.render(
  <MemoryRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/pokemon" element={<PokemonList />} />
      <Route path="/todo" element={<Todo />} />
      <Route path="/storage" element={<Storage />} />
      <Route path="/date-picker" element={<DatePicker />} />
      <Route path="/scratchpad" element={<Scratchpad />} />
    </Routes>
  </MemoryRouter>,
);

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept();
}
