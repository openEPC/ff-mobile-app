import React, { useEffect, memo, useMemo, useCallback } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import GatewaysScreen from '../../features/gateways/root/GatewaysScreen'
import SettingsScreen from '../../features/settings/SettingsScreen'
import { TabBarIconType, MainTabType } from './tabTypes'
import TabBarIcon from './TabBarIcon'
import { RootState } from '../../store/rootReducer'
import { useAppDispatch } from '../../store/store'
import appSlice from '../../store/user/appSlice'
import { RootNavigationProp } from '../navigationRootTypes'
import { MainTabParamList } from './mainTabNavigatorTypes'
import useDefaultScreenOptions from '../useDefaultScreenOptions'
import { useColors } from '../../theme/themeHooks'

const MainTab = createBottomTabNavigator<MainTabParamList>()

const MainTabs = () => {
  const rootNavigation = useNavigation<RootNavigationProp>()
  const {
    app: { isLocked, isSettingUpHotspot },
  } = useSelector((state: RootState) => state)
  const dispatch = useAppDispatch()

  const { primaryBackground } = useColors()
  const defaultScreenOptions = useDefaultScreenOptions()

  useEffect(() => {
    if (!isLocked) return
    rootNavigation.navigate('LockScreen', { requestType: 'unlock', lock: true })
  }, [isLocked, rootNavigation])

  useEffect(() => {
    if (!isSettingUpHotspot) return

    dispatch(appSlice.actions.startHotspotSetup())
    rootNavigation.navigate('GatewayOnboarding', {
      screen: 'StartScreen',
    })
  }, [isSettingUpHotspot, dispatch, rootNavigation])

  const sceneContainerStyle = useMemo(
    () => ({
      opacity: isLocked ? 0 : 1,
    }),
    [isLocked],
  )

  const screenOptions = useCallback(
    ({ route }) => ({
      ...defaultScreenOptions,
      tabBarStyle: {
        backgroundColor: primaryBackground,
      },
      tabBarIcon: ({ focused, color, size }: TabBarIconType) => {
        return (
          <TabBarIcon
            name={route.name as MainTabType}
            focused={focused}
            color={color}
            size={Math.min(size, 22)}
          />
        )
      },
    }),
    [defaultScreenOptions, primaryBackground],
  )

  return (
    <MainTab.Navigator
      sceneContainerStyle={sceneContainerStyle}
      initialRouteName="Hotspots"
      screenOptions={screenOptions}
    >
      <MainTab.Screen name="Hotspots" component={GatewaysScreen} />
      <MainTab.Screen name="Settings" component={SettingsScreen} />
    </MainTab.Navigator>
  )
}

export default memo(MainTabs)
