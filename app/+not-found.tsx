import { Stack, useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Text, Button, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function NotFoundScreen() {

  const router = useRouter()
  const { colors } = useTheme()

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />

      <View
        style={[
          styles.container,
          { backgroundColor: colors.background },
        ]}
      >
        <MaterialCommunityIcons
          name="trophy-outline"
          size={90}
          color={colors.primary}
        />

        <Text
          variant="headlineSmall"
          style={[styles.title, { color: colors.surface }]}
        >
          This screen doesn't exist.
        </Text>

        <Button
          mode="contained"
          onPress={() => router.replace("/")}
          style={styles.button}
          contentStyle={styles.buttonContent}
        >
          Go to Home
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  title: {
    marginTop: 24,
    textAlign: "center",
  },
  button: {
    marginTop: 32,
    borderRadius: 12,
  },
  buttonContent: {
    paddingHorizontal: 24,
    paddingVertical: 8,
  },
});
