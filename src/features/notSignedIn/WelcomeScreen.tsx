import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { WalletLink } from '@helium/react-native-sdk'
import { Linking, Platform } from 'react-native'
import { getBundleId } from 'react-native-device-info'
import Toast from 'react-native-simple-toast'

import { locale } from '../../i18n'
import Text from '../../components/Text'
import Box from '../../components/Box'
import { Button } from '../../components/Button'

const WelcomeScreen = () => {
  const { t } = useTranslation()

  const { delegateApps } = WalletLink
  const heliumApp: WalletLink.DelegateApp = delegateApps[0]

  const linkAccount = useCallback(() => {
    const url = WalletLink.createWalletLinkUrl({
      universalLink: heliumApp.universalLink,
      requestAppId: getBundleId(),
      callbackUrl: 'freedomfihelium://',
      appName: 'FreedomFi Helium App',
    })

    try {
      Linking.openURL(url)
    } catch {
      Toast.showWithGravity(
        t('gatewayOnboarding.startScreen.openLinkError', { url }),
        Toast.LONG,
        Toast.CENTER,
      )
    }
  }, [t, heliumApp])

  const createAccount = useCallback(() => {
    const url =
      Platform.OS === 'android'
        ? `market://details?id=${heliumApp.androidPackage}`
        : `https://apps.apple.com/${locale}/app/${heliumApp.name}/id${heliumApp.appStoreId}`

    try {
      Linking.openURL(url)
    } catch {
      Toast.showWithGravity(
        t('gatewayOnboarding.startScreen.openLinkError', { url }),
        Toast.LONG,
        Toast.CENTER,
      )
    }
  }, [t, heliumApp])

  return (
    <Box
      flex={1}
      backgroundColor="primaryBackground"
      paddingHorizontal="m"
      paddingBottom="m"
      alignItems="center"
    >
      <Text variant="h1">{t('welcomeScreen.title')}</Text>

      <Box flex={1} />

      <Button
        onPress={linkAccount}
        color="primary"
        fullWidth
        marginBottom="m"
        title={t('welcomeScreen.signIn')}
      />
      <Button
        color="secondary"
        fullWidth
        onPress={createAccount}
        title={t('welcomeScreen.createAccount')}
      />
    </Box>
  )
}

export default WelcomeScreen
