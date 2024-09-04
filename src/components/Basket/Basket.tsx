import {useAppSelector} from "../../hooks";
import {basketState} from "../../slices/basket";

export function Basket() {
    const {positions} = useAppSelector(basketState);
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
                    <tr>
                        <td>{positions.indexOf(p) + 1}</td>
                        <td>{p.detailInfo.title}</td>
                        <td>{p.size}</td>
                        <td>{1}</td>
                        <td>{p.detailInfo.price}</td>
                        <td>{p.detailInfo.price * p.quantity}</td>
                        <td><input type="button" value="Удалить"/></td>
                    </tr>
                ))}
                </tbody>
            </table>
    )
}