import {FormEvent} from "react";
import styles from "./styles.module.css"
import {useAppDispatch, useAppSelector} from "../../hooks";
import {basketState, postOrder} from "../../slices/basket";
import {DeliveryInfo} from "../../types";
import {Spinner} from "../Spinner/Spinner";
import {ErrorWidget} from "../ErrorWidget/ErrorWidget";
import {OrderCreatedWidget} from "../OrderCreatedWidget/OrderCreatedWidget";

export function OrderForm() {
    const {positions, loading, error, orderCreated} = useAppSelector(basketState);
    const dispatch = useAppDispatch();
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        const deliveryInfo = {
            phone: formData.get("phone"),
            address: formData.get("address"),
            isAcceptDeliveryRules: formData.has("isAcceptDeliveryRules")
        } as DeliveryInfo;
        dispatch(postOrder(deliveryInfo));
    }
    if (error) {
        return (<ErrorWidget error={error}/>)
    }
    if (loading) {
        return (<Spinner/>)
    }
    return orderCreated ? <OrderCreatedWidget/> : (
        <form onSubmit={onSubmit} className={"w-50 m-auto border border-1 " + styles["form"]}>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Телефон</label>
                <input type="text" className="form-control" id="phone" name="phone"
                       placeholder="Ваш телефон" required={true}/>
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">Адрес доставки</label>
                <input type="text" className="form-control" id="address" name="address"
                       placeholder="Адрес доставки" required={true}/>
            </div>
            <div className="col-12 mb-3">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="isAcceptDeliveryRules"
                           name="isAcceptDeliveryRules"
                           required={true}/>
                    <label className="form-check-label" htmlFor="isAcceptDeliveryRules">
                        Согласен с правилами доставки
                    </label>
                </div>
            </div>
            <div className="col-12">
                <button type="submit" className={"btn btn-outline-light " + styles["submit"]}
                        disabled={positions.length == 0}>Оформить</button>
            </div>
        </form>
    )
}