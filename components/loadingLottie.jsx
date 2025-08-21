import { View, StyleSheet, Dimensions } from "react-native";
import LottieView from "lottie-react-native";
import { COLORS } from "../constants/colors";
import { applyColorToLottie } from "../utils/lottieColorUtils";

const { width } = Dimensions.get("window");

export default function LoadingLottie({ rawAnimationData }) {
  const animationData = applyColorToLottie(rawAnimationData, COLORS.text);

  return (
    <View style={styles.container}>
      <View style={styles.animationWrapper}>
        <LottieView
          source={animationData}
          autoPlay
          loop
          style={StyleSheet.absoluteFill}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background, // set theme color
    justifyContent: "center", // vertically center
    alignItems: "center", // horizontally center
    zIndex: 999,
  },
  animationWrapper: {
    width: width * 0.5,
    height: width * 0.5,
    justifyContent: "center",
    alignItems: "center",
  },
});
