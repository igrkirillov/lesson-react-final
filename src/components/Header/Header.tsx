import {useNavigate} from "react-router";
import {MouseEvent} from "react";
import logoIcon from "../../assets/react.svg";

export function Header() {
    const navigate = useNavigate();
    const onHomeClick = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        navigate("/");
    }
    return (
        <header className="header">
            <div className="logo" onClick={onHomeClick}>
                <img src={logoIcon} alt="logo" className="react"/>
                <h1>Shoes shop</h1>
            </div>
            <ul className="menu">
                <li className="menu-item"><a href="#">Меню</a></li>
            </ul>
        </header>
    )
}