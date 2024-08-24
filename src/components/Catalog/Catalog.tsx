import {CatalogMenu} from "./CatalogMenu";
import {ItemCard} from "../ItemCard/ItemCard";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useEffect} from "react";
import {ErrorWidget} from "../ErrorWidget/ErrorWidget";
import {Spinner} from "../Spinner/Spinner";
import {catalogState, fetchGoods} from "../../slices/catalog";

export function Catalog() {
    const {loading, error, goods, filter} = useAppSelector(catalogState);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchGoods(filter));
    }, []) // mounted
    if (!loading && !error && goods.length == 0) {
        return (<></>); //empty
    }
    if (error) {
        return (<ErrorWidget error={error}/>)
    }
    return loading ? (<Spinner/>) : (
        <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            <form className="catalog-search-form form-inline">
                <input className="form-control" placeholder="Поиск"/>
            </form>
            <CatalogMenu/>
            <div className="row">
                {goods.map(item => (<ItemCard item={item}/>))}
            </div>
            <div className="text-center">
                <button className="btn btn-outline-primary">Загрузить ещё</button>
            </div>
        </section>
    );
}