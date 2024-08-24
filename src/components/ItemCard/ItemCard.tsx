import {Item} from "../../types";
import {formatPrice} from "../../utils";

export function ItemCard(props: {item: Item}) {
    const {item} = props;
    return (
        <div className="col-4">
            <div className="card catalog-item-card">
                <img src={item.images[0]} className="card-img-top img-fluid" alt={item.title}/>
                <div className="card-body">
                    <p className="card-text">{item.title}</p>
                    <p className="card-text">{formatPrice(item.price)} руб.</p>
                    <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
                </div>
            </div>
        </div>
    )
}