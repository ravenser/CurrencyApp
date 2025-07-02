import React from "react";
import { ViewProps } from "react-native";
import {
  Button,
  ButtonText,
  ErrorText,
  ToastContainer,
} from "./ErrorToast.styled";

interface ErrorToastProps extends ViewProps {
  visible: boolean;
  message: string;
  onRetry?: () => void;
  onClose?: () => void;
}

const ErrorToast: React.FC<ErrorToastProps> = ({
  visible,
  message,
  onRetry,
  onClose,
  ...props
}) => {
  if (!visible) return null;
  return (
    <ToastContainer {...props}>
      <ErrorText numberOfLines={2}>{message}</ErrorText>
      {onRetry && (
        <Button onPress={onRetry}>
          <ButtonText>Retry</ButtonText>
        </Button>
      )}
      {onClose && (
        <Button onPress={onClose}>
          <ButtonText>Close</ButtonText>
        </Button>
      )}
    </ToastContainer>
  );
};

export default ErrorToast;
