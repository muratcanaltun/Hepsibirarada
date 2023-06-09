import React, {useState, useEffect} from 'react';
import {Button, Grid, Paper, Rating, TextField} from "@mui/material";
import {Link, useNavigate, useParams} from "react-router-dom";
import "./ProductPage.css";
import {addItem} from "../features/cartSlice";
import {useDispatch} from "react-redux";
import request from "../api/request";
import {Form, FormGroup, Input, Label} from "reactstrap";
import axios from "axios";
import Box from "@mui/material/Box";

function ProductPage() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const [product, setProduct] = useState({
        title: " ",
        description: " ",
        imageLink: "",
        price: "",
        category: "",
        productRatings: [],
        count: 1
    });
    let {id} = useParams();

    const [commenterUsername, setCommenterUsername] = useState("");
    const [rating, setRating] = useState("");
    const [comment, setComment] = useState("");

    //get a dummy product and comments according to id
    useEffect(() => {
        const getProduct = async () => {
            const product = await request.product.getProduct(id).then(({data}) => data);
            //set product count or else there is no count here and it fails while adding to cart
            product.count = 1;
            setProduct(product);
        }

        getProduct().catch(e => console.log(e))
    }, [id]);

    const addToCart = () => {
        dispatch(addItem(product));
    }



    const handleSubmit = async (e) => {
        e.preventDefault();

        if(rating < 0 || rating > 5) {
            alert("rating must be between 1-5");
            return;
        }
        await axios.post('http://localhost:8080/products/'+id, {
            commenterUsername: commenterUsername,
            rating: rating,
            comment: comment,
        }, {
            headers: {'Content-Type': 'application/json'}}).then(response => {
            console.log(response);
        })
            .catch(error => {
                console.log(error);
            });
        window.location.reload();
    };

    const editProduct = () => {
        navigate(`/editProduct/${id}`, {replace: true});
    }

    return (<Grid container display="flex" justifyContent="center" className="productPageMain">
            <Link className="foreground" to="/">Return Home</Link>
            <Grid item container xs={12} justifyContent="center" display="flex" spacing={"2px"}
                  className="productPageContainer">
                <Grid item container xs={12} justifyContent="start" flexDirection={'column'} alignItems={'center'}
                      display="flex" padding="3px" marginTop="3vh">
                    <label><b>{product.title}</b></label>
                    {
                        product.productRatings.length > 0 && <Rating
                            name="simple-controlled"
                            value={product.productRatings.reduce((acc, commentInfo) => acc + commentInfo.rating, 0) / product.productRatings.length}
                            readOnly
                            precision={1}
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
                    <Button className="item3" onClick={() => {
                        editProduct();
                    }} variant="contained" sx={{backgroundColor: "rgba(220,72,46,0.72)"}}>Edit Product</Button>
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
                                            precision={1}
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


                <Grid container xs={12}>

                    <Grid item xs={4}>

                        <Form onSubmit={handleSubmit}>
                            <FormGroup style={{padding: "5px"}}>
                                <Input
                                    className="input"
                                    type="text"
                                    name="commenterUsername"
                                    onChange={(e) => setCommenterUsername(e.target.value)}
                                    required
                                    size="20"
                                    placeholder="Username"
                                    minlength="2"
                                    maxlength="20"
                                />
                            </FormGroup>

                            <FormGroup style={{padding: "5px"}}>
                                {" "}
                                <Input
                                    className="input description"
                                    type="textarea"
                                    name="comment"
                                    onChange={(e) => setComment(e.target.value)}
                                    required
                                    placeholder="Comment"
                                    bsSize={'lg'}

                                />
                            </FormGroup>
                            <FormGroup style={{padding: "5px"}}>
                                {" "}

                                <Input
                                    className="input"
                                    type="number"
                                    name="rating"
                                    onChange={(e) => setRating(e.target.value)}
                                    required
                                    placeholder="rating"

                                />

                            </FormGroup>


                            <Button type="submit" className="button" variant="contained" sx={{width: "250px", marginLeft: "5px", backgroundColor: "rgba(220,72,46,0.72)"}}>
                                Add Comment
                            </Button>
                        </Form>

                    </Grid>


                </Grid>




            </Grid>
        </Grid>
    );

}

export default ProductPage;
