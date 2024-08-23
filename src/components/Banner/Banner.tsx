import bannerImage from "../../assets/img/banner.jpg"

export function Banner() {
    return (
        <div className="banner">
            <img src={bannerImage} className="img-fluid" alt="К весне готовы!"/>
            <h2 className="banner-header">К весне готовы!</h2>
        </div>
    )
}