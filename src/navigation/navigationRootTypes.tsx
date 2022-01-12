import { StackNavigationProp } from '@react-navigation/stack'
import { NavigatorScreenParams } from '@react-navigation/native'

import { HotspotSetupStackParamList } from './hotspotSetupNavigatorTypes'

export type LockScreenRequestType =
  | 'disablePin'
  | 'enablePinForPayments'
  | 'disablePinForPayments'
  | 'resetPin'
  | 'unlock'

export type RootStackParamList = {
  Welcome: undefined
  LinkAccount: undefined
  CreateAccount: undefined

  MainTabs: undefined | { pinVerifiedFor: LockScreenRequestType }
  LockScreen: {
    requestType: LockScreenRequestType
    lock?: boolean
  }
  HotspotSetup: NavigatorScreenParams<HotspotSetupStackParamList>

  CreatePinScreen: { pinReset?: boolean } | undefined
  ConfirmPinScreen: {
    pin: string
    pinReset?: boolean
  }
}

export type RootNavigationProp = StackNavigationProp<RootStackParamList>
