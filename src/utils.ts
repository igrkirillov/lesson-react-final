export function formatPrice(price: number): string {
    return String(price).replace(/(.)(?=(\d{3})+$)/g,'$1 ');
}