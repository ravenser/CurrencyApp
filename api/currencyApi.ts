import { graphqlRequest } from "../utils/graphqlRequest";

const SWOP_API_URL = "https://swop.cx/graphql";
const SWOP_API_KEY =process.env.EXPO_PUBLIC_SWOP_API_KEY!; //TODO: handle no env
const BASE_CURRENCY = "EUR";

type CurrencyInfo = {
    code: string;
    name: string;
}

type CurrencyRate = {
    quoteCurrency: string;
    quote: number;
    date: string;
}

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
          date
          quoteCurrency
          quote
        }
      }
    `;
    const variables = { base: baseCurrency };
    const data = await graphqlRequest(SWOP_API_URL, SWOP_API_KEY, query, variables);
    return data.latest.map((item: CurrencyRate) => ({
      code: item.quoteCurrency,
      rate: item.quote,
      date: item.date,
    }));
  };