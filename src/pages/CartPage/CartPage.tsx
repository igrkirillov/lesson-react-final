import {Basket} from "../../components/Basket/Basket";
import {OrderForm} from "../../components/OrderForm/OrderForm";

export function CartPage() {
    return (
        <main className="container">
            <div className="row">
                <div className="col">
                    <section>
                        <h2 className="text-center">Корзина</h2>
                        <Basket></Basket>
                    </section>
                    <section>
                        <h2 className="text-center">Оформить заказ</h2>
                        <OrderForm></OrderForm>
                    </section>
                </div>
            </div>
        </main>
    )
}