import React, {useState} from 'react';
import "./SearchComponent.css";
import {useSelector} from "react-redux";
import {Button, Grid, Paper} from "@mui/material";
import {addItem, myIndexOf} from "../../features/cartSlice";
import {useNavigate} from "react-router-dom";

function SearchComponent() {

    const products = useSelector((state) => state.products.productsArray);



    const [search, setSearch] = useState("");

    const filteredProducts = products.filter((product) => {
        if (
            product.title.toLowerCase().includes(search) ||
            product.category.toLowerCase().includes(search)
        ) {
            return product;
        }
    });


    let navigate = useNavigate();

    //navigate the user when they click an item
    const navigator = (productId) => {
        navigate(`/product/${productId}`, {replace: true})
    }



    return (
        <div className="searchBarSection">
            <div className="searchBarHolder">
                <div className="searchBar">
                    <input
                        className="input"
                        placeholder="Search"
                        onChange={(e) => {
                            setSearch(e.target.value.toLowerCase());
                        }}
                    />
                </div>
            </div>


                <Grid className="Main" container xs={12} md={10} justifyContent="center">
                {filteredProducts.map((product) => (
                    <Grid className="paperHolder" item xs={2.5}  >
                        <Paper className="paper">
                            <img alt="product" onClick={() => {
                                navigator(product.id)
                            }} src={product.imageLink}/>
                            <Grid container display="flex" justifyContent="center" className="infoHolder">
                                <Grid item justifyContent="center" xs={12} className="item1">
                                    <h4 style={{display: 'flex', justifyContent: 'center'}}>{product.title}</h4>
                                </Grid>
                                <Grid item xs={12} className="item2">
                                    <h3 style={{display: 'flex', justifyContent: 'center'}}>${product.price}</h3>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                ))}
                </Grid>

        </div>
    );
}

export default SearchComponent;