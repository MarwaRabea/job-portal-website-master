import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, CardActions, Typography, Button } from '@mui/material';


const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {

        fetch('/api/cart')
            .then((response) => response.json())
            .then((data) => setCartItems(data))
            .catch((error) => console.error('Error fetching cart data:', error));
    }, []);

    const handleRemoveItem = (itemId) => {
        fetch(`/api/cart/${itemId}`, {
            method: 'DELETE',
        })
            .then((response) => response.json())
            .then(() => {
                setCartItems(cartItems.filter((item) => item.id !== itemId));
            });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Shopping Cart
            </Typography>
            {cartItems.length === 0 ? (
                <Typography variant="h6">Your cart is empty.</Typography>
            ) : (
                <Grid container spacing={3}>
                    {cartItems.map((item) => (
                        <Grid item xs={12} sm={6} md={4} key={item.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6">{item.name}</Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Price: ${item.price}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        color="secondary"
                                        variant="outlined"
                                        onClick={() => handleRemoveItem(item.id)}
                                    >
                                        Remove
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            )}
        </Container>
    );
};

export default CartPage;
