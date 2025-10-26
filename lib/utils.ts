import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function getUserTimezone(): string {
    return Intl.DateTimeFormat().resolvedOptions().timeZone; // e.g. "Asia/Kolkata"
}

export type CurrencyCode = "inr" | "usd";

export function formatCurrency(
    amount: string | number,
    {
        currency = "inr",
        hideSymbol = false,
        locale = "en-IN",
        localizationOpts = {},
        compact = false,
    }: {
        currency?: CurrencyCode;
        hideSymbol?: boolean;
        locale?: string;
        localizationOpts?: Intl.NumberFormatOptions;
        compact?: boolean;
    } = {}
): string {
    const _amount = Number(amount);

    if (compact) {
        const absAmount = Math.abs(_amount);
        let formatted = "";

        if (absAmount >= 1_00_00_000) {
            formatted = `${(_amount / 1_00_00_000).toFixed(2)}Cr`; // Crores
        } else if (absAmount >= 1_00_000) {
            formatted = `${(_amount / 1_00_000).toFixed(2)}L`; // Lakhs
        } else if (absAmount >= 1_000) {
            formatted = `${(_amount / 1_000).toFixed(2)}k`; // Thousands
        } else {
            formatted = _amount.toFixed(2); // Default formatting for smaller values
        }

        return hideSymbol
            ? formatted
            : `${getCurrencySymbol(currency)}${formatted}`;
    }

    const options = deepMerge(
        {
            style: hideSymbol ? "decimal" : "currency",
            currency: currency,
            maximumFractionDigits: 2,
        },
        localizationOpts
    );

    return new Intl.NumberFormat(locale, options).format(_amount);
}

export function getCurrencySymbol(
    currencyCode: CurrencyCode,
    locale = "en"
): string {
    const formatted = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(1);

    // Remove all digits, commas, periods, and whitespace to isolate the symbol
    const symbol = formatted.replace(/[\d.,\s]/g, "").trim();
    return symbol;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObject = Record<string, any>;

export function deepMerge<T extends AnyObject, U extends AnyObject>(
    obj1: T,
    obj2: U
): T & U {
    const result: AnyObject = { ...obj1 };

    for (const key in obj2) {
        if (Object.prototype.hasOwnProperty.call(obj2, key)) {
            const val1 = obj1[key];
            const val2 = obj2[key];

            if (isPlainObject(val1) && isPlainObject(val2)) {
                result[key] = deepMerge(val1, val2);
            } else {
                result[key] = val2;
            }
        }
    }

    return result as T & U;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isPlainObject(value: any): value is AnyObject {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
