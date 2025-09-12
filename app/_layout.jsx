import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";
import Toast from "react-native-toast-message";
import CustomToast from "../components/CustomToast";
import SafeScreen from "../components/SafeScreen";
import { Provider } from "react-redux";
import { store } from "../store";
import "dotenv/config";

export default function RootLayout() {
  return (
    <ClerkProvider
      tokenCache={tokenCache}
      publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <Provider store={store}>
        <SafeScreen>
          <Slot />
          <Toast
            config={{
              customSuccess: (props) => <CustomToast {...props} />,
              customError: (props) => <CustomToast {...props} />,
            }}
          />
        </SafeScreen>
      </Provider>
    </ClerkProvider>
  );
}
