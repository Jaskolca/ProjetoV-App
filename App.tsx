import React from "react";
import { StatusBar, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import { AuthProvider } from "./src/hooks/auth";
import Routes from "./src/routes";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />

      <AuthProvider>
        <View style={{ flex: 1 }}>
          <Routes />
        </View>
      </AuthProvider>
    </NavigationContainer>
  );
}
