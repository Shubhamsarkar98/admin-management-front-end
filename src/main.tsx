
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider, useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'
import { store, type AppDispatch, type RootState } from './redux/store.ts'
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
createRoot(document.getElementById('root')!).render(
  
   <Provider store={store}>
      <App />
    </Provider>,
 
)
