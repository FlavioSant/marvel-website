import { createContext, PropsWithChildren, useState } from 'react';
import { ModalError } from '../components/modais/ModalError';
import { nanoid } from '../functions/nanoid';

export interface ExceptionProps {
  id: string;
  error: Error;
  seeDetails: boolean;
}

export interface ExceptionContextProps {
  exceptions: ExceptionProps[];
  createException: (error: Error) => void;
  deleteException: (error: Error) => void;
}

export const ExceptionContext = createContext<ExceptionContextProps>({
  exceptions: [],
  createException: () => {},
  deleteException: () => {},
});

export const ExceptionProvider = ({ children }: PropsWithChildren<{}>) => {
  const [exceptions, setExceptions] = useState<ExceptionProps[]>([]);

  const createException = (error: Error) =>
    setExceptions(exceptions => [
      ...exceptions,
      { id: nanoid(), error, seeDetails: false },
    ]);

  const deleteException = (error: Error) =>
    setExceptions(exceptions.filter(exception => exception.error !== error));

  return (
    <ExceptionContext.Provider
      value={{ exceptions, createException, deleteException }}
    >
      {exceptions.map(exception => (
        <ModalError
          key={exception.id}
          exception={exception}
          onClose={() => deleteException(exception.error)}
          onShowDetails={() => {
            const allExceptions = [...exceptions];

            const index = exceptions.findIndex(({ id }) => id === exception.id);

            allExceptions.splice(index, 1, {
              ...allExceptions[index],
              seeDetails: !allExceptions[index].seeDetails,
            });

            setExceptions(allExceptions);
          }}
        />
      ))}
      {children}
    </ExceptionContext.Provider>
  );
};
