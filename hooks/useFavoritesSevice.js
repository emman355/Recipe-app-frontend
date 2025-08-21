import { useClerk, useUser } from '@clerk/clerk-expo';
import { useEffect, useState } from 'react';
import { API_URL } from '../constants/api';
import Toast from "react-native-toast-message";
import { Alert } from 'react-native';

export const useFavoritesService = () => {
    const { signOut } = useClerk();
    const { user } = useUser();
    const [favoriteRecipes, setFavoriteRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const response = await fetch(`${API_URL}/favorites/${user.id}`);
                if (!response.ok) throw new Error("Failed to fetch favorites");

                const favorites = await response.json();
                console.log(favorites, "favorites")

                // transform the data to match the RecipeCard component's expected format
                const transformedFavorites = favorites.map((favorite) => ({
                    ...favorite,
                    id: favorite.recipeId,
                }));

                setFavoriteRecipes(transformedFavorites);
            } catch (error) {
                // Alert.alert("Error", "Failed to load favorites");
                Toast.show({
                    type: "customError",
                    text1: error?.error?.message || `Failed to load favorites: ${error}`,
                    visibilityTime: 3000,
                    position: "top",
                });
            } finally {
                setLoading(false);
            }
        };

        loadFavorites();
    }, [user.id]);

    const handleSignOut = () => {
        // then open modal for confirmation
        setModalVisible(true);
        // Alert.alert("Logout", "Are you sure you want to logout?", [
        //     { text: "Cancel", style: "cancel" },
        //     { text: "Logout", style: "destructive", onPress: signOut },
        // ]);
        // Toast.show("Logout", "Are you sure you want to logout?", [
        //     { text: "Cancel", style: "cancel" },
        //     { text: "Logout", style: "destructive", onPress: signOut },
        // ]);
    };

    const confirmSignOut = () => {
        setModalVisible(false);
        signOut();
        Toast.show({
            type: "customSuccess",
            text1: "Signed out",
        });
    };

    return {
        favoriteRecipes,
        loading,
        handleSignOut,
        confirmSignOut,
        isModalVisible,
        setModalVisible,
    };
};
