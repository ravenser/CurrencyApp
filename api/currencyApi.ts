import { BASE_CURRENCY } from "@/app/constants/config";
import { CurrencyInfo, CurrencyRateApi } from "@/types/CurrencyTypes";
import { graphqlRequest } from "../utils/graphqlRequest";

const SWOP_API_URL = "https://swop.cx/graphql";
const SWOP_API_KEY =process.env.EXPO_PUBLIC_SWOP_API_KEY!; //TODO: handle no env

export const fetchCurrenciesInfo = async () => {
    const query = `
      query {
        currencies(currencyCodes: []) {
          code
          name
        }
      }
    `;
    const data = await graphqlRequest(SWOP_API_URL, SWOP_API_KEY, query, {});
    return data.currencies.map((item: CurrencyInfo) => ({
      code: item.code,
      name: item.name,
    }));
  };
  
  export const fetchCurrencies = async (baseCurrency: string = BASE_CURRENCY) => {
    const query = `
      query getRates($base: String!) {
        latest(baseCurrency: $base) {
          quoteCurrency
          quote
        }
      }
    `;
    const variables = { base: baseCurrency };
    const data = await graphqlRequest(SWOP_API_URL, SWOP_API_KEY, query, variables);
    return data.latest.map((item: CurrencyRateApi) => ({
      code: item.quoteCurrency,
      rate: item.quote,
    }));
  };