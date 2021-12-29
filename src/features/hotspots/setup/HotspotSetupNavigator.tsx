import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import defaultScreenOptions from '../../../navigation/defaultScreenOptions'
import HotspotSetupLocationInfoScreen from './HotspotSetupLocationInfoScreen'
import HotspotSetupPickLocationScreen from './HotspotSetupPickLocationScreen'
import HotspotTxnsProgressScreen from './HotspotTxnsProgressScreen'
import HotspotSetupConfirmLocationScreen from './HotspotSetupConfirmLocationScreen'
import HotspotSetupSkipLocationScreen from './HotspotSetupSkipLocationScreen'
import AntennaSetupScreen from './AntennaSetupScreen'
import HotspotSetupExternalScreen from './HotspotSetupExternalScreen'
import HotspotSetupExternalConfirmScreen from './HotspotSetupExternalConfirmScreen'
import HotspotTxnsSubmitScreen from './HotspotTxnsSubmitScreen'
import { HotspotSetupStackParamList } from './hotspotSetupTypes'

const HotspotSetupStack = createStackNavigator<HotspotSetupStackParamList>()

const HotspotSetup = () => {
  return (
    <HotspotSetupStack.Navigator screenOptions={{ ...defaultScreenOptions }}>
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
