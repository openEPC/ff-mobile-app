import './src/utils/polyfill'
import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider as ReduxProvider } from 'react-redux'
import App from './src/App'
import { name as appName } from './app.json'
import store from './src/store/store'
import LanguageProvider from './src/providers/LanguageProvider'

const render = () => {
  return (
    <LanguageProvider>
      <ReduxProvider store={store}>
        <App />
      </ReduxProvider>
    </LanguageProvider>
  )
}

AppRegistry.registerComponent(appName, () => render)
