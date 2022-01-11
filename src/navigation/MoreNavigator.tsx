import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import MoreScreen from '../features/moreTab/MoreScreen'
import AccountCreatePinScreen from '../features/moreTab/AccountCreatePinScreen'
import AccountConfirmPinScreen from '../features/moreTab/AccountConfirmPinScreen'
import { MoreStackParamList } from './moreNavigatorTypes'

const MoreStack = createStackNavigator<MoreStackParamList>()

const More = () => {
  return (
    <MoreStack.Navigator>
      <MoreStack.Screen name="MoreScreen" component={MoreScreen} />
      <MoreStack.Screen
        name="AccountCreatePinScreen"
        component={AccountCreatePinScreen}
      />
      <MoreStack.Screen
        name="AccountConfirmPinScreen"
        component={AccountConfirmPinScreen}
      />
    </MoreStack.Navigator>
  )
}

export default More
