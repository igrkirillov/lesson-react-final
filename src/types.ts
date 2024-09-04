export type Item = {
    id: number,
    title: string,
    price: number,
    images: string[]
}

export type StockSize = {
    size: string,
    available: boolean
}

export type DetailInfo = {
    id: number,
    category: number,
    title: string,
    images: string[],
    sku: string,
    manufacturer: string,
    color: string,
    material: string,
    reason: string,
    season: string,
    heelSize: string,
    price: number,
    oldPrice: number,
    sizes: StockSize[]
}

export type Category = {
    id: number,
    title: string
}

type LoadingState = {
    loading: boolean,
    error: Error | null,
    isWarmed?: boolean
}

export type HitsState = LoadingState & {
    hits: Item[]
}

export type CatalogFilter = {
    categoryId: number | null,
    searchText: string | null,
    offset: number | null
}

export type CatalogState = LoadingState & {
    goods: Item[],
    filter : CatalogFilter | null,
}

export type CategoriesState = LoadingState & {
    categories: Category[],
}

export type DetailInfoState = LoadingState & {
    detailInfo: DetailInfo | null,
}

export type Position = {
    detailInfo: DetailInfo,
    size: string,
    quantity: number,
    reservedPrice: number
}

export type BasketState = LoadingState & {
    positions: Position[];
    orderCreated: boolean
}

export type DeliveryInfo = {
    phone: string,
    address: string,
    isAcceptDeliveryRules: boolean
}