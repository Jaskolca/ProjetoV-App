import React, {
  ForwardRefRenderFunction,
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';

import { TextInputProps, Alert } from 'react-native';

import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';

export interface InputProps extends TextInputProps {
  name: string;
  icon?: string;
  containerStyle?: {};
  rawValue?: string;
  editable?: boolean;
  secureTextEntry?: boolean;
  eyeIcon?: boolean;
  eyeIconAction?(): void;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: ForwardRefRenderFunction<InputRef, InputProps> = (
  {
    name,
    icon,
    containerStyle = {},
    rawValue,
    onChangeText,
    editable = true,
    secureTextEntry: isPassword = false,
    eyeIcon = false,
    eyeIconAction,
    ...rest
  },

  ref,
) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);

  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);

  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);

    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  const handleOnChange = useCallback(
    (text) => {
      if (inputValueRef.current) {
        inputValueRef.current.value = text;
      }
      if (onChangeText) {
        onChangeText(text);
      }
    },
    [onChangeText],
  );

  useEffect(() => {
    registerField({
      name: fieldName,

      ref: inputValueRef.current,

      path: 'value',

      setValue(_reference: any, value: string) {
        inputValueRef.current.value = value;

        inputElementRef.current.setNativeProps({ text: value });
      },

      clearValue() {
        inputValueRef.current.value = '';

        inputElementRef.current.clear();
      },

      getValue(reference: any) {
        return rawValue || reference.value;
      },
    });
  }, [fieldName, rawValue, registerField]);

  const showError = useCallback((alertError: string) => {
    Alert.alert(alertError);
  }, []);

  return (
    <Container
      style={containerStyle}
      isEditable={editable}
      isFocused={isFocused}
      isFilled={isFilled}
      isErrored={!!error}>
      {icon && (
        <Icon
          name={icon}
          size={20}
          color={isFocused || isFilled ? '#3dc2ff' : '#7f7f7f'}
        />
      )}

      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#7f7f7f"
        defaultValue={defaultValue}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
        onChangeText={handleOnChange}
        editable={editable}
        {...rest}
        secureTextEntry={isPassword}
      />

      {eyeIcon && (
        <Icon
          name={isPassword ? 'eye' : 'eye-off'}
          size={20}
          color="#3dc2ff"
          onPress={eyeIconAction}
        />
      )}

      {error && (
        <Icon
          name="alert-circle"
          size={20}
          color="#c53030"
          onPress={() => showError(error)}
        />
      )}
    </Container>
  );
};

export default forwardRef(Input);
