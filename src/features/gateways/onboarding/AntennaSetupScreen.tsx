import React, { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { KeyboardAvoidingView, StyleSheet } from 'react-native'

import Box from '../../../components/Box'
import SafeAreaBox from '../../../components/SafeAreaBox'
import Text from '../../../components/Text'
import { DebouncedButton } from '../../../components/Button'
import HotspotConfigurationPicker from '../../../components/HotspotConfigurationPicker'
import { Antenna, defaultAntenna } from '../../../types/Antenna'
import {
  GatewayOnboardingNavigationProp,
  GatewayOnboardingStackParamList,
} from '../../../navigation/gatewayOnboardingNavigatorTypes'

type Route = RouteProp<GatewayOnboardingStackParamList, 'AntennaSetupScreen'>

const AntennaSetupScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<GatewayOnboardingNavigationProp>()
  const { params } = useRoute<Route>()

  const [antenna, setAntenna] = useState<Antenna>(defaultAntenna)
  const [gain, setGain] = useState<number>(defaultAntenna.gain)
  const [elevation, setElevation] = useState<number>(0)

  const navNext = useCallback(async () => {
    if (!antenna) return

    navigation.navigate('HotspotSetupConfirmLocationScreen', {
      ...params,
      gain,
      elevation,
    })
  }, [antenna, elevation, gain, navigation, params])

  return (
    <SafeAreaBox
      flex={1}
      backgroundColor="primaryBackground"
      paddingHorizontal="m"
      paddingBottom="m"
    >
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior="padding"
      >
        <Box flex={1} justifyContent="center" paddingBottom="xxl">
          <Box>
            <Text
              variant="h1"
              marginBottom="s"
              marginTop="l"
              maxFontSizeMultiplier={1}
            >
              {t('antennas.onboarding.title')}
            </Text>
            <Text
              variant="subtitle2"
              numberOfLines={2}
              adjustsFontSizeToFit
              maxFontSizeMultiplier={1.3}
            >
              {t('antennas.onboarding.subtitle')}
            </Text>
          </Box>
          <HotspotConfigurationPicker
            selectedAntenna={antenna}
            onAntennaUpdated={setAntenna}
            onGainUpdated={setGain}
            onElevationUpdated={setElevation}
          />
        </Box>
      </KeyboardAvoidingView>
      <DebouncedButton
        title={t('generic.next')}
        onPress={navNext}
        color="primary"
      />
    </SafeAreaBox>
  )
}

const styles = StyleSheet.create({ keyboardAvoidingView: { flex: 1 } })

export default AntennaSetupScreen
