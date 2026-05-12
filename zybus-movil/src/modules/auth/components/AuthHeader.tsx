import type { ReactElement } from 'react';
import { Image, Text, View, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';

interface Props {
  title?: string;
  subtitle?: string;
  showLogo?: boolean;
}

export default function AuthHeader({ title, subtitle, showLogo = true }: Props): ReactElement {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.container}>
      {showLogo && (
        <View style={styles.logoBox}>
          <Image source={require('../../../shared/assets/images/ZybusLogo.png')} style={styles.logoImage} resizeMode="contain" />
        </View>
      )}

      {title ? <Text style={styles.title}>{title}</Text> : null}
      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      alignItems: 'center',
      marginBottom: 8,
    },
    logoBox: {
      alignSelf: 'center',
      width: 150,
      height: 90,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 4,
    },
    logoImage: {
      width: 160,
      height: 160,
    },
    title: {
      fontSize: 26,
      fontWeight: '800',
      color: theme.colors.textPrimary,
      textAlign: 'center',
      marginTop: 4,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 15,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: 18,
      fontWeight: '500',
    },
  });
}
