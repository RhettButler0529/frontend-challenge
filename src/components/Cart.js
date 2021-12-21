import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Flex, {FlexItem} from "styled-flex-component";
import styled from "styled-components";
import Container from "./Container";
import Row from "./Row";
import {selectItems} from "../state/cart/selectors";
import {keys} from "@material-ui/core/styles/createBreakpoints";
import {configureStore} from "@reduxjs/toolkit";

const CartWrapper = styled(Flex)`
  background-color: #f6f5f5;
  height: 100%;
`;

const ImageWrapper = styled.img`
  height: 75px;
  width: 100%;
`;

const ProductDetails = styled.div`
  padding: 0px 16px;
`;

const Text = styled.h4`
  margin: 0;
`;

const CartItem = ({item}) => {
    return (
        <Flex row>
            <FlexItem grow={1} shrink={1} basis="25%">
                <ImageWrapper src={item.product.imgUrl} alt={item.product.name}/>
            </FlexItem>
            <FlexItem grow={1} shrink={1} basis="50%">
                <ProductDetails>
                    <Text>{item.product.name}</Text>
                </ProductDetails>
            </FlexItem>
            <FlexItem>
                <Text>{`$${item.product.price * item.quantity} ( ${item.product.price}*${item.quantity})`}</Text>
            </FlexItem>
        </Flex>
    );
};

const Cart = () => {
    const cartItems = useSelector(selectItems);
    const [filteredItems, setFilteredItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    useEffect(() => {
        let tempProductList = []
        cartItems.map(item => {
            if (!tempProductList.includes(item.product.name)) {
                tempProductList.push(item.product.name)
            }
        })
        let result = [];
        let totalPrice = 0;
        tempProductList.map(pName => {
            let totalQuantity = 0;
            let tempProduct = cartItems.filter(item =>
                item.product.name == pName
            );
            tempProduct.map(item => totalQuantity += item.quantity);
            result.push({product: tempProduct[0].product, quantity: totalQuantity})
            totalPrice += tempProduct[0].product.price * totalQuantity;
        })

        setFilteredItems(result);
        setTotalPrice(totalPrice);
    }, [cartItems])
    return (
        <CartWrapper column full>
            <Container>
                <h2>Cart {`(${filteredItems && filteredItems.length})`}</h2>
                {filteredItems &&
                filteredItems.map((item) => (
                    <Row key={item.product.id}>
                        <CartItem item={item}/>
                    </Row>
                ))}
                <Text>{`Total : $${totalPrice}`}</Text>
            </Container>
        </CartWrapper>
    );
};

export default Cart;
