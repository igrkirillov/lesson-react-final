import {CatalogFilter, Category, Item} from "./types";

export const getHitsFromServer = async (): Promise<Item[]> => {
    return fetch(import.meta.env.VITE_SERVER_URL + "/api/top-sales")
        .then(async response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return (await response.json()) as Item[];
        })
}

export const getGoodsFromServer = async (filter: CatalogFilter | null): Promise<Item[]> => {
    return fetch(import.meta.env.VITE_SERVER_URL + "/api/items?" + createQueryStringFromCatalogFilter(filter))
        .then(async response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return (await response.json()) as Item[];
        })
}

function createQueryStringFromCatalogFilter(filter: CatalogFilter | null): string {
    const params = new URLSearchParams();
    if (filter && filter.categoryId) {
        params.set("categoryId", String(filter.categoryId));
    }
    if (filter && filter.searchText && filter.searchText.trim()) {
        params.set("q", filter.searchText);
    }
    return params.toString();
}

export const getCategoriesFromServer = async (): Promise<Category[]> => {
    return fetch(import.meta.env.VITE_SERVER_URL + "/api/categories")
        .then(async response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return (await response.json()) as Category[];
        })
}