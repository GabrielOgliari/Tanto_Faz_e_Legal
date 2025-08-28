import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useThemeColor } from "@/hooks/useThemeColor"; // Importa o hook

export interface PageTemplateProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  scrollable?: boolean;
  keyboardAvoiding?: boolean;
}

export const PageTemplate: React.FC<PageTemplateProps> = ({
  title,
  subtitle,
  children,
  scrollable = false,
  keyboardAvoiding = false,
}) => {
  // Pega a cor do tema
  const backgroundColor = useThemeColor({}, "background");

  const content = (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <ThemedView style={styles.header}>
        <ThemedText type="title">{title}</ThemedText>
        {subtitle && (
          <ThemedText style={styles.subtitle}>{subtitle}</ThemedText>
        )}
      </ThemedView>

      <ThemedView style={styles.content}>{children}</ThemedView>
    </ThemedView>
  );

  if (keyboardAvoiding) {
    return (
      <KeyboardAvoidingView
        style={[styles.keyboardContainer, { backgroundColor }]}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        {scrollable ? (
          <ScrollView
            style={[styles.scrollView, { backgroundColor }]}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {content}
          </ScrollView>
        ) : (
          content
        )}
      </KeyboardAvoidingView>
    );
  }

  return scrollable ? (
    <ScrollView
      style={[styles.scrollView, { backgroundColor }]}
      showsVerticalScrollIndicator={false}
    >
      {content}
    </ScrollView>
  ) : (
    content
  );
};

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 60,
  },
  header: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 100, // Espaço extra para evitar sobreposição com tabs
  },
});
