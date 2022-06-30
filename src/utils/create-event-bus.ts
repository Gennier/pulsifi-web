import { Callback } from './fn-lib';

/**
 * create a pub-sub event bus.
 */
export const createEventBus = <Data extends any[] = never[]>() => {
  const listeners: Array<Callback<Data>> = [];

  return {
    listen: (listener: Callback<Data>) => {
      listeners.push(listener);
      return function unsubscribe() {
        listeners.splice(listeners.indexOf(listener), 1);
      };
    },
    emit: (...args: Data) => listeners.forEach((l) => l(...args)),
  };
};
