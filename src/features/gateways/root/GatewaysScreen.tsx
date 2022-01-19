import React, { memo, useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Config from 'react-native-config'
import Toast from 'react-native-simple-toast'
import { Linking } from 'react-native'

import { getAddress } from '../../../utils/secureAccount'
import { Button } from '../../../components/Button'
import SafeAreaBox from '../../../components/SafeAreaBox'
import Box from '../../../components/Box'

const GatewaysScreen = () => {
  const { t } = useTranslation()

  const [address, setAddress] = useState<string>()

  useEffect(() => {
    getAddress().then(setAddress)
  }, [])

  const openOnboardingSite = useCallback(async () => {
    if (!address) return

    const url = Config.ONBOARD_URL.replace(/WALLET/, address)

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
  }, [t, address])

  return (
    <SafeAreaBox
      flex={1}
      backgroundColor="primaryBackground"
      paddingHorizontal="m"
      paddingBottom="m"
    >
      <Box flex={1} />

      <Button
        title={t('gatewaysScreen.addBtn')}
        onPress={openOnboardingSite}
        color="primary"
      />
    </SafeAreaBox>
  )
}

export default memo(GatewaysScreen)
