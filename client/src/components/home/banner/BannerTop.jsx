import BackgroundURL from "/assets/images/banner/banner04.jpg";
const BannerTop = ({ title, tags = [] }) => {
    return (<section className="details-banner hero-area seat-plan-banner" style={{ backgroundImage: `url(${BackgroundURL})` }}>
        <div className="container">
            <div className="details-banner-wrapper">
                <div class="details-banner-content style-two">
                    <h3 className="title">{title}</h3>
                    <div className="tags">
                        {tags.map((tag, index) => (
                            <a key={index} href="#0">
                                {tag}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </section>)
};
export default BannerTop;