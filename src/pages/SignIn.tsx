import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  Alert,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {RootStackParamList} from '../../AppInner';
import useSignIn from '../hooks/useSignIn';
import userSlice from '../slices/user';
import {useAppDispatch} from '../store';
import EncryptedStorage from 'react-native-encrypted-storage';

interface SignInScreenProps
  extends NativeStackScreenProps<RootStackParamList, 'SignIn'> {}

function SignIn({navigation}: SignInScreenProps) {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const passwordRef = useRef<TextInput>(null);
  const {isLoading, data, mutate} = useSignIn();

  const onChangeEmail = useCallback((text: string) => setEmail(text), []);
  const onChangePassword = useCallback((text: string) => setPassword(text), []);

  const onSubmit = useCallback(async () => {
    if (!email || !email.trim()) {
      return Alert.alert('알림', '이메일을 입력해주세요.');
    }
    if (!password || !password.trim()) {
      return Alert.alert('알림', '비밀번호를 입력해주세요.');
    }
    mutate({email, password});
  }, [email, password, mutate]);
  const toSignUp = useCallback(() => {
    navigation.navigate('SignUp');
  }, [navigation]);

  useEffect(() => {
    if (!data) return;
    (async () => {
      dispatch(
        userSlice.actions.setUser({
          ...data,
        }),
      );
      await EncryptedStorage.setItem('refreshToken', data.refreshToken);
    })();
  }, [data, dispatch]);

  const canGoNext = email.trim() && password.trim() && !isLoading;

  return (
    <View style={styles.inputWrapper}>
      <View style={styles.inputBox}>
        <Text style={styles.label}>이메일</Text>
        <TextInput
          style={styles.textInput}
          value={email}
          onChangeText={onChangeEmail}
          clearButtonMode="while-editing"
          placeholder="이메일을 입력해주세요."
          keyboardType="email-address"
          importantForAutofill="yes"
          autoComplete="email"
          textContentType="emailAddress"
          returnKeyType="next"
          blurOnSubmit={false}
          onSubmitEditing={() => passwordRef.current?.focus()}
        />
      </View>
      <View style={styles.inputBox}>
        <Text style={styles.label}>비밀번호</Text>
        <TextInput
          ref={passwordRef}
          style={styles.textInput}
          value={password}
          clearButtonMode="while-editing"
          onChangeText={onChangePassword}
          placeholder="비밀번호를 입력해주세요."
          secureTextEntry
          importantForAutofill="yes"
          autoComplete="password"
          textContentType="password"
          onSubmitEditing={onSubmit}
        />
      </View>
      <View style={styles.buttonZone}>
        <Pressable
          onPress={onSubmit}
          style={
            !canGoNext
              ? styles.loginButton
              : StyleSheet.compose(styles.loginButton, styles.loginButtonActive)
          }
          disabled={!canGoNext}>
          <Text style={styles.loginButtonText}>로그인</Text>
        </Pressable>
        <Pressable onPress={toSignUp}>
          <Text>회원가입</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  inputWrapper: {
    padding: 20,
  },
  inputBox: {
    marginBottom: 20,
  },
  textInput: {
    padding: 5,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: 'gray',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  loginButtonActive: {
    backgroundColor: 'blue',
  },
  loginButtonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonZone: {
    alignItems: 'center',
  },
});

export default SignIn;
