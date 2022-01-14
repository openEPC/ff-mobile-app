import React, { useCallback } from 'react'
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

import { Button } from '../components/Button'
import { RootNavigationProp } from './navigationRootTypes'
import useDefaultScreenOptions from './useDefaultScreenOptions'
import AskSetLocationScreen from '../features/gateways/onboarding/AskSetLocationScreen'
import HotspotSetupPickLocationScreen from '../features/gateways/onboarding/HotspotSetupPickLocationScreen'
import TxnProgressScreen from '../features/gateways/onboarding/TxnProgressScreen'
import HotspotSetupConfirmLocationScreen from '../features/gateways/onboarding/HotspotSetupConfirmLocationScreen'
import SkipLocationScreen from '../features/gateways/onboarding/SkipLocationScreen'
import AntennaSetupScreen from '../features/gateways/onboarding/AntennaSetupScreen'
import StartScreen from '../features/gateways/onboarding/StartScreen'
import TxnConfirmScreen from '../features/gateways/onboarding/TxnConfirmScreen'
import TxnSubmitedScreen from '../features/gateways/onboarding/TxnSubmitedScreen'
import { GatewayOnboardingStackParamList } from './gatewayOnboardingNavigatorTypes'

const Stack = createStackNavigator<GatewayOnboardingStackParamList>()

const GatewayOnboardingNavigator = () => {
  const { t } = useTranslation()
  const rootNavigation = useNavigation<RootNavigationProp>()

  const defaultScreenOptions = useDefaultScreenOptions()

  const handleCancel = useCallback(() => rootNavigation.navigate('MainTabs'), [
    rootNavigation,
  ])

  return (
    <Stack.Navigator
      screenOptions={({ route }) => {
        const options: StackNavigationOptions = {
          ...defaultScreenOptions,
          title: '',
        }

        const hideBackBtn = route.name === 'TxnSubmitedScreen'
        const hideCancelBtn = route.name === 'TxnProgressScreen' || hideBackBtn

        if (!hideCancelBtn) {
          options.headerRight = () => (
            <Button
              title={t('generic.cancel')}
              onPress={handleCancel}
              color="primary"
              size="small"
              variant="text"
              marginRight="m"
            />
          )
        }

        if (hideBackBtn) {
          options.headerLeft = () => null
        }

        return options
      }}
    >
      <Stack.Screen name="StartScreen" component={StartScreen} />
      <Stack.Screen name="TxnConfirmScreen" component={TxnConfirmScreen} />
      <Stack.Screen
        name="AskSetLocationScreen"
        component={AskSetLocationScreen}
      />
      <Stack.Screen
        name="HotspotSetupPickLocationScreen"
        component={HotspotSetupPickLocationScreen}
      />
      <Stack.Screen
        name="HotspotSetupConfirmLocationScreen"
        component={HotspotSetupConfirmLocationScreen}
      />
      <Stack.Screen name="AntennaSetupScreen" component={AntennaSetupScreen} />
      <Stack.Screen name="SkipLocationScreen" component={SkipLocationScreen} />
      <Stack.Screen
        name="TxnProgressScreen"
        component={TxnProgressScreen}
        options={{ gestureEnabled: false }}
      />
      <Stack.Screen name="TxnSubmitedScreen" component={TxnSubmitedScreen} />
    </Stack.Navigator>
  )
}

export default GatewayOnboardingNavigator
