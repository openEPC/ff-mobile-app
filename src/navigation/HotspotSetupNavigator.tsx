import React, { useCallback } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

import Button from '../components/Button'
import HotspotSetupLocationInfoScreen from '../features/hotspots/setup/HotspotSetupLocationInfoScreen'
import HotspotSetupPickLocationScreen from '../features/hotspots/setup/HotspotSetupPickLocationScreen'
import HotspotTxnsProgressScreen from '../features/hotspots/setup/HotspotTxnsProgressScreen'
import HotspotSetupConfirmLocationScreen from '../features/hotspots/setup/HotspotSetupConfirmLocationScreen'
import HotspotSetupSkipLocationScreen from '../features/hotspots/setup/HotspotSetupSkipLocationScreen'
import AntennaSetupScreen from '../features/hotspots/setup/AntennaSetupScreen'
import HotspotSetupExternalScreen from '../features/hotspots/setup/HotspotSetupExternalScreen'
import HotspotSetupExternalConfirmScreen from '../features/hotspots/setup/HotspotSetupExternalConfirmScreen'
import HotspotTxnsSubmitScreen from '../features/hotspots/setup/HotspotTxnsSubmitScreen'
import { HotspotSetupStackParamList } from './hotspotSetupNavigatorTypes'
import { RootNavigationProp } from './navigationRootTypes'

const HotspotSetupStack = createStackNavigator<HotspotSetupStackParamList>()

const HotspotSetup = () => {
  const { t } = useTranslation()
  const rootNavigation = useNavigation<RootNavigationProp>()

  const handleCancel = useCallback(() => rootNavigation.navigate('MainTabs'), [
    rootNavigation,
  ])

  return (
    <HotspotSetupStack.Navigator
      screenOptions={({ route }) => {
        if (route.name === 'HotspotTxnsSubmitScreen') {
          return { headerShown: false }
        }

        return {
          title: '',
          headerRight: () => (
            <Button
              onPress={handleCancel}
              color="primary"
              title={t('generic.cancel')}
              height={26}
            />
          ),
        }
      }}
    >
      <HotspotSetupStack.Screen
        name="HotspotSetupExternalScreen"
        component={HotspotSetupExternalScreen}
      />
      <HotspotSetupStack.Screen
        name="HotspotSetupExternalConfirmScreen"
        component={HotspotSetupExternalConfirmScreen}
      />
      <HotspotSetupStack.Screen
        name="HotspotSetupLocationInfoScreen"
        component={HotspotSetupLocationInfoScreen}
      />
      <HotspotSetupStack.Screen
        name="HotspotSetupPickLocationScreen"
        component={HotspotSetupPickLocationScreen}
      />
      <HotspotSetupStack.Screen
        name="HotspotSetupConfirmLocationScreen"
        component={HotspotSetupConfirmLocationScreen}
      />
      <HotspotSetupStack.Screen
        name="AntennaSetupScreen"
        component={AntennaSetupScreen}
      />
      <HotspotSetupStack.Screen
        name="HotspotSetupSkipLocationScreen"
        component={HotspotSetupSkipLocationScreen}
      />
      <HotspotSetupStack.Screen
        name="HotspotTxnsProgressScreen"
        component={HotspotTxnsProgressScreen}
        options={{ gestureEnabled: false }}
      />
      <HotspotSetupStack.Screen
        name="HotspotTxnsSubmitScreen"
        component={HotspotTxnsSubmitScreen}
      />
    </HotspotSetupStack.Navigator>
  )
}

export default HotspotSetup
