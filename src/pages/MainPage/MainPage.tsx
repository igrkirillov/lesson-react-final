import {Banner} from "../../components/Banner/Banner";
import {Hits} from "../../components/Hits/Hits";
import {Catalog} from "../../components/Catalog/Catalog";

export function MainPage() {
    return (
        <main className="container">
            <div className="row">
                <div className="col">
                    <Banner/>
                    <Hits/>
                    <Catalog/>
                </div>
            </div>
        </main>
    )
}