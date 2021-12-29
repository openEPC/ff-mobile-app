import React, { useCallback, useMemo, useState } from 'react'
import Config from 'react-native-config'
import { useNavigation } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import Icon from '@assets/images/placeholder.svg'
import Toast from 'react-native-simple-toast'
import { Linking, ScrollView } from 'react-native'
import Clipboard from '@react-native-community/clipboard'
import { TouchableOpacity } from 'react-native-gesture-handler'
import BackScreen from '../../../components/BackScreen'
import Box from '../../../components/Box'
import Text from '../../../components/Text'
import { useColors, useBorderRadii } from '../../../theme/themeHooks'
import { getAddress } from '../../../utils/secureAccount'
import useHaptic from '../../../utils/useHaptic'
import { RootNavigationProp } from '../../../navigation/main/tabTypes'
import useMount from '../../../utils/useMount'

const HotspotSetupExternalScreen = () => {
  const { t } = useTranslation()
  const colors = useColors()
  const { xl } = useBorderRadii()
  const [address, setAddress] = useState<string>()
  const { triggerNotification } = useHaptic()
  const navigation = useNavigation<RootNavigationProp>()

  useMount(() => {
    getAddress().then(setAddress)
  })

  const handleClose = useCallback(() => navigation.navigate('MainTabs'), [
    navigation,
  ])

  const copyAddress = useCallback(() => {
    Clipboard.setString(address || '')
    triggerNotification('success')
    Toast.show(t('wallet.copiedToClipboard', { address }))
  }, [address, t, triggerNotification])

  const openMakerUrl = useCallback(
    (url: string) => async () => {
      const supported = await Linking.canOpenURL(url)
      if (supported) {
        await Linking.openURL(url)
      } else {
        Toast.showWithGravity(
          `Don't know how to open this URL: ${url}`,
          Toast.LONG,
          Toast.CENTER,
        )
      }
    },
    [],
  )

  const linkToMaker = useMemo(() => {
    const url = Config.ONBOARD_URL.replace(/WALLET/, address || '')
    return (
      <TouchableOpacity onPress={openMakerUrl(url)}>
        <Text
          fontSize={{ smallPhone: 15, phone: 19 }}
          color="primary"
          lineHeight={{ smallPhone: 20, phone: 26 }}
          maxFontSizeMultiplier={1}
          numberOfLines={1}
          marginVertical="m"
        >
          {url}
        </Text>
      </TouchableOpacity>
    )
  }, [address, openMakerUrl])

  const subtitle = useMemo(() => {
    const onboard = t('makerHotspot.web.externalOnboard', {
      returnObjects: true,
    })

    const isArray = Array.isArray(onboard)
    if (isArray && onboard.length) {
      return onboard[0]
    }
    if (!isArray) {
      return onboard
    }
    return ''
  }, [t])

  const additionalPhrases = useMemo(() => {
    const onboard = t('makerHotspot.web.externalOnboard', {
      returnObjects: true,
    })

    const isArray = Array.isArray(onboard)
    if (isArray && onboard.length > 1) {
      const [, ...rest] = onboard
      return rest
    }
  }, [t])

  const scrollViewStyle = useMemo(() => ({ borderRadius: xl }), [xl])

  return (
    <BackScreen
      backgroundColor="primaryBackground"
      paddingTop={{ smallPhone: 's', phone: 'lx' }}
      onClose={handleClose}
    >
      <ScrollView showsVerticalScrollIndicator={false} style={scrollViewStyle}>
        <Box
          height={52}
          width={52}
          backgroundColor="secondaryBackground"
          borderRadius="m"
          alignItems="center"
          justifyContent="center"
        >
          <Icon color={colors.primary} width={24} height={24} />
        </Box>
        <Text
          variant="h1"
          numberOfLines={1}
          lineHeight={{ smallPhone: 42, phone: 62 }}
          fontSize={{ smallPhone: 28, phone: 40 }}
          adjustsFontSizeToFit
          marginTop="s"
        >
          {t('hotspot_setup.external.webTitle')}
        </Text>
        <Text
          variant="subtitle1"
          fontSize={{ smallPhone: 15, phone: 19 }}
          lineHeight={{ smallPhone: 20, phone: 26 }}
          maxFontSizeMultiplier={1}
          marginTop={{ smallPhone: 's', phone: 'l' }}
          marginBottom={
            linkToMaker ? undefined : { smallPhone: 's', phone: 'l' }
          }
        >
          {subtitle}
        </Text>
        {linkToMaker}
        <Text
          variant="subtitle1"
          fontSize={{ smallPhone: 15, phone: 19 }}
          lineHeight={{ smallPhone: 20, phone: 26 }}
          maxFontSizeMultiplier={1}
        >
          {t('hotspot_setup.external.wallet_address')}
        </Text>
        <TouchableOpacity onPress={copyAddress}>
          <Text variant="body1" maxFontSizeMultiplier={1}>
            {address}
          </Text>
        </TouchableOpacity>

        {additionalPhrases &&
          additionalPhrases.map((phrase, idx) => (
            <Text
              // eslint-disable-next-line react/no-array-index-key
              key={idx}
              variant="subtitle1"
              fontSize={{ smallPhone: 15, phone: 19 }}
              lineHeight={{ smallPhone: 20, phone: 26 }}
              marginTop={{ smallPhone: 's', phone: 'l' }}
              maxFontSizeMultiplier={1}
            >
              {phrase}
            </Text>
          ))}
      </ScrollView>
    </BackScreen>
  )
}

export default HotspotSetupExternalScreen
