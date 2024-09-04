import {CatalogFilter, Category, DeliveryInfo, DetailInfo, Item, Position} from "./types";

export const getHitsFromServer = async (): Promise<Item[]> => {
    await delay(1);
    return fetch(import.meta.env.VITE_SERVER_URL + "/api/top-sales")
        .then(async response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return (await response.json()) as Item[];
        })
}

export const getGoodsFromServer = async (filter: CatalogFilter | null, offset: number): Promise<Item[]> => {
    return fetch(import.meta.env.VITE_SERVER_URL + "/api/items?" + createQueryStringFromCatalogFilter(filter, offset))
        .then(async response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return (await response.json()) as Item[];
        })
}

function createQueryStringFromCatalogFilter(filter: CatalogFilter | null, offset: number): string {
    const params = new URLSearchParams();
    if (filter && filter.categoryId) {
        params.set("categoryId", String(filter.categoryId));
    }
    if (filter && filter.searchText && filter.searchText.trim()) {
        params.set("q", filter.searchText);
    }
    if (offset > 0) {
        params.set("offset", String(offset));
    }
    return params.toString();
}

export const getCategoriesFromServer = async (): Promise<Category[]> => {
    await delay(1);
    return fetch(import.meta.env.VITE_SERVER_URL + "/api/categories")
        .then(async response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return (await response.json()) as Category[];
        })
}

export const getItemDetailInfoFromServer = async (id: string): Promise<DetailInfo> => {
    await delay(1);
    return fetch(import.meta.env.VITE_SERVER_URL + "/api/items/" + id)
        .then(async response => {
            if (!response.ok) {
                throw Error(response.statusText);
            }
            return (await response.json()) as DetailInfo;
        })
}

async function delay(secs: number) {
    return new Promise(res => {
       setTimeout(res, secs * 1000)
    });
}

export const postOrderToServer = async (deliveryInfo: DeliveryInfo, positions: Position[]): Promise<void> => {
    return fetch(import.meta.env.VITE_SERVER_URL + "/api/order", {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            owner: {
                phone: deliveryInfo.phone,
                address: deliveryInfo.address
            },
            items: positions.map(p => {
                return {
                    id: p.detailInfo.id,
                    price: p.detailInfo.price,
                    count: p.quantity
                }
            })
        })
    }).then(async response => {
        if (!response.ok) {
            throw Error(response.statusText);
        }
    })
}