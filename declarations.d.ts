declare module '*.svg' {
  import { SvgProps } from 'react-native-svg'

  const content: React.FC<SvgProps>
  export default content
}

declare module 'react-native-currency-format' {
  export function format(value: number, currencyType: string): string
}
