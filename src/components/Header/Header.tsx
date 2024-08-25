import logoImage from "../../assets/img/header-logo.png"
import {useAppDispatch} from "../../hooks";
import {fetchGoods, setSearchText} from "../../slices/catalog";
import {FormEvent, MouseEvent, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router";

export function Header() {
    return (
        <header className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <a className="navbar-brand" href="/">
                            <img src={logoImage} alt="Bosa Noga"/>
                        </a>
                        <div className="collapse navbar-collapse" id="navbarMain">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/">Главная</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/catalog">Каталог</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/about">О магазине</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="/contacts">Контакты</a>
                                </li>
                            </ul>
                            <div className="navbar-collapse">
                                <ActionsBar/>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    )
}

function ActionsBar() {
    const searchFormRef = useRef<HTMLFormElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [invisibleSearchForm, setInvisibleSearchForm] = useState<boolean>(true);
    const onSubmitSearchForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const searchText = searchInputRef.current ? searchInputRef.current.value.trim() : null;
        dispatch(setSearchText(searchText));
        dispatch(fetchGoods());
        navigate("/catalog#search")
        searchFormRef.current?.reset()
    }
    const onClickSearchIcon = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (!invisibleSearchForm && searchInputRef.current?.value) {
            navigate("/catalog#search")
        }
        setInvisibleSearchForm(!invisibleSearchForm);
    }
    useEffect(() => {
        if (!invisibleSearchForm) {
            searchInputRef.current?.focus();
        }
    }, [invisibleSearchForm])
    return (
        <>
            <div className="header-controls-pics">
                <div data-id="search-expander"
                     className="header-controls-pic header-controls-search"
                     onClick={onClickSearchIcon}>
                </div>
                <div className="header-controls-pic header-controls-cart">
                    <div className="header-controls-cart-full">1</div>
                    <div className="header-controls-cart-menu"></div>
                </div>
            </div>
            <form ref={searchFormRef}
                  onSubmit={onSubmitSearchForm}
                  data-id="search-form"
                  className={"header-controls-search-form form-inline" + (invisibleSearchForm ? " invisible" : "")}>
                <input className="form-control"
                       ref={searchInputRef}
                       placeholder="Поиск"/>
            </form>
        </>
    )
}