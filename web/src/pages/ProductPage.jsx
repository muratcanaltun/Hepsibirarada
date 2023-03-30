import React, {useState} from 'react';
import {Button, Grid, Paper} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import axios from "axios";
import "./ProductPage.css";
import CartFab from "../components/CartFab";
import PersistentDrawerRight from "../components/PersistentDrawerRight";
import {addItem} from "../features/cartSlice";
import {useDispatch} from "react-redux";

function ProductPage() {
    const dispatch = useDispatch();
    const [product, setProduct] = useState({title: " ", description: " ", image: "", price: "", category: ""});
    const [comments, setComments] = useState([]);
    let {id} = useParams();

    React.useEffect(() => {
        let myInd = 0;
        if (id === undefined) {
            myInd = 0
        } else {
            myInd = parseInt(id);
        }
        axios.get(`https://fakestoreapi.com/products/${myInd}`).then((response) => {
            setProduct(response.data);
        });
        axios.get(`https://dummyjson.com/comments/post/${myInd}`).then((response) => {
            console.log(response.data.comments);
            setComments(response.data.comments);
            console.log(comments);
        });
    }, [id, comments]);

    const addToCart = () => {
        dispatch(addItem(product));
    }

    return (<Grid container display="flex" justifyContent="center" className="productPageMain">
            <CartFab/>
            <PersistentDrawerRight/>
            <Link className="foreground" to="/">Return Home</Link>
            <Grid item container xs={12} justifyContent="center" display="flex" spacing={"2px"}
                  className="productPageContainer">
                <Grid item container xs={12} justifyContent="center" display="flex" padding="3px" marginTop="3vh">
                    <label>{product.title}</label>
                </Grid>
                <Grid item container xs={12} justifyContent="center" display="flex" marginTop="1vh">
                    <img src={product.image} alt={"aa"}/>
                </Grid>
                <Grid item container xs={12} justifyContent="center" display="flex" marginTop="2vh">
                    <label className="foreground">{product.category}</label>
                </Grid>
                <Grid item container xs={12} justifyContent="center" display="flex" marginTop="2vh">
                    <Button className="item3" onClick={() => {
                        addToCart();
                    }} variant="contained" sx={{backgroundColor: "rgba(220,72,46,0.72)"}}>Add To Cart</Button>
                </Grid>
                <Grid item container xs={12} justifyContent="center" display="flex" marginTop="2vh">
                    <label className="foreground">{product.description}</label>
                </Grid>
                <Grid item container xs={12} justifyContent="center" display="flex" marginTop="2vh">
                    <label className="foreground">${product.price}</label>
                </Grid>

            </Grid>

            <Grid className="Main" container xs={12} md={10}>
                <label>Comments</label>

                {comments.map((comment, index) => (
                    <Grid item xs={12}>
                        <Paper style={{padding: "40px 20px", marginTop: 5}}>
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid justifyContent="left" item xs zeroMinWidth>
                                    <h4 style={{margin: 0, textAlign: "left"}}>{comment.user.username}</h4>
                                    <p style={{textAlign: "left"}}>
                                        {comment.body}
                                    </p>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Grid>
    );

}
export default ProductPage;
