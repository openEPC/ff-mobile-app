import React, { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import { Linking } from 'react-native'
import { useAsync } from 'react-async-hook'

import Text from '../../../components/Text'
import { Button } from '../../../components/Button'
import { RootNavigationProp } from '../../../navigation/navigationRootTypes'
import { EXPLORER_BASE_URL } from '../../../utils/config'
import { getAddress } from '../../../utils/secureAccount'
import SafeAreaBox from '../../../components/SafeAreaBox'

const GatewaysScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<RootNavigationProp>()
  const [accountB58, setAccountB58] = useState('')

  useAsync(async () => {
    const account = await getAddress()
    setAccountB58(account?.b58 || '')
  }, [])

  const goToSetup = useCallback(
    () => navigation.push('GatewayOnboarding', { screen: 'StartScreen' }),
    [navigation],
  )

  const openExplorer = useCallback(
    () => Linking.openURL(`${EXPLORER_BASE_URL}/accounts/${accountB58}`),
    [accountB58],
  )

  return (
    <SafeAreaBox
      flex={1}
      backgroundColor="primaryBackground"
      paddingHorizontal="m"
      paddingBottom="m"
    >
      <Button
        title={t('gatewaysScreen.addBtn')}
        onPress={goToSetup}
        color="primary"
      />
      <Text variant="body1" marginTop="l">
        {t('gatewaysScreen.viewActivity')}
        <Text variant="body1" color="primary" onPress={openExplorer}>
          {t('gatewaysScreen.explorer')}
        </Text>
        {t('generic.period')}
      </Text>
    </SafeAreaBox>
  )
}

export default memo(GatewaysScreen)
