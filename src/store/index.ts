import { type Store, applyMiddleware, combineReducers, compose, legacy_createStore as createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// 中间件
import reduxThunk from 'redux-thunk'
import reduxPromise from 'redux-promise'

import system from './modules/system/reducer'
import auth from './modules/auth/reducer'
import menu from './modules/menu/reducer'

const reducer = combineReducers({
  system,
  auth,
  menu
})

// redux 持久化配置
const persistConfig = {
  key: 'redux-state',
  storage: storage
}

const persistReducerConfig = persistReducer(persistConfig, reducer)

// 开启 redux-devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// 使用 redux 中间件
const middleWares = applyMiddleware(reduxThunk, reduxPromise)

// 创建 store: 持久化储存 & 中间件
const store: Store = createStore(persistReducerConfig, composeEnhancers(middleWares))

// 创建持久化 store   需要提供给 main.tsx
const persistor = persistStore(store)

export { store, persistor }
