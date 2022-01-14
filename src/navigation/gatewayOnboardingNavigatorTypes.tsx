import { Onboarding } from '@helium/react-native-sdk'
import { StackNavigationProp } from '@react-navigation/stack'

export type GatewayOnboardingStackParamList = {
  StartScreen: undefined
  TxnConfirmScreen: {
    addGatewayTxn: string
  }
  AskSetLocationScreen: {
    addGatewayTxn?: string
    hotspotAddress: string
    onboardingRecord: Onboarding.OnboardingRecord
  }
  HotspotSetupPickLocationScreen: {
    addGatewayTxn?: string
    hotspotAddress: string
    onboardingRecord: Onboarding.OnboardingRecord
  }
  HotspotSetupConfirmLocationScreen: {
    addGatewayTxn?: string
    hotspotAddress: string
    onboardingRecord: Onboarding.OnboardingRecord
    elevation?: number
    gain?: number
    coords?: number[]
    locationName?: string
  }
  AntennaSetupScreen: {
    addGatewayTxn?: string
    hotspotAddress: string
    onboardingRecord: Onboarding.OnboardingRecord
    coords?: number[]
    locationName?: string
  }
  SkipLocationScreen: {
    addGatewayTxn?: string
    hotspotAddress: string
    onboardingRecord: Onboarding.OnboardingRecord
    elevation?: number
    gain?: number
  }
  TxnProgressScreen: {
    addGatewayTxn?: string
    hotspotAddress: string
    onboardingRecord: Onboarding.OnboardingRecord
    elevation?: number
    gain?: number
    coords?: number[]
    locationName?: string
  }
  TxnSubmitedScreen: {
    assertTxn?: string
    gatewayTxn?: string
  }
}

export type GatewayOnboardingNavigationProp = StackNavigationProp<GatewayOnboardingStackParamList>
