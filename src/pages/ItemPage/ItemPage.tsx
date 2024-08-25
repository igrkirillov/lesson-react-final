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
            <div className="row">
                <div className="col">
                    <img src={detailInfo?.images[0]}
                         className="img-fluid"
                         alt={detailInfo?.title}/>
                </div>
                <div className="col">
                    <table className="table table-bordered">
                        <tbody>
                        <tr>
                            <td>Артикул</td>
                            <td>{detailInfo?.sku}</td>
                        </tr>
                        <tr>
                            <td>Производитель</td>
                            <td>{detailInfo?.manufacturer}</td>
                        </tr>
                        <tr>
                            <td>Цвет</td>
                            <td>{detailInfo?.color}</td>
                        </tr>
                        <tr>
                            <td>Материалы</td>
                            <td>{detailInfo?.material}</td>
                        </tr>
                        <tr>
                            <td>Сезон</td>
                            <td>{detailInfo?.season}</td>
                        </tr>
                        <tr>
                            <td>Повод</td>
                            <td>{detailInfo?.reason}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
           </section>);
}