import {FormEvent, useRef} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {catalogState, fetchGoods, setFilter} from "../../slices/catalog";
import {CatalogFilter} from "../../types";

export function Search() {
    const {filter} = useAppSelector(catalogState);
    const dispatch = useAppDispatch();
    const searchInputRef = useRef<HTMLInputElement>(null);
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchText = (searchInputRef.current?.value || "").trim();
        const newFilter = {...filter, searchText} as CatalogFilter;
        dispatch(setFilter(newFilter));
        dispatch(fetchGoods());
    }
    return (
        <form id="search" className="catalog-search-form form-inline" onSubmit={onSubmit}>
            <input name="search-input" ref={searchInputRef} defaultValue={filter && filter.searchText ? filter.searchText : ""} className="form-control" placeholder="Поиск"/>
        </form>
    )
}