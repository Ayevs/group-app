import { SafeAreaView, Text, Image } from "react-native";
import { useState, useEffect } from "react";

export default function Loading() {
  return (
    <SafeAreaView>
      <Text
        style={{
          textAlign: "center",
          color: "blue",
          paddingTop: "50%",
          fontSize: 40,
        }}
      >
        This is the loading screen
      </Text>
      <Image
        style={{ width: "30%", aspectRatio: 1, marginLeft: "35%" }}
        source={{
          uri: "https://media.tenor.com/JBgYqrobdxsAAAAi/loading.gif",
        }}
      />
    </SafeAreaView>
  );
}
