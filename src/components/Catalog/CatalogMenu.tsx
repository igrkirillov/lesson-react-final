import {MouseEvent} from "react";
import {CatalogFilter, Category} from "../../types";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {catalogState, fetchGoods, setFilter} from "../../slices/catalog";

export function CatalogMenu(props: {categories: Category[]}) {
    const {categories} = props;
    const {filter} = useAppSelector(catalogState);
    const dispatch = useAppDispatch();
    const isActive = (ct: Category) => {
        return filter && filter.categoryId && filter.categoryId === ct.id;
    }
    const onCategoryClick = (event: MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        const dataset = (event.target as HTMLAnchorElement).dataset;
        const id = dataset["id"] ? Number(dataset["id"]) : null;
        const newFilter = {...filter, categoryId: id} as CatalogFilter;
        dispatch(setFilter(newFilter));
        dispatch(fetchGoods(newFilter));
    }
    if (categories.length == 0) {
        return (<></>);
    }
    return (
        <ul className="catalog-categories nav justify-content-center">
            <li className="nav-item">
                <a onClick={onCategoryClick}
                   className="nav-link" href="#">Все</a>
            </li>
            {categories.map(ct => (
                <li className="nav-item" key={ct.id}>
                    <a data-id={ct.id}
                       onClick={onCategoryClick}
                       className={"nav-link" + (isActive(ct) ? " active" : "")}
                       href="#">{ct.title}</a>
                </li>
            ))}
        </ul>
    );
}