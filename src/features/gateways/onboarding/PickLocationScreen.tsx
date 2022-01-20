import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useTranslation } from 'react-i18next'
import { Position } from 'geojson'
import Search from '@assets/images/search.svg'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'

import Box from '../../../components/Box'
import { DebouncedButton } from '../../../components/Button'
import ImageBox from '../../../components/ImageBox'
import Map from '../../../components/Map'
import Text from '../../../components/Text'
import { reverseGeocode } from '../../../utils/location'
import sleep from '../../../utils/sleep'
import {
  GatewayOnboardingNavigationProp,
  GatewayOnboardingStackParamList,
} from '../../../navigation/gatewayOnboardingNavigatorTypes'
import TouchableOpacityBox from '../../../components/TouchableOpacityBox'
import { useColors, useSpacing } from '../../../theme/themeHooks'
import BSHandle from '../../../components/BSHandle'
import AddressSearchModal from './AddressSearchModal'
import { PlaceGeography } from '../../../utils/googlePlaces'

type Route = RouteProp<GatewayOnboardingStackParamList, 'PickLocationScreen'>

const PickLocationScreen = () => {
  const { t } = useTranslation()
  const { params } = useRoute<Route>()
  const navigation = useNavigation<GatewayOnboardingNavigationProp>()
  const [disabled, setDisabled] = useState(true)
  const [mapCenter, setMapCenter] = useState([-122.419, 37.775])
  const [markerCenter, setMarkerCenter] = useState([0, 0])
  const [hasGPSLocation, setHasGPSLocation] = useState(false)
  const [locationName, setLocationName] = useState('')
  const [zoomLevel, setZoomLevel] = useState(2)
  const spacing = useSpacing()
  const insets = useSafeAreaInsets()
  const searchModal = useRef<BottomSheetModal>(null)
  const { surface } = useColors()

  useEffect(() => {
    const sleepThenEnable = async () => {
      await sleep(3000)
      setDisabled(false)
    }
    sleepThenEnable()
  }, [])

  const onMapMoved = useCallback(async (newCoords?: Position) => {
    if (newCoords) {
      setMarkerCenter(newCoords)

      const [longitude, latitude] = newCoords
      const [{ street, city }] = await reverseGeocode(latitude, longitude)
      const name = street && city ? [street, city].join(', ') : 'Loading...'
      setLocationName(name)
    }
  }, [])

  const navNext = useCallback(() => {
    navigation.navigate('AntennaSetupScreen', {
      ...params,
      coords: markerCenter,
      locationName,
    })
  }, [locationName, markerCenter, navigation, params])

  const onDidFinishLoadingMap = useCallback(
    (latitude: number, longitude: number) => {
      setZoomLevel(16)
      setHasGPSLocation(true)
      setMapCenter([longitude, latitude])
    },
    [],
  )

  const handleSearchPress = useCallback(() => {
    searchModal.current?.present()
  }, [])

  const handleSelectPlace = useCallback((placeGeography: PlaceGeography) => {
    setMapCenter([placeGeography.lng, placeGeography.lat])
    searchModal.current?.dismiss()
  }, [])

  const pinContainer = useMemo(
    () => ({ marginTop: -29, marginLeft: -25 / 2 }),
    [],
  )
  const searchSnapPoints = useMemo(() => ['85%'], [])

  return (
    <Box
      flex={1}
      backgroundColor="primaryBackground"
      paddingHorizontal="m"
      paddingBottom="m"
    >
      <TouchableOpacityBox
        onPress={handleSearchPress}
        position="absolute"
        padding="m"
        top={insets.top + spacing.s}
        right={spacing.m}
        zIndex={1}
      >
        <Search width={30} height={30} color="white" />
      </TouchableOpacityBox>
      <Box flex={1.2}>
        <Map
          mapCenter={mapCenter}
          onMapMoved={onMapMoved}
          onDidFinishLoadingMap={onDidFinishLoadingMap}
          zoomLevel={zoomLevel}
          currentLocationEnabled
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          style={pinContainer}
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
      <Box backgroundColor="primaryBackground" padding="l">
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
          marginBottom="lm"
        >
          <Box>
            <Text variant="body1" marginBottom="xs">
              {t('gatewayOnboarding.pickLocationScreen.title')}
            </Text>
            <Text variant="body1">{locationName}</Text>
          </Box>
        </Box>
        <DebouncedButton
          onPress={navNext}
          color="primary"
          disabled={disabled || !hasGPSLocation}
          title={t('gatewayOnboarding.pickLocationScreen.next')}
        />
      </Box>

      <BottomSheetModalProvider>
        <BottomSheetModal
          ref={searchModal}
          snapPoints={searchSnapPoints}
          handleComponent={BSHandle}
          backdropComponent={BottomSheetBackdrop}
          backgroundStyle={{ backgroundColor: surface }}
        >
          <AddressSearchModal onSelectPlace={handleSelectPlace} />
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </Box>
  )
}

export default memo(PickLocationScreen)
