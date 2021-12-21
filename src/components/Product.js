import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {addItem} from "../state/cart/slice";
import styled from "styled-components";
import {TextField} from "@material-ui/core";

const ProductWrapper = styled.div`
  padding: 24px;
  position: relative;
`;

const ImageWrapper = styled.img`
  width: 100%;
  margin-bottom: 16px;
`;

const Button = styled.button`
  //width: 100%;
  background: #eaf5fe;
  color: #2b99f2;
  padding: 12px 0px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;
  border: none;
  cursor: pointer;
`;

const Badge = styled.span`
  background-color: #36b37e;
  color: white;
  padding: 4px 16px;
  border-radius: 16px;
  position: absolute;
  left: 36px;
  top: 36px;
`;

const Product = (product) => {
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const handleAdd = (product, quantity) => {
        dispatch(addItem({product, quantity}))
    };
    return (
        <ProductWrapper>
            {product.inventory == 0 ? <Badge>Out of Stock</Badge> : <Badge>In Stock</Badge>}
            <ImageWrapper src={product.imgUrl} alt={product.name} style={{opacity: product.inventory == 0 ? 0.2 : 1}}/>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <h4>${product.price}</h4>
            <div style={{justifyContent: 'space-between', flexDirection: 'row', width: '100%'}}>
                <Button style={{width: 20, backgroundColor: 'white'}} onClick={() => {
                    if (quantity != 1) {
                        setQuantity(quantity - 1);
                    }
                }}> - </Button>
                <TextField
                    type={'number'}
                    style={{width: '20%'}}
                    inputProps={{"min": 1, "max": product.inventory, style: {textAlign: 'center'}}}
                    value={quantity}
                    onChange={(event) => {
                        if (event.target.value > 0 && event.target.value <= product.inventory )
                            setQuantity(event.target.value)
                    }}
                ></TextField>
                <Button style={{width: 20, marginRight: 20, backgroundColor: 'white'}} onClick={() => {
                    if (quantity != product.inventory) {
                        setQuantity(quantity + 1);
                    }
                }}> + </Button>
                <Button disabled={product.inventory == 0 ? true : false} onClick={() => handleAdd(product, quantity)}>Add to
                    cart</Button>
            </div>

        </ProductWrapper>
    );
};

export default Product;
