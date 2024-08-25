import {useParams} from "react-router";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {detailInfoState, fetchDetailInfo} from "../../slices/detailInfo";
import {ErrorWidget} from "../../components/ErrorWidget/ErrorWidget";
import {Spinner} from "../../components/Spinner/Spinner";
import {useEffect} from "react";
import {StockSize} from "../../types";

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
                    <table className="table table-bordered mb-0">
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
                    <div className="row justify-content-center mt-2">
                        <div className="col text-center">
                            <span>Размеры в наличии: </span>
                            {detailInfo?.sizes.filter(s => s.available).map(s => (<StockSizeWidget size={s}/>))}
                        </div>
                    </div>
                    <div className="row justify-content-center mt-2">
                        <div className="col">
                            <button type="submit" className="btn btn-danger w-100">В корзину</button>
                        </div>
                    </div>
                </div>
            </div>
           </section>);
}

function StockSizeWidget(props: {size: StockSize}) {
    const {size} = props;
    return (
        <>
            <input type="radio" className="btn-check" name="options" id={size.size} autoComplete="off"/>
            <label className="btn btn-outline-secondary" htmlFor={size.size}>{size.size}</label>
        </>
    )
}