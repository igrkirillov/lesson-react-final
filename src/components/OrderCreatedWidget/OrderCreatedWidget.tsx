import {NavLink} from "react-router-dom";
import congratulationsIcon from "../../assets/img/congratulations.png"

export function OrderCreatedWidget() {
    return (
        <div className="text-center">
            <div className="mb-3"><img src={congratulationsIcon}/></div>
            <div className="mb-3">Заказ успешно создан</div>
            <div className="mb-3">
                <NavLink to={`/`} className="btn btn-outline-primary">Перейти на главную</NavLink>
            </div>
        </div>
    )
}