import {useNavigate, useParams} from "react-router";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {detailInfoState, fetchDetailInfo} from "../../slices/detailInfo";
import {ErrorWidget} from "../../components/ErrorWidget/ErrorWidget";
import {Spinner} from "../../components/Spinner/Spinner";
import {ChangeEvent, FormEvent, MouseEvent, useEffect, useRef, useState} from "react";
import {DetailInfo, StockSize} from "../../types";
import styles from "./item-page.module.css"

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
                    {detailInfo && detailInfo.sizes && detailInfo.sizes.some(s => s.available)
                        ? (<AddToBasketForm detailInfo={detailInfo}/>)
                        : <></>}
                </div>
            </div>
           </section>);
}

function StockSizeWidget(props: {size: StockSize, sizeSelectCb: (size: string) => void}) {
    const {size, sizeSelectCb} = props;
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value) {
            sizeSelectCb(size.size);
        }
    }
    return (
        <>
            <input type="radio"
                   onChange={onChange}
                   className="btn-check" name="options" id={size.size} autoComplete="off"/>
            <label className="btn btn-outline-secondary" htmlFor={size.size}>{size.size}</label>
        </>
    )
}

type FormState = {
    quantity: number | null,
    size: string | null,
    validityMessage: string | null
}

function AddToBasketForm(props: {detailInfo: DetailInfo}) {
    const {detailInfo} = props;
    const [formState, setFormState] = useState<FormState>({quantity: 1, size: null, validityMessage: null});
    const navigate = useNavigate();
    const quantityRef = useRef<HTMLInputElement>(null);
    const setNewQuantity = (value: number) => {
        if (value < 0) {
            // значение должно быть >= 0
            return;
        }
        if (quantityRef.current) {
            quantityRef.current.value = String(value);
        }
        setFormState({...formState, quantity: value, validityMessage: null});
    }
    const onPlusClick = (event: MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        setNewQuantity(Number(formState.quantity) + 1);
    }
    const onMinusClick = (event: MouseEvent<HTMLInputElement>) => {
        event.preventDefault();
        setNewQuantity(Number(formState.quantity) - 1);
    }
    const onQuantityChange = (event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setNewQuantity(event.target.valueAsNumber);
    }
    const validateFields = (size: string | null, quantity: number | null): string => {
        if (!size) {
            return "Не выбран размер!"
        }
        if (!quantity) {
            return "Не выбрано количество!"
        }
        return "";
    }
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validityMessage = validateFields(formState.size, formState.quantity);
        if (!validityMessage) {
            navigate("/cart");
        } else {
            setFormState({...formState, validityMessage: validityMessage});
        }
    }
    const onSizeSelect = (size: string) => {
        setFormState({...formState, size: size, validityMessage: null});
    }
    return (
        <form onSubmit={onSubmit}>
            <div className="row justify-content-center mt-2">
                <div className="col text-center">
                    <span>Размеры в наличии: </span>
                    {detailInfo?.sizes.filter(s => s.available).map(s => (<StockSizeWidget key={s.size} size={s} sizeSelectCb={onSizeSelect}/>))}
                </div>
            </div>
            <div className="row justify-content-center mt-2">
                <div className="col text-center">
                    <div className="w-auto">
                        <input type="button" value="-" className={"btn btn-secondary " + styles["button-incr-decr"]}
                               onClick={onMinusClick}
                               data-field="quantity"/>
                        <input type="number" step="1" max="999" min="0" defaultValue={String(formState.quantity)} name="quantity"
                               onChange={onQuantityChange}
                               ref={quantityRef}
                               className={"border border-secondary text-center " + styles["quantity"]}/>
                        <input type="button" value="+"
                               onClick={onPlusClick}
                               className={"btn btn-secondary " + styles["button-incr-decr"]}
                               data-field="quantity"/>
                    </div>
                </div>
            </div>
            <div className="row justify-content-center mt-2">
                <div className="col">
                    {formState.validityMessage ? (<ValidityErrorMessage message={formState.validityMessage}/>) : (<></>)}
                    <button type="submit" className="btn btn-danger w-100">В корзину</button>
                </div>
            </div>
        </form>
    )
}

function ValidityErrorMessage(props: {message: string}) {
    const {message} = props;
    return <div className="alert alert-danger text-center">{message}</div>
}