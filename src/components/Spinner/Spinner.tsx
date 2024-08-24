import styles from "./spinner.module.css"
export function Spinner() {
    const getStyleClasses = (...args: string[]): string => {
        return [...args].map(cl => styles[cl]).join(" ");
    }
    return (
        <div className={getStyleClasses("opposites", "center")}>
            <div className={getStyleClasses("opposites", "bl")}></div>
            <div className={getStyleClasses("opposites", "tr")}></div>
            <div className={getStyleClasses("opposites","br")}></div>
            <div className={getStyleClasses("opposites","tl")}></div>
        </div>

    )
}