import { Onboarding } from '@helium/react-native-sdk'
import { StackNavigationProp } from '@react-navigation/stack'

export type HotspotSetupStackParamList = {
  HotspotSetupExternalScreen: undefined
  HotspotSetupExternalConfirmScreen: {
    addGatewayTxn: string
  }
  HotspotSetupLocationInfoScreen: {
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
  HotspotSetupSkipLocationScreen: {
    addGatewayTxn?: string
    hotspotAddress: string
    onboardingRecord: Onboarding.OnboardingRecord
    elevation?: number
    gain?: number
  }
  HotspotTxnsProgressScreen: {
    addGatewayTxn?: string
    hotspotAddress: string
    onboardingRecord: Onboarding.OnboardingRecord
    elevation?: number
    gain?: number
    coords?: number[]
    locationName?: string
  }
  HotspotTxnsSubmitScreen: {
    assertTxn?: string
    gatewayTxn?: string
  }
}

export type HotspotSetupNavigationProp = StackNavigationProp<HotspotSetupStackParamList>
