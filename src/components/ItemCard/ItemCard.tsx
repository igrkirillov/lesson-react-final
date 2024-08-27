import {Item} from "../../types";
import {formatPrice} from "../../utils";
import {NavLink} from "react-router-dom";

export function ItemCard(props: {item: Item}) {
    const {item} = props;
    return (
        <div className="col-4">
            <div className="card catalog-item-card">
                <NavLink to={`/catalog/${item.id}`}>
                    <img src={item.images[0]} className="card-img-top img-fluid" alt={item.title}/>
                </NavLink>
                <div className="card-body">
                    <p className="card-text">{item.title}</p>
                    <p className="card-text">{formatPrice(item.price)} руб.</p>
                    <NavLink to={`/catalog/${item.id}`} className="btn btn-outline-primary">Заказать</NavLink>
                </div>
            </div>
        </div>
    )
}