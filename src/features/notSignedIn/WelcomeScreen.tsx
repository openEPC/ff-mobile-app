import React, { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigation } from '@react-navigation/native'

import Text from '../../components/Text'
import Box from '../../components/Box'
import SafeAreaBox from '../../components/SafeAreaBox'
import { Button } from '../../components/Button'
import { RootNavigationProp } from '../../navigation/navigationRootTypes'

const WelcomeScreen = () => {
  const { t } = useTranslation()
  const navigation = useNavigation<RootNavigationProp>()

  const createAccount = useCallback(() => navigation.push('CreateAccount'), [
    navigation,
  ])

  const importAccount = useCallback(() => navigation.push('LinkAccount'), [
    navigation,
  ])

  return (
    <SafeAreaBox
      flex={1}
      backgroundColor="primaryBackground"
      paddingHorizontal="m"
      paddingBottom="m"
      alignItems="center"
    >
      <Text variant="h1">{t('welcomeScreen.title')}</Text>

      <Box flex={1} />

      <Button
        onPress={importAccount}
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
    </SafeAreaBox>
  )
}

export default WelcomeScreen
