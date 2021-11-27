import styled, { css } from 'styled-components/native';
import { TextInput as RNTextInput, StyleSheet } from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';

interface IContainerProps {
  isFocused: boolean;
  isErrored: boolean;
  isFilled: boolean;
  isEditable: boolean;
}

export const Container = styled.View<IContainerProps>`
  flex: 1;
  height: 60px;
  padding: 0 16px;
  background: ${({ isEditable }) => (isEditable ? '#fff' : '#eee')};
  border-radius: 10px;
  margin-bottom: 8px;
  border-width: ${StyleSheet.hairlineWidth}px;
  border-bottom-width: 2px;
  border-color: #ced4da;
  flex-direction: row;
  align-items: center;
  ${(props) =>
    props.isErrored &&
    !props.isFilled &&
    css`
      border-bottom-color: #c53030;
    `}
  ${(props) =>
    props.isFocused &&
    css`
      border-bottom-color: #3dc2ff;
    `}
`;

export const TextInput = styled(RNTextInput)`
  flex: 1;
  color: #232129;
  background: ${({ editable }) => (editable ? '#ffffff' : '#eee')};
  font-size: 16px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
