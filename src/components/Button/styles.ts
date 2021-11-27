import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

import { colors } from '@common/globalStyles';

interface IButtonProps {
  color?: string;
  textColor?: string;
  enabled: boolean;
  isLoading: boolean;
}

interface IBorderProps {
  borderColor?: string;
}

export const BorderConatiner = styled.View<IBorderProps>`
  border: ${(props) =>
    props.borderColor ? `2px solid ${props.borderColor}` : 'none'};
  flex: 1;
  margin: 8px;
  height: 40px;
  border-radius: 20px;
`;

export const Container = styled(RectButton)<IButtonProps>`
  height: 40px;
  flex: 1;
  background: ${({ color = colors.blue, enabled, isLoading }) =>
    isLoading ? color : enabled ? color : colors['light-grey']};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
`;

export const ButtonText = styled.Text`
  color: #ffffff;
  font-size: 14px;
  font-weight: bold;
`;
