import React, { useCallback, useMemo, useState } from 'react'
import Config from 'react-native-config'
import { useTranslation } from 'react-i18next'
import Toast from 'react-native-simple-toast'
import { Linking } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import Text from '../../../components/Text'
import { getAddress } from '../../../utils/secureAccount'
import useMount from '../../../utils/useMount'
import SafeAreaBox from '../../../components/SafeAreaBox'

const StartScreen = () => {
  const { t } = useTranslation()
  const [address, setAddress] = useState<string>()

  useMount(() => {
    getAddress().then(setAddress)
  })

  const urlToMaker = useMemo(() => {
    return Config.ONBOARD_URL.replace(/WALLET/, address || '')
  }, [address])

  const openMakerUrl = useCallback(
    (url: string) => async () => {
      const supported = await Linking.canOpenURL(url)
      if (supported) {
        await Linking.openURL(url)
      } else {
        Toast.showWithGravity(
          t('gatewayOnboarding.startScreen.openLinkError', { url }),
          Toast.LONG,
          Toast.CENTER,
        )
      }
    },
    [t],
  )

  return (
    <SafeAreaBox
      flex={1}
      backgroundColor="primaryBackground"
      paddingHorizontal="m"
      paddingBottom="m"
    >
      <Text variant="h1" marginBottom="l">
        {t('gatewayOnboarding.startScreen.title')}
      </Text>

      <TouchableOpacity onPress={openMakerUrl(urlToMaker)}>
        <Text color="linkText">{urlToMaker}</Text>
      </TouchableOpacity>
    </SafeAreaBox>
  )
}

export default StartScreen
