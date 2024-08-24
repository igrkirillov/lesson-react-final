import {CatalogMenu} from "./CatalogMenu";
import {ItemCard} from "../ItemCard/ItemCard";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect} from "react";
import {ErrorWidget} from "../ErrorWidget/ErrorWidget";
import {Spinner} from "../Spinner/Spinner";
import {catalogState, fetchGoods} from "../../slices/catalog";
import {categoriesState, fetchCategories} from "../../slices/categories";
import {Search} from "./Search";
import {Item} from "../../types";

export function Catalog() {
    const {loading: loadingCatalog, error: errorCatalog, goods, filter} = useAppSelector(catalogState);
    const {loading: loadingCategories, error: errorCategories, categories} = useAppSelector(categoriesState);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchGoods(filter));
    }, [dispatch, filter]) // mounted
    if (errorCatalog || errorCategories) {
        return (<ErrorWidget error={errorCatalog || errorCategories}/>)
    }
    return (
        <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            {loadingCatalog || loadingCategories ? (<Spinner/>) : (
                <>
                    <Search/>
                    <CatalogMenu categories={categories}/>
                    {goods.length != 0 ? (<Goods goods={goods}/>) : (<div className="text-center">
                        По заданному фильтру ничего не найдено, но есть другие товары.<br/>
                        Попробуйте изменить фильтр.</div>)}
                </>
            )}
        </section>
    );
}

function Goods(props: {goods: Item[]}) {
    const {goods} = props;
    return (
        <>
            <div className="row">
                {goods.map(item => (<ItemCard key={item.id} item={item}/>))}
            </div>
            <div className="text-center">
                <button className="btn btn-outline-primary">Загрузить ещё</button>
            </div>
        </>
    )
}