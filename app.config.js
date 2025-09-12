import "dotenv/config"

export default {
  expo: {
    name: "recipe-finder",
    slug: "recipe-finder",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/i1.png",
    scheme: "mobile",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/images/i1.png",
        backgroundColor: "#ffffff",
      },
      edgeToEdgeEnabled: true,
      package: "com.earevalo355.recipefinder",
    },
    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/favicon.png",
    },
    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
    ],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      router: {},
      eas: {
        projectId: "351cc2e7-ee3c-4ca9-bcb2-475849d03236",
      },
      publishableKey: process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY
    },
    owner: "earevalo355",
  },
};