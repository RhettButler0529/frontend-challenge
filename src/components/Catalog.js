import React, {useState} from "react";
import {useSelector} from "react-redux";
import Flex, {FlexItem} from "styled-flex-component";
import Product from "./Product";
import Container from "./Container";
import {selectProducts} from "../state/catalog/selectors";
import {configureStore} from "@reduxjs/toolkit";
import {selectItems} from "../state/cart/selectors";

const Catalog = () => {
    const [keyword, setKeyword] = useState('');
    const products = useSelector(selectProducts);
    const [searchResults, setSearchResults] = React.useState(products);
    const cartItems = useSelector(selectItems);
    const handleSearch = event => {
        setKeyword(event.target.value);
        const result = products.filter(product =>
            product.name.toLowerCase().includes(event.target.value.toLowerCase())
        );
        setSearchResults(result);
    }

    return (
        <Container>
            <input
                type="text"
                placeholder="Search for products"
                value={keyword}
                onChange={handleSearch}
            />
            <p>{searchResults.length} product(s) found</p>
            <Flex full wrap={"true"}>

                {searchResults.map((product) => (
                    <FlexItem key={product.id} grow={1} shrink={1} basis="50%">
                        <Product {...product} />
                    </FlexItem>
                ))}
            </Flex>
        </Container>
    );
};

export default Catalog;
