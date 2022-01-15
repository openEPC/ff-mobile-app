import React, { useCallback, useEffect, useState } from 'react'
import { ActivityIndicator, ScrollView } from 'react-native'
import { useTranslation } from 'react-i18next'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import {
  Balance,
  DataCredits,
  Location,
  NetworkTokens,
  USDollars,
} from '@helium/react-native-sdk'
import type { Account } from '@helium/http'
import { useAsync } from 'react-async-hook'

import SafeAreaBox from '../../../components/SafeAreaBox'
import Box from '../../../components/Box'
import ImageBox from '../../../components/ImageBox'
import { DebouncedButton } from '../../../components/Button'
import Map from '../../../components/Map'
import Text from '../../../components/Text'
import { decimalSeparator, groupSeparator } from '../../../i18n'
import { getAddress } from '../../../utils/secureAccount'
import { getAccount } from '../../../utils/appDataClient'
import {
  GatewayOnboardingNavigationProp,
  GatewayOnboardingStackParamList,
} from '../../../navigation/gatewayOnboardingNavigatorTypes'

type Route = RouteProp<GatewayOnboardingStackParamList, 'ConfirmLocationScreen'>

const ConfirmLocationScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<GatewayOnboardingNavigationProp>()
  const [account, setAccount] = useState<Account>()
  const [ownerAddress, setOwnerAddress] = useState<string | null>(null)
  const [feeData, setFeeData] = useState<{
    isFree: boolean
    hasSufficientBalance: boolean
    remainingFreeAsserts: number
    totalStakingAmount: Balance<NetworkTokens>
    totalStakingAmountDC: Balance<DataCredits>
    totalStakingAmountUsd: Balance<USDollars>
  }>()
  const { params } = useRoute<Route>()
  const { onboardingRecord, elevation, gain, coords } = params

  useAsync(async () => {
    const address = await getAddress()
    if (!address) return
    setOwnerAddress(address)
  }, [])

  useEffect(() => {
    if (!ownerAddress) return
    getAccount(ownerAddress).then(setAccount)
  }, [ownerAddress])

  useEffect(() => {
    if (!onboardingRecord || !ownerAddress || !account?.balance) {
      return
    }

    Location.loadLocationFeeData({
      nonce: 0,
      accountIntegerBalance: account.balance.integerBalance,
      dataOnly: false,
      owner: ownerAddress,
      locationNonceLimit: onboardingRecord.maker.locationNonceLimit,
      makerAddress: onboardingRecord.maker.address,
    }).then(setFeeData)
  }, [onboardingRecord, ownerAddress, account])

  const navNext = useCallback(async () => {
    navigation.replace('TxnProgressScreen', params)
  }, [navigation, params])

  if (!feeData) {
    return (
      <SafeAreaBox
        flex={1}
        backgroundColor="primaryBackground"
        paddingHorizontal="m"
        paddingBottom="m"
      >
        <Box flex={1} justifyContent="center" paddingBottom="xxl">
          <ActivityIndicator color="#687A8C" />
        </Box>
      </SafeAreaBox>
    )
  }

  const { isFree, hasSufficientBalance, totalStakingAmount } = feeData

  return (
    <SafeAreaBox
      flex={1}
      backgroundColor="primaryBackground"
      paddingHorizontal="m"
      paddingBottom="m"
    >
      <ScrollView>
        <Box flex={1} paddingBottom="m">
          <Text variant="h1" marginBottom="s">
            {t('hotspot_setup.location_fee.title')}
          </Text>
          {isFree ? (
            <Text variant="subtitle1" marginBottom="s">
              {t('hotspot_setup.location_fee.subtitle_free')}
            </Text>
          ) : (
            <Text variant="subtitle1" marginBottom="s">
              {t('hotspot_setup.location_fee.subtitle_fee')}
            </Text>
          )}
          <Text
            variant="subtitle1"
            marginBottom="s"
            numberOfLines={2}
            adjustsFontSizeToFit
          >
            {t('hotspot_setup.location_fee.confirm_location')}
          </Text>
          <Box
            height={{ smallPhone: 140, phone: 200 }}
            borderRadius="l"
            overflow="hidden"
            marginBottom="s"
          >
            <Box flex={1}>
              <Map mapCenter={coords} zoomLevel={16} interactive={false} />
              <Box
                position="absolute"
                top="50%"
                left="50%"
                style={{ marginTop: -29, marginLeft: -25 / 2 }}
                width={25}
                height={29}
                justifyContent="flex-end"
                alignItems="center"
              >
                <ImageBox
                  source={require('../../../assets/images/map-pin.png')}
                  width={25}
                  height={29}
                />
              </Box>
            </Box>
            <Box padding="s" backgroundColor="secondaryBackground">
              <Text variant="body2" numberOfLines={1} adjustsFontSizeToFit>
                {params.locationName}
              </Text>
            </Box>
          </Box>

          <Box flexDirection="row" justifyContent="space-between" marginTop="s">
            <Text variant="body1" color="secondaryText">
              {t('hotspot_setup.location_fee.gain_label')}
            </Text>
            <Text variant="body1" color="primaryText">
              {t('hotspot_setup.location_fee.gain', { gain })}
            </Text>
          </Box>

          <Box flexDirection="row" justifyContent="space-between" marginTop="s">
            <Text variant="body1" color="secondaryText">
              {t('hotspot_setup.location_fee.elevation_label')}
            </Text>
            <Text variant="body1" color="primaryText">
              {t('hotspot_setup.location_fee.elevation', { count: elevation })}
            </Text>
          </Box>

          {!isFree && (
            <>
              <Box
                flexDirection="row"
                justifyContent="space-between"
                paddingTop="s"
                marginTop="s"
              >
                <Text variant="body1" color="secondaryText">
                  {t('hotspot_setup.location_fee.balance')}
                </Text>
                <Text
                  variant="body1"
                  color={hasSufficientBalance ? 'secondaryText' : 'error'}
                >
                  {account?.balance?.toString(2, {
                    groupSeparator,
                    decimalSeparator,
                  })}
                </Text>
              </Box>

              <Box
                flexDirection="row"
                justifyContent="space-between"
                marginTop="s"
              >
                <Text variant="body1" color="secondaryText">
                  {t('hotspot_setup.location_fee.fee')}
                </Text>
                <Text variant="body1" color="primaryText">
                  {totalStakingAmount.toString(2)}
                </Text>
              </Box>

              {!hasSufficientBalance && (
                <Box marginTop="s">
                  <Text variant="body2" color="error" textAlign="center">
                    {t('hotspot_setup.location_fee.no_funds')}
                  </Text>
                </Box>
              )}
            </>
          )}
        </Box>
      </ScrollView>
      <Box>
        <DebouncedButton
          title={
            isFree
              ? t('hotspot_setup.location_fee.next')
              : t('hotspot_setup.location_fee.fee_next')
          }
          color="primary"
          onPress={navNext}
          disabled={isFree ? false : !hasSufficientBalance}
        />
      </Box>
    </SafeAreaBox>
  )
}

export default ConfirmLocationScreen
