import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import { Slot } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/colors";
import Toast from "react-native-toast-message";
import CustomToast from "@/components/CustomToast";

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
        <Slot />
        <Toast
          config={{
            customSuccess: (props) => <CustomToast {...props} />,
            customError: (props) => <CustomToast {...props} />,
          }}
        />
      </SafeAreaView>
    </ClerkProvider>
  );
}
