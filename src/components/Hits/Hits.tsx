import fishingNetImage from "../../assets/img/products/fishing_net.jpg"
import empressSlippersImage from "../../assets/img/products/empress's_slippers.jpg"
import dreamLoafersImage from "../../assets/img/products/dream_loafers.jpg"

type HitsProps = {

}
export function Hits(props: HitsProps) {
    return (
        <section className="top-sales">
            <h2 className="text-center">Хиты продаж!</h2>
            <div className="row">
                <div className="col-4">
                    <div className="card catalog-item-card">
                        <img src={fishingNetImage} className="card-img-top img-fluid" alt="Босоножки 'MYER'"/>
                            <div className="card-body">
                                <p className="card-text">Босоножки 'MYER'</p>
                                <p className="card-text">34 000 руб.</p>
                                <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
                            </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card catalog-item-card">
                        <img src={empressSlippersImage} className="card-img-top img-fluid" alt="Босоножки 'Keira'"/>
                            <div className="card-body">
                                <p className="card-text">Босоножки 'Keira'</p>
                                <p className="card-text">7 600 руб.</p>
                                <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
                            </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card catalog-item-card">
                        <img src={dreamLoafersImage} className="card-img-top img-fluid" alt="Супергеройские кеды"/>
                            <div className="card-body">
                                <p className="card-text">Супергеройские кеды</p>
                                <p className="card-text">1 400 руб.</p>
                                <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
                            </div>
                    </div>
                </div>
            </div>
        </section>
    );
}