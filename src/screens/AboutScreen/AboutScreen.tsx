import React from "react";
import { StyleSheet, Linking, View, ScrollView } from "react-native";
import Constants from "expo-constants";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { PageTemplate } from "@/src/templates";
import { useColorScheme } from "@/hooks/useColorScheme";

export const AboutScreen: React.FC = () => {
  const colorScheme = useColorScheme();

  return (
    <PageTemplate title="" scrollable keyboardAvoiding>
      <ThemedView style={styles.header}>
        <ThemedText type="title">Sobre o App</ThemedText>
        <ThemedText style={styles.subtitle}>
          Conheça o aplicativo que facilita o gerenciamento de suas tarefas.
        </ThemedText>
      </ThemedView>

      <ScrollView contentContainerStyle={styles.content}>
        <ThemedText style={styles.text}>
          Nosso aplicativo foi desenvolvido para fornecer uma maneira simples e
          eficiente de organizar suas tarefas diárias, garantindo produtividade
          e controle em seu dia a dia.
        </ThemedText>

        <View style={styles.links}>
          <ThemedText
            type="link"
            onPress={() => Linking.openURL("mailto:algo@unochapeco.edu.br")}
          >
            Contato: irineu@unochapeco.edu.br
          </ThemedText>

          <ThemedText style={styles.text}>
            <div>
              <p>Desenvolvedores:</p>
              <ul>
                <li>Evandro Weissheimer</li>
                <li>Rafael Krämer da Silva</li>
                <li>Gabriel Ogliari Roncato</li>
                <li>Vitor Matheus Squina</li>
                <li>Luiz Felipe Trindade</li>
              </ul>
            </div>
          </ThemedText>

          <ThemedText
            type="link"
            onPress={() =>
              Linking.openURL(
                "https://github.com/GabrielOgliari/Tanto_Faz_e_Legal"
              )
            }
          >
            Política de Privacidade
          </ThemedText>

          <ThemedText
            type="link"
            onPress={() =>
              Linking.openURL(
                "https://github.com/GabrielOgliari/Tanto_Faz_e_Legal"
              )
            }
          >
            GitHub
          </ThemedText>

          <ThemedText
            type="link"
            onPress={() =>
              Linking.openURL(
                "https://github.com/GabrielOgliari/Tanto_Faz_e_Legal"
              )
            }
          >
            Termos de Uso
          </ThemedText>

          <ThemedText style={styles.version}>
            Versão: {Constants.expoConfig?.version ?? "—"}
          </ThemedText>
        </View>
      </ScrollView>
    </PageTemplate>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
    fontWeight: "500",
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  text: {
    fontSize: 16,
    marginVertical: 8,
    lineHeight: 24,
  },
  links: {
    marginTop: 16,
    gap: 12,
  },
  version: {
    fontSize: 14,
    color: "#999",
    textAlign: "center", // Centraliza a versão
    marginTop: 32, // Adicionando um espaço visual
  },
});
