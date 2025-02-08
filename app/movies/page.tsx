"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Movie {
    _id: string;
    original_title: string;
    release_date: string;
    poster_path: string;
    price: number;
    movieId?: string;
}

export default function MoviesPage() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [cart, setCart] = useState<Movie[]>([]);
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [showFavorites, setShowFavorites] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);

    useEffect(() => {
        async function checkSession() {
            const { data: session } = await supabase.auth.getSession();
            const user = session?.session?.user;

            if (user?.id) {
                setUserId(user.id);
                fetchFavorites(user.id);
            }
        }
        checkSession();
    }, []);

    useEffect(() => {
        async function fetchMovies() {
            try {
                const response = await fetch("/api/movies");
                if (!response.ok) throw new Error("Error fetching movies");

                const data: Movie[] = await response.json();
                const moviesWithPrice = data.map(movie => ({ ...movie, price: 15 }));
                setMovies(moviesWithPrice);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        }

        fetchMovies();
    }, []);

    const fetchFavorites = async (userId: string) => {
        if (!userId) return;

        const response = await fetch("/api/favorites", {
            headers: { "X-User-Id": userId },
        });

        if (response.ok) {
            const data = await response.json();
            setFavorites(data);
        } else {
            console.error("Error retrieving favorites:", await response.json());
        }
    };

    const toggleFavorite = async (movie: Movie) => {
        if (!userId) {
            alert("You must be logged in to save favorites.");
            return;
        }

        const isFavorite = favorites.some(fav => fav.movieId === movie._id);
        const method = isFavorite ? "DELETE" : "POST";

        const response = await fetch("/api/favorites", {
            method,
            headers: {
                "Content-Type": "application/json",
                "X-User-Id": userId
            },
            body: JSON.stringify({
                movieId: movie._id,
                title: movie.original_title,
                poster_path: movie.poster_path
            })
        });

        if (response.ok) {
            fetchFavorites(userId);
            alert(isFavorite ? "Removed from favorites" : "Added to favorites");
        } else {
            console.error(`Error ${method === "POST" ? "adding" : "removing"} favorite:`, await response.json());
        }
    };

    const toggleCart = (movie: Movie) => {
        if (showFavorites) return;

        setCart(prevCart => {
            const isAlreadyInCart = prevCart.some(m => m._id === movie._id);
            return isAlreadyInCart
                ? prevCart.filter(m => m._id !== movie._id)
                : [...prevCart, movie];
        });
    };

    const totalPrice = cart.reduce((sum, movie) => sum + movie.price, 0);

    const handleCheckout = () => {
        alert(`Payment of ${totalPrice}€ successful!`);
        setCart([]);
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">
                {showFavorites ? "My Favorite Movies" : "Choose Your Movies"}
            </h1>

            <button
                onClick={() => setShowFavorites(!showFavorites)}
                className={`mb-4 px-4 py-2 rounded-lg font-bold 
                ${showFavorites ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'} text-white`}>
                {showFavorites ? 'Back to Movies' : 'View Favorites'}
            </button>

            {movies.length === 0 ? (
                <p className="text-gray-400 text-center">No movies found...</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {(showFavorites ? favorites : movies).map((movie) => (
                        <div
                            key={movie._id}
                            className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden 
                            ${cart.some(m => m._id === movie._id) ? 'border-2 border-green-400' : ''}`}
                        >
                            <div className="relative w-full aspect-[2/3]">
                                <img
                                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                    alt={movie.original_title}
                                    className={`absolute inset-0 w-full h-full object-cover rounded-t-lg 
                                    ${showFavorites ? 'pointer-events-none opacity-80' : 'cursor-pointer'}`}
                                    onClick={() => !showFavorites && toggleCart(movie)}
                                />
                                <button
                                    onClick={(e) => { e.stopPropagation(); toggleFavorite(movie); }}
                                    className="absolute top-2 right-2 bg-gray-800 p-2 rounded-full text-yellow-400 hover:bg-yellow-400 hover:text-gray-900">
                                    {favorites.some(fav => fav.movieId === movie._id) ? '⭐' : '☆'}
                                </button>
                            </div>
                            <div className="p-4 flex justify-between items-center">
                                <h2 className="text-lg font-bold">{movie.original_title}</h2>
                                <p className="text-green-400 font-bold">15€</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!showFavorites && (
                <div className="mt-10 p-6 bg-gray-800 rounded-lg">
                    <h2 className="text-2xl font-bold text-center">Your Cart</h2>
                    {cart.length === 0 ? (
                        <p className="text-gray-400 text-center mt-4">Your cart is empty...</p>
                    ) : (
                        <div>
                            <ul className="mt-4 space-y-2 divide-y divide-gray-600">
                                {cart.map((movie) => (
                                    <li key={movie._id} className="flex justify-between items-center py-2">
                                        <span className="font-semibold">{movie.original_title}</span>
                                        <span className="text-green-400 font-bold">15€</span>
                                    </li>
                                ))}
                            </ul>
                            <p className="text-xl text-green-400 font-bold text-right mt-4">Total: {totalPrice}€</p>
                            <button
                                onClick={handleCheckout}
                                className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg font-bold hover:bg-green-600">
                                Pay Now
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
