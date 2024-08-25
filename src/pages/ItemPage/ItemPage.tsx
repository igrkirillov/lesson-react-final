import {useParams} from "react-router";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {detailInfoState, fetchDetailInfo} from "../../slices/detailInfo";
import {ErrorWidget} from "../../components/ErrorWidget/ErrorWidget";
import {Spinner} from "../../components/Spinner/Spinner";
import {useEffect} from "react";

export function ItemPage() {
    const id = useParams()["id"];
    const {loading, error, detailInfo} = useAppSelector(detailInfoState);
    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(fetchDetailInfo(String(id)));
    }, [id])
    if (error) {
        return (<ErrorWidget error={error}/>)
    }
    return loading ? (<Spinner/>)
        : (<section className="top-sales">
            <h2 className="text-center">{detailInfo?.title}</h2>
           </section>);
}