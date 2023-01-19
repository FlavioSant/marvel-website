import { ExceptionProvider } from './context/ExceptionContext';
import { Router } from './Router';

import './styles/main.css';

export const App = () => {
  return (
    <ExceptionProvider>
      <Router />
    </ExceptionProvider>
  );
};
