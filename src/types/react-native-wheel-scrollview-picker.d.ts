// The package ships TS source (no bundled index.d.ts) whose component class
// does not match React 18 JSX, producing TS2786 on every <ScrollPicker /> use.
declare module 'react-native-wheel-scrollview-picker' {
  import {ComponentType} from 'react';
  const ScrollPicker: ComponentType<any>;
  export default ScrollPicker;
}
