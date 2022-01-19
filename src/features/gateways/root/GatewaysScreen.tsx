import React, { memo, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

import { Button } from '../../../components/Button'
import { RootNavigationProp } from '../../../navigation/navigationRootTypes'
import SafeAreaBox from '../../../components/SafeAreaBox'
import Box from '../../../components/Box'

const GatewaysScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<RootNavigationProp>()

  const goToSetup = useCallback(
    () => navigation.push('GatewayOnboarding', { screen: 'StartScreen' }),
    [navigation],
  )

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
        onPress={goToSetup}
        color="primary"
      />
    </SafeAreaBox>
  )
}

export default memo(GatewaysScreen)
