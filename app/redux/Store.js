import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
 // defaults to localStorage for web
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Reducers} from './Reducer'
 
const persistConfig = {
  key: 'root',
  storage:AsyncStorage,
}
 
const persistedReducer = persistReducer(persistConfig, Reducers)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)

export const MainStorage= {
  store, persistor 
}