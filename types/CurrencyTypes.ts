export type CurrencyInfo = {
    code: string;
    name: string;
}

export type CurrencyRate = {
    quoteCurrency: string;
    quote: number;
}

export type Currency = {
    code: string;
    name: string;
    rate: number;
}