import { ThemedView } from "@/components/ThemedView";
import { Button, Input } from "@/src/atoms";
import { useAuthContext } from "@/src/hooks/AuthContext";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet } from "react-native";

export const LoginScreen = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuthContext();
  const router = useRouter();

  const handleSubmit = async () => {
    const { success } = await login({ username, password });

    if (!success) {
      Alert.alert(
        "Usuário ou Senha incorretos.",
        "Por favor revise as informações!"
      );

      return;
    }

    router.navigate("/(tabs)");
  };

  return (
    <ThemedView style={styles.container}>
      <Input
        label="Usuário *"
        value={username}
        onChangeText={setUsername}
        placeholder="Usuário"
        maxLength={100}
        showCharCount
      />

      <Input
        label="Senha *"
        value={password}
        onChangeText={setPassword}
        placeholder="Senha"
        maxLength={100}
        showCharCount
      />

      <ThemedView style={styles.actions}>
        <Button
          title="Entrar"
          variant="primary"
          onPress={handleSubmit}
          disabled={!username || !password}
          style={styles.submitButton}
        />
      </ThemedView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    padding: 20,
  },
  actions: {
    flexDirection: "row",
    marginTop: 24,
    marginBottom: 20,
  },
  submitButton: {
    flex: 2,
  },
});
