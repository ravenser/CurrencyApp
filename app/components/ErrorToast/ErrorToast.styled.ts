import styled from "styled-components/native";

export const ToastContainer = styled.View`
  position: absolute;
  top: 40px;
  left: 16px;
  right: 16px;
  background-color:rgb(157, 26, 50);
  border-radius: 12px;
  padding: 18px 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  z-index: 100;
`;

export const ErrorText = styled.Text`
  color: #fff;
  font-size: 16px;
  flex: 1;
`;

export const Button = styled.TouchableOpacity`
  background-color: #fff2f2;
  border: none;
  border-radius: 6px;
  padding: 8px 16px;
  margin-left: 12px;
`;

export const ButtonText = styled.Text`
  color: #b00020;
  font-weight: bold;
`;