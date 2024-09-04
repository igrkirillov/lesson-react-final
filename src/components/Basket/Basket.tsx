import {MouseEvent} from "react";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {basketState, removeFromBasket} from "../../slices/basket";
import {formatPrice} from "../../utils";

export function Basket() {
    const {positions} = useAppSelector(basketState);
    const dispatch = useAppDispatch();
    const onClickRemove = (event: MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        const id = Number((event.target as HTMLInputElement).dataset.id);
        const position = positions.find(p => p.detailInfo.id === id);
        if (position) {
            dispatch(removeFromBasket(position));
        }
    }
    return (
            <table className="table table-bordered mb-0">
                <thead>
                <tr>
                    <td>#</td>
                    <td>Название</td>
                    <td>Размер</td>
                    <td>Кол-во</td>
                    <td>Стоимость</td>
                    <td>Итого</td>
                    <td>Действия</td>
                </tr>
                </thead>
                <tbody>
                {positions.map(p => (
                    <tr key={String(p.detailInfo.id).concat("-", p.size)}>
                        <td>{positions.indexOf(p) + 1}</td>
                        <td>{p.detailInfo.title}</td>
                        <td>{p.size}</td>
                        <td>{p.quantity}</td>
                        <td>{formatPrice(p.reservedPrice) + " руб."}</td>
                        <td>{formatPrice(p.reservedPrice * p.quantity) + " руб."}</td>
                        <td><input type="button" className="btn btn-outline-danger"
                                   value="Удалить"
                                   data-id={p.detailInfo.id}
                                   onClick={onClickRemove}/>
                        </td>
                    </tr>
                ))}
                <tr key="total">
                    <td className="text-end" colSpan={5}>Общая стоимость</td>
                    <td className="text-start">{formatPrice(positions.map(p => p.quantity*p.reservedPrice).reduce((sum, cost) => sum + cost, 0)) + " руб."}</td>
                    <td></td>
                </tr>
                </tbody>
            </table>
    )
}