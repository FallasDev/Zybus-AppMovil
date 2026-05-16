import type { ReactElement } from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import { colors } from '../theme/colors';

export function MyStatusBar(): ReactElement {
  return (
    <SafeAreaView style={{ backgroundColor: colors.brandBlue }}>
      <StatusBar
        translucent={false}
        backgroundColor={colors.brandBlue}
        barStyle="light-content"
      />
    </SafeAreaView>
  );
}