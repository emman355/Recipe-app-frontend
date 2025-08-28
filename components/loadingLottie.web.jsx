import { View, StyleSheet, Dimensions } from "react-native";
import Lottie from "lottie-react";
import { COLORS } from "../constants/colors";
import { applyColorToLottie } from "../utils/lottieColorUtils";

const { width } = Dimensions.get("window");

export default function LoadingLottie({ rawAnimationData }) {
  const animationData = applyColorToLottie(rawAnimationData, COLORS.text);

  return (
    <View style={styles.container}>
      <View style={styles.animationWrapper}>
        <Lottie
          animationData={animationData}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    justifyContent: "center",
    alignItems: "center",
  },
  animationWrapper: {
    width: width * 0.5,
    height: width * 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
});
