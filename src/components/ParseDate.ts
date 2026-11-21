export default function ParseDate(dateStr: string) :number {
    const [dd, mm, yyyy] = dateStr.split('.');
    if (!dd || !mm || !yyyy) return 0;
    const year = yyyy.length === 2 ? `20${yyyy}` : yyyy;
    const month = String(Number(mm) - 1);
    return new Date(Number(year), Number(month), Number(dd)).getTime();
}