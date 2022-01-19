import React, { memo, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useSelector } from 'react-redux'
import changeNavigationBarColor from 'react-native-navigation-bar-color'

import { RootState } from '../store/rootReducer'
import LockScreen from '../features/lock/LockScreen'
import GatewayOnboardingNavigator from './GatewayOnboardingNavigator'
import MainTabs from './main/MainTabNavigator'
import { useColors } from '../theme/themeHooks'
import WelcomeScreen from '../features/notSignedIn/WelcomeScreen'
import CreatePinScreen from '../features/pinManagement/CreatePinScreen'
import ConfirmPinScreen from '../features/pinManagement/ConfirmPinScreen'
import { RootStackParamList } from './navigationRootTypes'
import useDefaultScreenOptions from './useDefaultScreenOptions'

const Stack = createStackNavigator<RootStackParamList>()

const NavigationRoot = () => {
  const { walletLinkToken } = useSelector((state: RootState) => state.app)
  const colors = useColors()
  const defaultScreenOptions = useDefaultScreenOptions()

  useEffect(() => {
    changeNavigationBarColor(colors.primaryText, true, false)
  }, [colors.primaryText])

  const notSignedIn = !walletLinkToken

  return (
    <Stack.Navigator>
      {notSignedIn ? (
        <Stack.Group
          screenOptions={{
            ...defaultScreenOptions,
            gestureEnabled: false,
            title: '',
          }}
        >
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        </Stack.Group>
      ) : (
        <Stack.Group
          screenOptions={{ gestureEnabled: false, headerShown: false }}
        >
          <Stack.Screen name="MainTabs" component={MainTabs} />

          <Stack.Screen
            name="GatewayOnboarding"
            component={GatewayOnboardingNavigator}
          />

          <Stack.Screen name="CreatePinScreen" component={CreatePinScreen} />
          <Stack.Screen name="ConfirmPinScreen" component={ConfirmPinScreen} />

          <Stack.Screen name="LockScreen" component={LockScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  )
}

export default memo(NavigationRoot)
