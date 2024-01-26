import { PELADA_MANAGER_STATE } from '@/constants/localStorage';
import { MainReducerType, ReducerTypes } from '@/state';

export function setStorage(reducerName: ReducerTypes, result: unknown) {
  const currentLocalStorage = JSON.parse(
    localStorage.getItem(PELADA_MANAGER_STATE) || '{}'
  ) as MainReducerType; // '{}' returns undefined if localstorage it not found

  return localStorage.setItem(
    PELADA_MANAGER_STATE,
    JSON.stringify({ ...currentLocalStorage, [reducerName]: result })
  );
}
