import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { favoritesStyles } from "../../assets/styles/favorites.styles";
import { COLORS } from "../../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import RecipeCard from "../../components/RecipeCard";
import NoFavoritesFound from "../../components/NoFavoritesFound";
import LoadingLottie from "../../components/loadingLottie";
import loadingJson from "../../assets/animations/Blue_Loading.json";
import { useFavoritesService } from "../../hooks/useFavoritesSevice";
import Modal from "react-native-modal";

const FavoritesScreen = () => {
  const {
    loading,
    handleSignOut,
    confirmSignOut,
    isModalVisible,
    setModalVisible,
    favoriteRecipes,
  } = useFavoritesService();

  if (loading) return <LoadingLottie rawAnimationData={loadingJson} />;

  return (
    <View style={favoritesStyles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={favoritesStyles.header}>
          <Text style={favoritesStyles.title}>Favorites</Text>
          <TouchableOpacity
            style={favoritesStyles.logoutButton}
            onPress={handleSignOut}
          >
            <Ionicons name="log-out-outline" size={22} color={COLORS.text} />
          </TouchableOpacity>
        </View>

        <View style={favoritesStyles.recipesSection}>
          <FlatList
            data={favoriteRecipes}
            renderItem={({ item }) => <RecipeCard recipe={item} />}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            columnWrapperStyle={favoritesStyles.row}
            contentContainerStyle={favoritesStyles.recipesGrid}
            scrollEnabled={false}
            ListEmptyComponent={<NoFavoritesFound />}
          />
        </View>
      </ScrollView>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        animationIn="zoomIn"
        animationOut="zoomOut"
        backdropOpacity={0.4} // dim background
      >
        <View
          style={{
            backgroundColor: "white",
            padding: 24,
            borderRadius: 16,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          {/* Title */}
          <Text
            style={{
              fontSize: 18,
              fontWeight: "600",
              textAlign: "center",
              marginBottom: 8,
            }}
          >
            Are you sure?
          </Text>

          <Text
            style={{
              fontSize: 14,
              textAlign: "center",
              color: "#555",
              marginBottom: 24,
            }}
          >
            You are about to logout. This will end your current session.
          </Text>

          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={{
                flex: 1,
                marginRight: 8,
                padding: 12,
                borderRadius: 12,
                backgroundColor: "#eee",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "500",
                  color: "#333",
                }}
              >
                Cancel
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={confirmSignOut}
              style={{
                flex: 1,
                marginLeft: 8,
                padding: 12,
                borderRadius: 12,
                backgroundColor: "red",
              }}
            >
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "600",
                  color: "white",
                }}
              >
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
export default FavoritesScreen;
