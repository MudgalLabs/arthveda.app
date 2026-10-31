// geoip-country ships no types; this is the one call lib/visitor_currency.ts makes.
declare module "geoip-country" {
    const geoip: { lookup(ip: string): { country: string } | null };
    export default geoip;
}
