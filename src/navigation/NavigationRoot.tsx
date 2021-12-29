import React, { memo, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import changeNavigationBarColor from 'react-native-navigation-bar-color'
import Onboarding from '../features/onboarding/OnboardingNavigator'
import { RootState } from '../store/rootReducer'
import defaultScreenOptions from './defaultScreenOptions'
import HomeNav from './main/HomeNavigator'
import { useColors } from '../theme/themeHooks'

const Stack = createStackNavigator()

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
    <Stack.Navigator screenOptions={defaultScreenOptions}>
      {notSignedIn ? (
        <Stack.Screen
          name="Onboarding"
          component={Onboarding}
          options={{ gestureEnabled: false }}
        />
      ) : (
        <Stack.Screen name="MainTab" component={HomeNav} />
      )}
    </Stack.Navigator>
  )
}

export default memo(NavigationRoot)
