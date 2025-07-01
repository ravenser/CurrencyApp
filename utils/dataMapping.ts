import { CurrencyInfo, CurrencyRate } from "@/types/CurrencyTypes";

export function mapCurrenciesWithInfo(
  rates: CurrencyRate[],
  infos: CurrencyInfo[]
) {
  const infoMap = new Map(infos.map(info => [info.code, info.name]));

  return rates
    .filter(rate => infoMap.has(rate.code))
    .map(rate => {
      const info = infoMap.get(rate.code)!;
      return {
        rate: rate.rate,
        code: rate.code,
        name: info,
      };
    });
}