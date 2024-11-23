//
declare const __DEV__: boolean
declare const __FIEND_DEV__: boolean
declare const __JEST__: boolean

declare module '*.png' {
  const value: string
  export default value
}
