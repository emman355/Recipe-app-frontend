// components/CustomToast.tsx
import { Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../constants/colors";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";

type Props = {
  text1?: string;
  text2?: string;
  type?: string;
  props?: any;
};

export default function CustomToast({ text1, text2, type }: Props) {
  return (
    <Animated.View
      entering={FadeInDown.duration(300)}
      exiting={FadeOutUp.duration(200)}
      style={[
        styles.container,
        type === "customError" && styles.error,
        type === "customSuccess" && styles.success,
      ]}
    >
      <Text style={styles.title}>{text1}</Text>
      {text2 && <Text style={styles.message}>{text2}</Text>}
      {type === "customSuccess" ? (
        <Ionicons name="checkmark-circle" size={24} color="#4ade80" />
      ) : (
        <Ionicons name="close-circle" size={24} color="#de4a51" />
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.background,
    padding: 16,
    width: "90%",
    borderRadius: 8,
    borderLeftWidth: 20,
    borderLeftColor: "#4ade80", // green accent
    marginHorizontal: 16,
    marginTop: 50,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
    maxWidth: 600,
    alignSelf: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
    color: COLORS.primary,
  },
  message: {
    fontSize: 14,
    color: COLORS.primary,
    marginTop: 4,
  },
  error: {
    borderLeftColor: "#de4a51",
  },
  success: {
    borderLeftColor: "#4ade80",
  },
});
