import {CatalogMenu} from "./CatalogMenu";

import sandalsMayerImage from "../../assets/img/products/sandals_myer.jpg"
import sandalsKieraImage from "../../assets/img/products/sandals_keira.jpg"
import superHeroSnikersImage from "../../assets/img/products/superhero_sneakers.jpg"

type CatalogProps = {

}
export function Catalog(props: CatalogProps) {
    return (
        <section className="catalog">
            <h2 className="text-center">Каталог</h2>
            <form className="catalog-search-form form-inline">
                <input className="form-control" placeholder="Поиск"/>
            </form>
            <CatalogMenu/>
            <div className="row">
                <div className="col-4">
                    <div className="card catalog-item-card">
                        <img src={sandalsMayerImage} className="card-img-top img-fluid" alt="Босоножки 'MYER'"/>
                        <div className="card-body">
                            <p className="card-text">Босоножки 'MYER'</p>
                            <p className="card-text">34 000 руб.</p>
                            <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card catalog-item-card">
                        <img src={sandalsKieraImage} className="card-img-top img-fluid" alt="Босоножки 'Keira'"/>
                        <div className="card-body">
                            <p className="card-text">Босоножки 'Keira'</p>
                            <p className="card-text">7 600 руб.</p>
                            <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
                        </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card catalog-item-card">
                        <img src={superHeroSnikersImage} className="card-img-top img-fluid"
                             alt="Супергеройские кеды"/>
                            <div className="card-body">
                                <p className="card-text">Супергеройские кеды</p>
                                <p className="card-text">1 400 руб.</p>
                                <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
                            </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card catalog-item-card">
                        <img src={sandalsMayerImage} className="card-img-top img-fluid"
                             alt="Босоножки 'MYER'"/>
                            <div className="card-body">
                                <p className="card-text">Босоножки 'MYER'</p>
                                <p className="card-text">34 000 руб.</p>
                                <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
                            </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card catalog-item-card">
                        <img src={sandalsKieraImage} className="card-img-top img-fluid"
                             alt="Босоножки 'Keira'"/>
                            <div className="card-body">
                                <p className="card-text">Босоножки 'Keira'</p>
                                <p className="card-text">7 600 руб.</p>
                                <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
                            </div>
                    </div>
                </div>
                <div className="col-4">
                    <div className="card catalog-item-card">
                        <img src={superHeroSnikersImage} className="card-img-top img-fluid"
                             alt="Супергеройские кеды"/>
                            <div className="card-body">
                                <p className="card-text">Супергеройские кеды</p>
                                <p className="card-text">1 400 руб.</p>
                                <a href="/products/1.html" className="btn btn-outline-primary">Заказать</a>
                            </div>
                    </div>
                </div>
            </div>
            <div className="text-center">
                <button className="btn btn-outline-primary">Загрузить ещё</button>
            </div>
        </section>
    );
}