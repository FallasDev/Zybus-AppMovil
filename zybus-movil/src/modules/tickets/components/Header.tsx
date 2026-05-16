import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMemo } from 'react';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/types';

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export function Header({ title }: { title: string }) {
  const navigation = useNavigation<NavigationProps>();
  const insets = useSafeAreaInsets();
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  return (
    <View style={[styles.container, { paddingTop: insets.top + 14 }]}>
      <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.arrow}>‹</Text>
      </Pressable>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingBottom: 14,
      backgroundColor: theme.colors.brandBlue,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.border ?? '#eee',
    },
    backButton: {
      width: 38,
      height: 38,
      borderRadius: 19,
      backgroundColor: 'rgba(255,255,255,0.15)',
      alignItems: 'center',
      justifyContent: 'center',
    },
    arrow: {
      fontSize: 26,
      color: theme.colors.white,
      fontWeight: 'bold',
    },
    title: {
      fontSize: 16,
      fontWeight: '700',
      marginLeft: 10,
      color: theme.colors.white,
    },
  });
}