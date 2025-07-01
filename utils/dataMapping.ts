import { CurrencyInfo, CurrencyRate } from "@/types/CurrencyTypes";

export function mapCurrenciesWithInfo(
  rates: CurrencyRate[],
  infos:CurrencyInfo[]
) {
  const infoMap = new Map(infos.map(info => [info.code, info]));
  return rates
    .filter(rate => infoMap.has(rate.quoteCurrency))
    .map(rate => {
      const info = infoMap.get(rate.quoteCurrency)!;
      return {
        rate: rate.quote,
        code: rate.quoteCurrency,
        name: info.name,
      };
    });
}