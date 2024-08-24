export type Item = {
    title: string,
    price: number,
    images: string[]
}

export type Category = {
    id: number,
    title: string
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
    searchText: string,
    offset: number
}

export type CatalogState = LoadingState & {
    goods: Item[],
    filter : CatalogFilter | null,
}

export type CategoriesState = LoadingState & {
    categories: Category[],
}