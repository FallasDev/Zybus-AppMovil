import type { ReactElement } from 'react';
import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';

interface Props {
  label?: string;
  placeholder?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  value: string;
  onChangeText: (v: string) => void;
  secure?: boolean;
  keyboardType?: any;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
}

export default function FormInput({ label, placeholder, leftIcon, value, onChangeText, secure, keyboardType, autoCapitalize }: Props): ReactElement {
  const { theme } = useAppTheme();
  const styles = makeStyles(theme);
  const [show, setShow] = useState(false);

  return (
    <View>
      {label ? <Text style={styles.label}>{label}</Text> : null}

      <View style={styles.inputWrapper}>
        {leftIcon && (
          <Ionicons name={leftIcon} size={18} color={theme.colors.textSecondary} style={styles.inputLeftIcon} />
        )}

        <TextInput
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textSecondary}
          secureTextEntry={secure ? !show : false}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
          style={[styles.input, leftIcon ? styles.inputWithLeftIcon : null, secure ? styles.inputWithBothIcons : null]}
        />

        {secure && (
          <TouchableOpacity style={styles.inputRightIconButton} onPress={() => setShow(!show)}>
            <Ionicons name={show ? 'eye-off-outline' : 'eye-outline'} size={20} color={theme.colors.textSecondary} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    label: {
      fontSize: 14,
      fontWeight: '700',
      color: theme.colors.textPrimary,
      marginBottom: 8,
      marginTop: 4,
    },
    input: {
      height: 54,
      backgroundColor: theme.colors.inputBackground ?? theme.colors.surface,
      borderRadius: 8,
      paddingHorizontal: 16,
      fontSize: 15,
      color: theme.colors.textPrimary,
      marginBottom: 12,
    },
    inputWrapper: {
      position: 'relative',
    },
    inputLeftIcon: {
      position: 'absolute',
      left: 16,
      top: 18,
      zIndex: 1,
    },
    inputRightIconButton: {
      position: 'absolute',
      right: 16,
      top: 17,
      zIndex: 1,
    },
    inputWithLeftIcon: {
      paddingLeft: 46,
    },
    inputWithBothIcons: {
      paddingLeft: 46,
      paddingRight: 50,
    },
  });
}
