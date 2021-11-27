import React from "react";
import { View, Text } from "react-native";
import { useAuth } from "../../hooks/auth";

const Home: React.FC = () => {
  const { name } = useAuth();
  return (
    <View>
      <Text>{name}</Text>
    </View>
  );
};

export default Home;
