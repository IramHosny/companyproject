import React, { useEffect, useState } from 'react';
import './fcss/Panier.css';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, clearCart, decreaseCart, getTotals, removeFromCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import { addorder } from '../redux/orderSlice';
import Swal from 'sweetalert2';

function Panier() {
    const user = useSelector((state) => state.user?.user);
    const dispatch = useDispatch();
    const isAuth = localStorage.getItem("token");
    const cart = useSelector((state) => state.cart);

    const fraisLivraison = 4;

    const handleRemoveItem = (cartItem) => {
        dispatch(removeFromCart(cartItem));
    };

    useEffect(() => {
        dispatch(getTotals());
    }, [cart, dispatch]);

    const [order, setOrder] = useState({
        orderItems: cart.cartItems,
        orderTotal: cart.cartTotalAmount + fraisLivraison,
        orderStatus: "en cours de traitement",
        current_user: user?.email,
        user_adress: user?.adress,
        user_gsm: user?.phonenumber,
        user_fullname: user?.name + " " + user?.lastname,
        date_v: new Date(),
    });

    useEffect(() => {
        setOrder({
            ...order,
            orderItems: cart.cartItems,
            orderTotal: cart.cartTotalAmount + fraisLivraison,
        });
    }, [cart, fraisLivraison]);

    console.log(order);

    return (
        <>
            {isAuth && user?.role === "user" ? (
                <div className='userscontainer'>
                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900" style={{ textAlign: 'center' }}>Mon panier</h1>
                        </div>
                    </header>
                    <div className='userslist'>
                        {cart.cartItems.length === 0 ? (
                            <h4 style={{ textAlign: 'center' }}>Votre panier est vide ! <Link to={"/restaurant"}>commander maintenant </Link> </h4>
                        ) : (
                            <>
                                <table>
                                    <tbody>
                                        <tr>
                                            <th>Article</th>
                                            <th>Prix</th>
                                            <th>Quantité</th>
                                            <th>Total</th>
                                            <th></th>
                                        </tr>
                                        {cart.cartItems.map((cartItem) => (
                                            <tr key={cartItem._id}>
                                                <td>{cartItem.name}</td>
                                                <td>{cartItem.prix} DT</td>
                                                <td>
                                                    <button style={{ border: 'none', background: 'none' }} onClick={() => dispatch(decreaseCart(cartItem))}>-</button>
                                                    {cartItem.cartQuantity}
                                                    <button style={{ border: 'none', background: 'none' }} onClick={() => dispatch(addToCart(cartItem))}>+</button>
                                                </td>
                                                <td>{(cartItem.prix * cartItem.cartQuantity).toFixed(2)} DT</td>
                                                <td>
                                                    <span onClick={() => handleRemoveItem(cartItem)}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width={18} height={18}>
                                                            <path fill='red' d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
                                                        </svg>
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'right' }}>
                                    <span style={{ float: 'right', color: 'red', fontWeight: 'bold' }}>{cart.cartTotalAmount.toFixed(2)} DT</span>
                                    <span style={{ float: 'right', color: 'red', fontWeight: 'bold' }}>Frais de livraison: {fraisLivraison.toFixed(2)} DT</span>
                                    <span style={{ float: 'right', color: 'red', fontWeight: 'bold' }}>Total: {(cart.cartTotalAmount + fraisLivraison).toFixed(2)} DT</span>
                                    <button style={{ border: 'none', marginBottom: '1%', color: 'blue', fontWeight: 'bold' }} onClick={() => {
                                        dispatch(addorder(order));
                                        dispatch(clearCart());
                                        Swal.fire({
                                            title: "Bien fait!",
                                            text: "Votre commande est en cours de traitement!",
                                            icon: "success"
                                        });
                                    }}>Valider ma commande</button>
                                    <button style={{ border: 'none', color: 'blue', fontWeight: 'bold' }} onClick={() => dispatch(clearCart())}>Vider mon panier</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            ) : (
                <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                    <div className="text-center">
                        <p className="text-base font-semibold text-indigo-600">404</p>
                        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page non trouvée</h1>
                        <p className="mt-6 text-base leading-7 text-gray-600">Désolé, nous n'avons pas pu trouver la page que vous recherchez.</p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a
                                href="#"
                                className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                Retour à l'accueil
                            </a>
                            <a href="#" className="text-sm font-semibold text-gray-900">
                                Contacter le support <span aria-hidden="true">&rarr;</span>
                            </a>
                        </div>
                    </div>
                </main>
            )}
        </>
    );
}

export default Panier;