import {CatalogMenu} from "./CatalogMenu";
import {ItemCard} from "../ItemCard/ItemCard";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {MouseEvent, useEffect} from "react";
import {ErrorWidget} from "../ErrorWidget/ErrorWidget";
import {Spinner} from "../Spinner/Spinner";
import {catalogState, fetchGoods, fetchNextGoods} from "../../slices/catalog";
import {categoriesState, fetchCategories} from "../../slices/categories";
import {Search} from "./Search";
import {Item} from "../../types";

export function Catalog() {
    const {loading: loadingCatalog, error: errorCatalog, goods, filter, isWarmed, hasNext} = useAppSelector(catalogState);
    const {loading: loadingCategories, error: errorCategories, categories} = useAppSelector(categoriesState);
    const dispatch = useAppDispatch();
    useEffect(() => {
        if (!isWarmed) {
            dispatch(fetchCategories());
            dispatch(fetchGoods());
        }
    }, [dispatch, filter, goods, isWarmed]) // mounted
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
                    {goods.length != 0 ? (<Goods goods={goods} hasNext={hasNext}/>) : (<div className="text-center">
                        По заданному фильтру ничего не найдено, но есть другие товары.<br/>
                        Попробуйте изменить фильтр.</div>)}
                </>
            )}
        </section>
    );
}

function Goods(props: {goods: Item[], hasNext: boolean}) {
    const {goods, hasNext} = props;
    const dispatch = useAppDispatch();
    const onClickNext = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        dispatch(fetchNextGoods());
    }
    return (
        <>
            <div className="row">
                {goods.map(item => (<ItemCard key={item.id} item={item}/>))}
            </div>
            {hasNext
                ? (<div className="text-center">
                    <button onClick={onClickNext} className="btn btn-outline-primary">Загрузить ещё</button>
                   </div>)
                : (<></>)}
        </>
    )
}