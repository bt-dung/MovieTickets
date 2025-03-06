import { useEffect, useRef, useState } from "react";
import Isotope from "isotope-layout";
import { fetchData } from "../../../api/api";


const ProductFilter = ({ setSelectedService }) => {
    const gridRef = useRef(null);
    const iso = useRef(null);
    const [products, setProducts] = useState([]);
    const [activeFilter, setActiveFilter] = useState("*");
    const [quantities, setQuantities] = useState({});

    useEffect(() => {
        fetchData("/api/v1/services")
            .then((response) => {
                console.log(response);
                setProducts(response);
                const initialQuantities = response.reduce((acc, product) => {
                    acc[product.id] = 1;
                    return acc;
                }, {});
                setQuantities(initialQuantities);

            })
            .catch((error) => console.error("Error fetching products:", error));
    }, []);
    useEffect(() => {
        if (gridRef.current) {
            iso.current = new Isotope(gridRef.current, {
                itemSelector: ".grid-item",
                layoutMode: "fitRows",
            });
        }
        return () => iso.current?.destroy();
    }, [products]);

    const handleFilter = (filter) => {
        setActiveFilter(filter);
        iso.current.arrange({ filter: filter === "*" ? "*" : `.${filter}` });
    };

    const updateQuantity = (id, type) => {
        setQuantities((prevQuantities) => {
            const newQuantity =
                type === "increase" ? prevQuantities[id] + 1 : Math.max(1, prevQuantities[id] - 1);
            return { ...prevQuantities, [id]: newQuantity };
        });
    };
    const handleAddToCart = (product) => {
        const quantity = quantities[product.id];
        const totalPrice = product.price * quantity;

        setSelectedService((prevSelectedService) => {
            const updatedCategory = prevSelectedService[product.category] || [];
            const existingProductIndex = updatedCategory.findIndex(item => item.id === product.id);

            if (existingProductIndex > -1) {
                updatedCategory[existingProductIndex].quantity = quantity;
                updatedCategory[existingProductIndex].total_price = totalPrice;
            } else {
                updatedCategory.push({
                    id: product.id,
                    name: product.name,
                    quantity: quantity,
                    total_price: totalPrice,
                });
            }

            return {
                ...prevSelectedService,
                [product.category]: updatedCategory,
            };
        });

        console.log(`Đã thêm vào giỏ: ${product.name}, số lượng: ${quantity}, tổng tiền: ${totalPrice.toLocaleString()} Đ`);
    };

    return (
        <div className="grid--area">
            <ul className="filter">
                <li
                    onClick={() => handleFilter("*")}
                    className={activeFilter === "*" ? "active" : ""}
                >
                    All
                </li>
                <li
                    onClick={() => handleFilter("combo")}
                    className={activeFilter === "combo" ? "active" : ""}
                >
                    Combos
                </li>
                <li
                    onClick={() => handleFilter("drink")}
                    className={activeFilter === "drink" ? "active" : ""}
                >
                    Drink
                </li>
                <li
                    onClick={() => handleFilter("popcorn")}
                    className={activeFilter === "popcorn" ? "active" : ""}
                >
                    Popcorn
                </li>
            </ul>

            <div className="grid-area" ref={gridRef}>
                {products.map((product) => (
                    <div key={product.id} className={`grid-item ${product.category}`}>
                        <div className="grid-inner">
                            <div className="grid-thumb">
                                <img src={product.img} alt={product.name} />
                                <div className="offer-tag">{Number(product.price).toLocaleString()} Đ</div>
                                <div className="offer-remainder">
                                    <h6 className="o-title mt-0">{product.discount}%</h6>
                                    <span style={{ color: "white" }}>off</span>
                                </div>
                            </div>
                            <div className="grid-content">
                                <h5 className="subtitle">
                                    <a href="#0">{product.name}</a>
                                </h5>
                                <div className="cart-button">
                                    <div className="cart-plus-minus">
                                        <span className="qtybutton dec" onClick={() => updateQuantity(product.id, "decrease")}>
                                            -
                                        </span>
                                        <input
                                            className="cart-plus-minus-box"
                                            type="text"
                                            value={quantities[product.id]}
                                            readOnly
                                        />
                                        <span className="qtybutton inc" onClick={() => updateQuantity(product.id, "increase")}>
                                            +
                                        </span>
                                    </div>
                                    <button type="button" className="custom-button" onClick={() => handleAddToCart(product)}>
                                        Add
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductFilter;
