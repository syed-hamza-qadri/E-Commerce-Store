import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import CategoryChip from "../components/CategoryChip";

function Products() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [chosenCategory, setChosenCategory] = useState("All");
    const [sortOption, setSortOption] = useState('default');

    useEffect(() => {
        console.log("Use effect Call Hogya");
        const url =
            chosenCategory === "All"
                ? "https://dummyjson.com/products"
                : `https://dummyjson.com/products/category/${chosenCategory}`;
        axios
            .get(url)
            .then((res) => {
                setProducts(res.data.products);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, [chosenCategory]);

    useEffect(() => {
        axios
            .get("https://dummyjson.com/products/categories")
            .then((res) => {
                setCategories(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    const handleSort = (option) => {
        setSortOption(option);

        let sortedProducts = [...products];

        if (option === 'priceAsc') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (option === 'priceDesc') {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        setProducts(sortedProducts);
    };


    return (
        <div className="container mx-auto mt-10">
            {loading ? (
                <h1 className="text-center text-3xl">Loading....</h1>
            ) : (
                <div>
                    <div className="flex gap-3 flex-wrap">
                        <CategoryChip
                            onClick={() => setChosenCategory("All")}
                            isChosen={chosenCategory === "All"}
                            category={{
                                slug: "All",
                                name: "All",
                            }}
                        />
                        {categories.map((category) => (
                            <CategoryChip
                                onClick={() => setChosenCategory(category.slug)}
                                isChosen={category.slug === chosenCategory}
                                category={category}
                                key={category.slug}
                            />
                        ))}
                        <div className="ml-auto">
                            <label className="mr-2">Sort by:</label>
                            <select
                                value={sortOption}
                                onChange={(e) => handleSort(e.target.value)}
                                className="p-2 border rounded"
                            >
                                <option value="default">Default</option>
                                <option value="priceAsc">Price: Low to High</option>
                                <option value="priceDesc">Price: High to Low</option>
                            </select>
                        </div>
                    </div>


                    <div className="flex flex-wrap -m-4 my-10">
                        {products.map((item) => (
                            <ProductCard item={item} key={item.id} />
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Products;