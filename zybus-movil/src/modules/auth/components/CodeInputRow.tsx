import type { ReactElement } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';

interface Props {
  values: [string, string, string, string];
  setters: [(v: string) => void, (v: string) => void, (v: string) => void, (v: string) => void];
}

export default function CodeInputRow({ values, setters }: Props): ReactElement {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme);

  return (
    <View style={styles.row}>
      {values.map((val, i) => (
        <TextInput
          key={i}
          maxLength={1}
          keyboardType="number-pad"
          value={val}
          onChangeText={setters[i]}
          style={styles.input}
        />
      ))}
    </View>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 28,
    },
    input: {
      width: 68,
      height: 58,
      backgroundColor: theme.colors.inputBackground,
      borderRadius: 12,
      textAlign: 'center',
      fontSize: 22,
      color: theme.colors.textPrimary,
      fontWeight: '700',
    },
  });
}
