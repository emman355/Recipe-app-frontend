import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";
import Toast from "react-native-toast-message";
import CustomToast from "@/components/CustomToast";
import SafeScreen from "@/components/SafeScreen";

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeScreen>
        <Slot />
        <Toast
          config={{
            customSuccess: (props) => <CustomToast {...props} />,
            customError: (props) => <CustomToast {...props} />,
          }}
        />
      </SafeScreen>
    </ClerkProvider>
  );
}
