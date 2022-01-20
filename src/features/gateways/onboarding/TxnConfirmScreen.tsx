import React, { useCallback, useEffect, useState } from 'react'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import { useTranslation } from 'react-i18next'
import { ActivityIndicator } from 'react-native'
import { AddGateway, Onboarding } from '@helium/react-native-sdk'

import Text from '../../../components/Text'
import animateTransition from '../../../utils/animateTransition'
import { DebouncedButton } from '../../../components/Button'
import { getAddress } from '../../../utils/secureAccount'
import useMount from '../../../utils/useMount'
import Box from '../../../components/Box'
import {
  GatewayOnboardingNavigationProp,
  GatewayOnboardingStackParamList,
} from '../../../navigation/gatewayOnboardingNavigatorTypes'

type Route = RouteProp<GatewayOnboardingStackParamList, 'TxnConfirmScreen'>

const TxnConfirmScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<GatewayOnboardingNavigationProp>()
  const [address, setAddress] = useState<string>()
  const [publicKey, setPublicKey] = useState('')
  const [macAddress, setMacAddress] = useState('')
  const [ownerAddress, setOwnerAddress] = useState('')
  const [
    onboardingRecord,
    setOnboardingRecord,
  ] = useState<Onboarding.OnboardingRecord>()

  useMount(() => {
    getAddress().then(setAddress)
  })

  useEffect(() => {
    if (!publicKey) return

    const getRecord = async () => {
      const record = await Onboarding.getOnboardingRecord(publicKey)
      animateTransition('TxnConfirmScreen.GetMac')
      setMacAddress(record.macEth0 || t('generic.unknown'))
      setOnboardingRecord(record)
    }
    getRecord()
  }, [publicKey, t])

  useEffect(() => {
    if (!params.addGatewayTxn) return

    const addGatewayTxn = AddGateway.txnFromString(params.addGatewayTxn)

    setPublicKey(addGatewayTxn.gateway?.b58 || '')
    setOwnerAddress(addGatewayTxn.owner?.b58 || '')
  }, [params])

  const navNext = useCallback(() => {
    if (!onboardingRecord) return
    navigation.push('AskSetLocationScreen', {
      addGatewayTxn: params.addGatewayTxn,
      hotspotAddress: publicKey,
      onboardingRecord,
    })
  }, [navigation, onboardingRecord, params, publicKey])

  return (
    <Box
      flex={1}
      backgroundColor="primaryBackground"
      paddingHorizontal="m"
      paddingBottom="m"
    >
      <Text
        variant="h1"
        marginBottom="l"
        numberOfLines={1}
        adjustsFontSizeToFit
      >
        {t('gatewayOnboarding.txnConfirmScreen.title')}
      </Text>

      <Box
        backgroundColor="secondaryBackground"
        padding="m"
        borderTopLeftRadius="s"
        borderTopRightRadius="s"
        justifyContent="center"
      >
        <Text variant="body1">
          {t('gatewayOnboarding.txnConfirmScreen.publicKey')}
        </Text>
        <Text
          variant="body1"
          marginTop="xs"
          numberOfLines={2}
          adjustsFontSizeToFit
        >
          {publicKey}
        </Text>
      </Box>

      <Box
        backgroundColor="secondaryBackground"
        padding="m"
        marginTop="xs"
        justifyContent="center"
      >
        <Text variant="body1">
          {t('gatewayOnboarding.txnConfirmScreen.macAddress')}
        </Text>
        {macAddress ? (
          <Text variant="body1" marginTop="xs">
            {macAddress}
          </Text>
        ) : (
          <Box marginTop="s">
            <ActivityIndicator color="white" />
          </Box>
        )}
      </Box>

      <Box
        backgroundColor="secondaryBackground"
        padding="m"
        borderBottomLeftRadius="s"
        borderBottomRightRadius="s"
        marginTop="xs"
        justifyContent="center"
      >
        <Text variant="body1">
          {t('gatewayOnboarding.txnConfirmScreen.ownerAddress')}
        </Text>
        <Text
          variant="body1"
          marginTop="xs"
          numberOfLines={2}
          adjustsFontSizeToFit
        >
          {ownerAddress}
        </Text>
      </Box>

      <Box flex={1} />

      <DebouncedButton
        title={t('generic.next')}
        color="primary"
        onPress={navNext}
        disabled={ownerAddress !== address}
      />
    </Box>
  )
}

export default TxnConfirmScreen
