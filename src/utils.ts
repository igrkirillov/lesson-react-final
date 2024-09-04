import {DetailInfo, Position} from "./types";

export function formatPrice(price: number): string {
    return String(price).replace(/(.)(?=(\d{3})+$)/g,'$1 ');
}

export function createPosition(detailInfo: DetailInfo, size: string, quantity: number): Position {
    return {detailInfo: detailInfo, size: size, quantity: quantity};
}