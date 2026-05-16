import type { ReactElement, ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  children: ReactNode;
  backgroundColor?: string;
  scrollEnabled?: boolean;
  contentContainerStyle?: ViewStyle;
}

export function KeyboardAwareScreen({
  children,
  backgroundColor,
  scrollEnabled = false,
  contentContainerStyle,
}: Props): ReactElement {
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView style={[styles.safe, backgroundColor ? { backgroundColor } : undefined]}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {scrollEnabled ? (
          <ScrollView
            style={styles.flex}
            contentContainerStyle={[
              styles.grow,
              { paddingBottom: Math.max(insets.bottom, 16) },
              contentContainerStyle,
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          children
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  flex: { flex: 1 },
  grow: { flexGrow: 1 },
});
