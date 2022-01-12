import React from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { DebouncedButton } from '../../../components/Button'
import Text from '../../../components/Text'
import Box from '../../../components/Box'
import useGetLocation from '../../../utils/useGetLocation'
import {
  HotspotSetupNavigationProp,
  HotspotSetupStackParamList,
} from '../../../navigation/hotspotSetupNavigatorTypes'
import SafeAreaBox from '../../../components/SafeAreaBox'

type Route = RouteProp<
  HotspotSetupStackParamList,
  'HotspotSetupLocationInfoScreen'
>

const HotspotSetupLocationInfoScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<HotspotSetupNavigationProp>()
  const maybeGetLocation = useGetLocation()

  const checkLocationPermissions = async () => {
    await maybeGetLocation(true)
    navigation.navigate('HotspotSetupPickLocationScreen', params)
  }

  const skipLocationAssert = () => {
    navigation.navigate('HotspotSetupSkipLocationScreen', params)
  }

  return (
    <SafeAreaBox
      flex={1}
      backgroundColor="primaryBackground"
      paddingHorizontal="l"
    >
      <Text
        variant="h1"
        maxFontSizeMultiplier={1}
        numberOfLines={2}
        adjustsFontSizeToFit
      >
        {t('hotspot_setup.enable_location.title')}
      </Text>
      <Text
        variant="subtitle1"
        marginBottom="l"
        maxFontSizeMultiplier={1.1}
        numberOfLines={3}
        adjustsFontSizeToFit
      >
        {t('hotspot_setup.enable_location.subtitle')}
      </Text>
      <Text
        variant="body1"
        numberOfLines={2}
        adjustsFontSizeToFit
        maxFontSizeMultiplier={1.2}
      >
        {t('hotspot_setup.enable_location.p_1')}
      </Text>
      <Box flex={1} />
      <DebouncedButton
        onPress={checkLocationPermissions}
        variant="primary"
        mode="contained"
        title={t('hotspot_setup.enable_location.next')}
      />
      <DebouncedButton
        onPress={skipLocationAssert}
        variant="primary"
        mode="text"
        title={t('hotspot_setup.enable_location.cancel')}
      />
    </SafeAreaBox>
  )
}

export default HotspotSetupLocationInfoScreen
