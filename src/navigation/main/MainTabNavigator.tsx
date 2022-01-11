import React, { useEffect, memo, useMemo, useCallback } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import HotspotsScreen from '../../features/hotspots/root/HotspotsScreen'
import { TabBarIconType, MainTabType } from './tabTypes'
import TabBarIcon from './TabBarIcon'
import More from '../MoreNavigator'
import { RootState } from '../../store/rootReducer'
import { useAppDispatch } from '../../store/store'
import appSlice from '../../store/user/appSlice'
import { RootNavigationProp } from '../navigationRootTypes'
import { MainTabParamList } from './mainTabNavigatorTypes'

const MainTab = createBottomTabNavigator<MainTabParamList>()

const MainTabs = () => {
  const rootNavigation = useNavigation<RootNavigationProp>()
  const {
    app: { isLocked, isSettingUpHotspot },
  } = useSelector((state: RootState) => state)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!isLocked) return
    rootNavigation.navigate('LockScreen', { requestType: 'unlock', lock: true })
  }, [isLocked, rootNavigation])

  useEffect(() => {
    if (!isSettingUpHotspot) return

    dispatch(appSlice.actions.startHotspotSetup())
    rootNavigation.navigate('HotspotSetup', {
      screen: 'HotspotSetupExternalScreen',
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
    [],
  )

  return (
    <MainTab.Navigator
      sceneContainerStyle={sceneContainerStyle}
      initialRouteName="Hotspots"
      screenOptions={screenOptions}
    >
      <MainTab.Screen name="Hotspots" component={HotspotsScreen} />
      <MainTab.Screen name="More" component={More} />
    </MainTab.Navigator>
  )
}

export default memo(MainTabs)
