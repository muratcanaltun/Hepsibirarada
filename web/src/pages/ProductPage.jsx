import React, {useState, useEffect} from 'react';
import {Button, Grid, Paper, Rating} from "@mui/material";
import {Link, useParams} from "react-router-dom";
import "./ProductPage.css";
import {addItem} from "../features/cartSlice";
import {useDispatch} from "react-redux";
import request from "../api/request";

function ProductPage() {
    const dispatch = useDispatch();
    const [product, setProduct] = useState({title: " ", description: " ", imageLink: "", price: "", category: "", productRatings: []});
    let {id} = useParams();

    //get a dummy product and comments according to id
    useEffect(() => {
        const getProduct = async () => {
            const product = await request.product.getProduct(id).then(({data}) => data)
            setProduct(product)
        }

        getProduct().catch(e => console.log(e))
    }, [id]);

    const addToCart = () => {
        dispatch(addItem(product));
    }

    return (<Grid container display="flex" justifyContent="center" className="productPageMain">
            <Link className="foreground" to="/">Return Home</Link>
            <Grid item container xs={12} justifyContent="center" display="flex" spacing={"2px"}
                  className="productPageContainer">
                <Grid item container xs={12} justifyContent="start" flexDirection={'column'} alignItems={'center'} display="flex" padding="3px" marginTop="3vh">
                    <label><b>{product.title}</b></label>
                    {
                        product.productRatings.length > 0 && <Rating
                            name="simple-controlled"
                            value={product.productRatings.reduce((acc, commentInfo) => acc + commentInfo.rating, 0) / product.productRatings.length}
                            readOnly
                            precision={0.1}
                        />
                    }
                </Grid>
                <Grid item container xs={12} justifyContent="center" display="flex" marginTop="1vh">
                    <img src={product.imageLink} alt={"aa"}/>
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

                {product.productRatings.map((commentInfo) => (
                    <Grid item xs={12}>
                        <Paper style={{padding: "40px 20px", marginTop: 5}}>
                            <Grid container wrap="nowrap" spacing={2}>
                                <Grid justifyContent="left" item xs zeroMinWidth>
                                    <div className={'commentHeaderWrapper'}>
                                        <h4 style={{margin: 0, textAlign: "left"}}>{commentInfo.commenterUsername}</h4>
                                        <Rating
                                            name="simple-controlled"
                                            precision={0.1}
                                            readOnly
                                            value={commentInfo.rating}
                                        />
                                    </div>
                                    <p style={{textAlign: "left"}}>
                                        {commentInfo.comment}
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
