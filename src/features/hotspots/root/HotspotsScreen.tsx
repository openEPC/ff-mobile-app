import React, { memo, useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'
import AddIcon from '@assets/images/add.svg'
import { Linking } from 'react-native'
import { useAsync } from 'react-async-hook'

import Text from '../../../components/Text'
import Button from '../../../components/Button'
import { RootNavigationProp } from '../../../navigation/navigationRootTypes'
import { EXPLORER_BASE_URL } from '../../../utils/config'
import { getAddress } from '../../../utils/secureAccount'
import SafeAreaBox from '../../../components/SafeAreaBox'

const HotspotsScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<RootNavigationProp>()
  const [accountB58, setAccountB58] = useState('')

  useAsync(async () => {
    const account = await getAddress()
    setAccountB58(account?.b58 || '')
  }, [])

  const goToSetup = useCallback(
    () =>
      navigation.push('HotspotSetup', { screen: 'HotspotSetupExternalScreen' }),
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
      paddingHorizontal="l"
    >
      <Button
        onPress={goToSetup}
        marginTop="l"
        mode="contained"
        title={t('hotspotsScreen.addBtn')}
        Icon={AddIcon}
      />
      <Text variant="body1" marginTop="l">
        {t('hotspotsScreen.viewActivity')}
        <Text variant="body1" color="primary" onPress={openExplorer}>
          {t('hotspotsScreen.explorer')}
        </Text>
        {t('generic.period')}
      </Text>
    </SafeAreaBox>
  )
}

export default memo(HotspotsScreen)
