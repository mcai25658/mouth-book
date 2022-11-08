import { nanoid } from 'nanoid';
import create from 'zustand';

export type HttpError = {
  id: string;
  message: string;
};

type HttpErrorStore = {
  httpErrors: HttpError[];
  addHttpError: (httpError: Omit<HttpError, 'id'>) => void;
  dismissHttpError: (id: string) => void;
};

export const useHttpErrorStore = create<HttpErrorStore>((set) => ({
  httpErrors: [],

  addHttpError: (httpError) =>
    set((state) => ({
      httpErrors: [{ id: nanoid(), ...httpError }, ...state.httpErrors],
    })),

  dismissHttpError: (id) =>
    set((state) => ({
      httpErrors: state.httpErrors.filter((httpError) => httpError.id !== id),
    })),
}));
