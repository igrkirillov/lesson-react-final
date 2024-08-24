import {Category} from "../../types";
import {useAppSelector} from "../../hooks";
import {catalogState} from "../../slices/catalog";

export function CatalogMenu(props: {categories: Category[]}) {
    const {categories} = props;
    if (categories.length == 0) {
        return (<></>);
    }
    const {filter} = useAppSelector(catalogState);
    const isActive = (ct: Category) => {
        return filter && filter.categoryId && filter.categoryId === ct.id;
    }
    return (
        <ul className="catalog-categories nav justify-content-center">
            <li className="nav-item">
                <a className="nav-link" href="#">Все</a>
            </li>
            {categories.map(ct => (
                <li className="nav-item">
                    <a className={"nav-link" + (isActive(ct) ? " active" : "")} href="#">{ct.title}</a>
                </li>
            ))}
        </ul>
    );
}