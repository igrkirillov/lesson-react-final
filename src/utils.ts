import {BasketState, DetailInfo, Position} from "./types";
import {basketLocalStorageKey} from "./constants";

export function formatPrice(price: number): string {
    return String(price).replace(/(.)(?=(\d{3})+$)/g,'$1 ');
}

export function createPosition(detailInfo: DetailInfo, size: string, quantity: number): Position {
    return {detailInfo: detailInfo, size: size, quantity: quantity} as Position;
}

export function saveBasketToLocalStorage(basket: BasketState): void {
    localStorage.setItem(basketLocalStorageKey, JSON.stringify(basket));
}

export function loadBasketFromLocalStorage(defaultBasket: BasketState): BasketState {
    const basketStr = localStorage.getItem(basketLocalStorageKey);
    if (basketStr) {
        try {
            return JSON.parse(basketStr);
        } catch (error) {
            console.error("Ошибка парсинга баскета " + basketStr + ": " + error);
        }
    }
    return defaultBasket;
}