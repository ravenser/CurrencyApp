export type CurrencyInfo = {
    code: string;
    name: string;
}

export type CurrencyRate = {
    code: string;
    rate: number;
}

export type Currency = {
    code: string;
    name: string;
    rate: number;
}

export type CurrencyRateApi = {
    quoteCurrency: string;
    quote: number;
}

export type SectionHeader = { type: "header"; title: string };
export type SectionItem = { type: "item"; code: string; name: string; rate: number };
export type SectionedData = SectionHeader | SectionItem;