import React from "react";
import CustomCountryFlag from "../CountryFlag";
import SvgIcon from "../SvgIcon";
import {
  FavoriteButton,
  RateBuletDataContainer,
  RateBulletContainer,
  RateBulletExchangeContainer,
  RateBulletText,
  SectionContainer,
} from "./RateBullet.styled";

type RateBulletProps = {
  rate: number;
  name: string;
  code: string;
  isFavorite: boolean;
  isFirst?: boolean;
  isLast?: boolean;
  onFavoritePress: () => void;
};

const RateBullet = React.memo(function RateBullet({
  rate,
  name,
  code,
  isFirst,
  isLast,
  isFavorite,
  onFavoritePress,
}: RateBulletProps) {
  return (
    <SectionContainer
      isFirst={isFirst ?? false}
      isLast={isLast ?? false}
      testID="RateBullet"
    >
      <RateBulletContainer>
        <CustomCountryFlag isoCode={code} size={40} />
        <RateBuletDataContainer>
          <RateBulletText numberOfLines={1} ellipsizeMode="tail">
            {code + " : " + name}
          </RateBulletText>
          <RateBulletExchangeContainer>
            <RateBulletText>{rate.toFixed(3)}</RateBulletText>
            <SvgIcon name="Exchange" width={14} height={14} color="white" />
            <RateBulletText>{(1 / rate).toFixed(3)}</RateBulletText>
          </RateBulletExchangeContainer>
        </RateBuletDataContainer>
        <FavoriteButton
          onPress={onFavoritePress}
          hitSlop={8}
          testID={`FavoriteButton-${code}`}
        >
          <SvgIcon
            name="Star"
            width={44}
            height={44}
            color={isFavorite ? "yellow" : "white"}
          />
        </FavoriteButton>
      </RateBulletContainer>
    </SectionContainer>
  );
});

export default RateBullet;
