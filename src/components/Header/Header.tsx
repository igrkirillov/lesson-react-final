import logoImage from "../../assets/img/header-logo.png"
import {useAppDispatch} from "../../hooks";
import {fetchGoods, setSearchText} from "../../slices/catalog";
import {FormEvent, MouseEvent, useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router";
import {NavLink} from "react-router-dom";

export function Header() {
    return (
        <header className="container">
            <div className="row">
                <div className="col">
                    <nav className="navbar navbar-expand-sm navbar-light bg-light">
                        <NavLink to="/" className="navbar-brand">
                            <img src={logoImage} alt="Bosa Noga"/>
                        </NavLink>
                        <div className="collapse navbar-collapse" id="navbarMain">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <NavLink to="/" className="nav-link">Главная</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/catalog" className="nav-link">Каталог</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/about" className="nav-link">О магазине</NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink to="/contacts" className="nav-link">Контакты</NavLink>
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