export type Item = {
    title: string,
    price: number,
    images: string[]
}

type LoadingState = {
    loading: boolean,
    error: Error | null,
}

export type HitsState = LoadingState & {
    hits: Item[]
}

export type CatalogFilter = {
    categoryId: number,
    searchText: string
}

export type CatalogState = LoadingState & {
    goods: Item[],
    filter : CatalogFilter | null
}