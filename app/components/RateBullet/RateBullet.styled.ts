import styled from "styled-components/native";

//negative margin is used to hide black line between items
//TODO: find a better way to do this
export const SectionContainer = styled.View<{ isFirst?: boolean; isLast?: boolean }>`
  background-color: #232323;
  padding: 12px 8px 13px;
  margin: 0px 8px -1px;
  ${({ isFirst }: { isFirst?: boolean }) => isFirst && "border-top-left-radius: 18px; border-top-right-radius: 18px;"}
  ${({ isLast }: { isLast?: boolean }) => isLast && "border-bottom-left-radius: 18px; border-bottom-right-radius: 18px;"}
`;

export const RateBulletContainer = styled.View`
  background-color: #2d2d2d;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 16px 16px;
  border-radius: 18px;
`;

export const RateBulletText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: 500;
`;

export const RateBuletDataContainer = styled.View`
  flex-direction: column;
  flex: 1;
  justify-content: center;
  align-items: flex-start;
`;

export const RateBulletExchangeContainer = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

export const FavoriteButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;