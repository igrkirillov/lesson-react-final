import {CatalogMenu} from "./CatalogMenu";
import {ItemCard} from "../ItemCard/ItemCard";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect} from "react";
import {ErrorWidget} from "../ErrorWidget/ErrorWidget";
import {Spinner} from "../Spinner/Spinner";
import {catalogState, fetchGoods} from "../../slices/catalog";
import {categoriesState, fetchCategories} from "../../slices/categories";

export function Catalog() {
    const {loading: loadingCatalog, error: errorCatalog, goods, filter} = useAppSelector(catalogState);
    const {loading: loadingCategories, error: errorCategories, categories} = useAppSelector(categoriesState);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchCategories());
        dispatch(fetchGoods(filter));
    }, []) // mounted
    if (!loadingCatalog && !errorCatalog && goods.length == 0) {
        return (<></>); //empty
    }
    if (errorCatalog || errorCategories) {
        return (<ErrorWidget error={errorCatalog || errorCategories}/>)
    }
    return (
        <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            {loadingCatalog || loadingCategories ? (<Spinner/>) : (
                <>
                    <form className="catalog-search-form form-inline">
                        <input className="form-control" placeholder="Поиск"/>
                    </form>
                    <CatalogMenu categories={categories}/>
                    <div className="row">
                        {goods.map(item => (<ItemCard item={item}/>))}
                    </div>
                    <div className="text-center">
                        <button className="btn btn-outline-primary">Загрузить ещё</button>
                    </div>
                </>
            )}
        </section>
    );
}