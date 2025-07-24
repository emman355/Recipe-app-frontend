// components/CustomToast.tsx
import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "@/constants/colors";

type Props = {
  text1?: string;
  text2?: string;
  type?: string;
  props?: any;
};

export default function CustomToast({ text1, text2, type }: Props) {
  return (
    <View
      style={[
        styles.container,
        type === "customError" && { borderLeftColor: "#de4a51ff" },
      ]}
    >
      <Text style={styles.title}>{text1}</Text>
      {text2 && <Text style={styles.message}>{text2}</Text>}
    </View>
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
});
