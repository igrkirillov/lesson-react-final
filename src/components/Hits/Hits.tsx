import {useAppDispatch, useAppSelector} from "../../hooks";
import {fetchHits, hitsState} from "../../slices/hits";
import {Spinner} from "../Spinner/Spinner";
import {ErrorWidget} from "../ErrorWidget/ErrorWidget";
import {useEffect} from "react";
import {ItemCard} from "../ItemCard/ItemCard";

export function Hits() {
    const {loading, error, hits} = useAppSelector(hitsState);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchHits());
    }, [dispatch]) // mounted
    if (!loading && !error && hits.length == 0) {
        return (<></>); //empty
    }
    if (error) {
        return (<ErrorWidget error={error}/>)
    }
    return (
        <section className="top-sales">
                <h2 className="text-center">Хиты продаж!</h2>
                {loading ? (<Spinner/>) : (
                    <div className="row">
                        {hits.map(hit => (<ItemCard key={hit.id} item={hit}/>))}
                    </div>
                )}
        </section>
    );
}