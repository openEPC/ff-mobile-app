import { useColors } from '../theme/themeHooks'

const useDefaultScreenOptions = () => {
  const { primaryBackground, primaryText } = useColors()

  return {
    headerStyle: {
      backgroundColor: primaryBackground,
    },
    headerTintColor: primaryText,
  }
}

export default useDefaultScreenOptions
