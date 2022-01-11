import React, { memo, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import changeNavigationBarColor from 'react-native-navigation-bar-color'

import { RootState } from '../store/rootReducer'
import LockScreen from '../features/lock/LockScreen'
import HotspotSetup from './HotspotSetupNavigator'
import MainTabs from './main/MainTabNavigator'
import { useColors } from '../theme/themeHooks'
import WelcomeScreen from '../features/notSignedIn/WelcomeScreen'
import LinkAccount from '../features/notSignedIn/LinkAccount'
import CreateAccount from '../features/notSignedIn/CreateAccount'
import { RootStackParamList } from './navigationRootTypes'

const Stack = createStackNavigator<RootStackParamList>()

// NonAuth
//  Welcome
//  LinkAcc
//  CreateAcc
// Auth
//  Lock
//  Tabs
//    Hotspots
//    More
//      Settings
//      CreatePin
//      ConfirmPin
//  HotspotSetup
//

const NavigationRoot = () => {
  const { walletLinkToken } = useSelector((state: RootState) => state.app)
  const colors = useColors()

  useEffect(() => {
    changeNavigationBarColor(colors.primaryBackground, true, false)
  }, [colors.primaryBackground])

  const notSignedIn = !walletLinkToken

  return (
    <Stack.Navigator>
      {notSignedIn ? (
        <Stack.Group screenOptions={{ gestureEnabled: false, title: '' }}>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="LinkAccount" component={LinkAccount} />
          <Stack.Screen name="CreateAccount" component={CreateAccount} />
        </Stack.Group>
      ) : (
        <Stack.Group screenOptions={{ headerShown: false }}>
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen
            name="HotspotSetup"
            component={HotspotSetup}
            options={{ gestureEnabled: false }}
          />
          <Stack.Screen name="LockScreen" component={LockScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  )
}

export default memo(NavigationRoot)
