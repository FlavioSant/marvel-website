import { useContext } from 'react';
import { ExceptionContext } from '../context/ExceptionContext';

export const useException = () => useContext(ExceptionContext);
