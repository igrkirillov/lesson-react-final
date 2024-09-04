import {FormEvent} from "react";
import styles from "./styles.module.css"
import {useAppSelector} from "../../hooks";
import {basketState} from "../../slices/basket";

export function OrderForm() {
    const {positions} = useAppSelector(basketState);
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }
    return (
        <form onSubmit={onSubmit} className={"w-50 m-auto border border-1 " + styles["form"]}>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">Телефон</label>
                <input type="text" className="form-control" id="phone"
                       placeholder="Ваш телефон" required={true}/>
            </div>
            <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">Адрес доставки</label>
                <input type="text" className="form-control" id="address"
                       placeholder="Адрес доставки" required={true}/>
            </div>
            <div className="col-12 mb-3">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" id="isAcceptDeliveryRules" required={true}/>
                        <label className="form-check-label" htmlFor="gridCheck">
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