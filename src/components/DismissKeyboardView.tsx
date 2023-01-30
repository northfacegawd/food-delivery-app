/**
 * 두 가지 버전 중 reac native keyboard aware scrollview라이브러리를 사용한 패턴
 */

import React, {PropsWithChildren} from 'react';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingViewProps,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';

function DismissKeyboardView({
  children,
  ...props
}: PropsWithChildren<KeyboardAvoidingViewProps>) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <KeyboardAwareScrollView {...props} style={props.style}>
        {children}
      </KeyboardAwareScrollView>
    </TouchableWithoutFeedback>
  );
}

export default DismissKeyboardView;

/**
 * 두가지 버전 중 HOC버전
 */

// import React, {PropsWithChildren} from 'react';

// import {
//   Keyboard,
//   KeyboardAvoidingView,
//   KeyboardAvoidingViewProps,
//   TouchableWithoutFeedback,
// } from 'react-native';

// function DismissKeyboardHOC(Comp: typeof KeyboardAvoidingView) {
//   return ({
//     children,
//     ...props
//   }: PropsWithChildren<KeyboardAvoidingViewProps>) => (
//     <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
//       <Comp {...props}>{children}</Comp>
//     </TouchableWithoutFeedback>
//   );
// }

// const DismissKeyboardView = DismissKeyboardHOC(KeyboardAvoidingView);

// export default DismissKeyboardView;
