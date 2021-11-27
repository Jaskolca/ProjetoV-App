import React, { FC } from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';
import { ActivityIndicator } from 'react-native';
import { Container, ButtonText, BorderConatiner } from './styles';

interface ButtomProps extends RectButtonProperties {
  children: string;
  color?: string;
  borderColor?: string;
  loadingColor?: string;
  isLoading?: boolean;
}

const Button: FC<ButtomProps> = ({
  children,
  borderColor,
  loadingColor,
  isLoading = false,
  enabled = true,
  ...rest
}) => {
  return (
    <BorderConatiner borderColor={borderColor}>
      <Container {...rest} enabled={enabled} isLoading={isLoading}>
        {isLoading ? (
          <ActivityIndicator
            size="small"
            color={loadingColor ? loadingColor : '#fff'}
          />
        ) : (
          <ButtonText>{children}</ButtonText>
        )}
      </Container>
    </BorderConatiner>
  );
};

export default Button;
