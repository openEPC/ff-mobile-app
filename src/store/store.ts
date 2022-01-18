import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { useDispatch, useStore } from 'react-redux'
import rootReducer from './rootReducer'

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
    // TODO: The BigNumber type in some models is not serializable. Ignoring the warning for now.
  }),
})

export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export type AppStore = typeof store
export const useAppStore = () => useStore<AppStore>()

export default store
