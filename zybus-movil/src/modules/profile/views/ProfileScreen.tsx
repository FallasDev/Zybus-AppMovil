import type { ReactElement } from 'react';
import { useEffect, useMemo, useState } from 'react';
import { Alert, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { AppTheme } from '../../../shared/theme/types';
import { LoadingState } from '../../../shared/components';
import { PROFILE_TEXT } from '../constants/profile.constants';
import { useProfile } from '../hooks/useProfile';

export function ProfileScreen(): ReactElement {
  const navigation = useNavigation();
  const { theme } = useAppTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  const { profile, isLoading, error, handleUpdateProfile } = useProfile();

  const [firstName, setFirstName] = useState('');
  const [lastName1, setLastName1] = useState('');
  const [lastName2, setLastName2] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [identificationNumber, setIdentificationNumber] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (!profile) return;

    setFirstName(profile.firstName);
    setLastName1(profile.lastName1 ?? '');
    setLastName2(profile.lastName2 ?? '');
    setEmail(profile.email);
    setPhone(profile.phone);
    setIdentificationNumber(profile.identificationNumber);
    setAddress(profile.address ?? '');
  }, [profile]);

  if (isLoading && !profile) {
    return <LoadingState message="Cargando perfil..." />;
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={24} color={theme.colors.textPrimary} />
          </TouchableOpacity>

          <View style={styles.headerTextBox}>
            <Text style={styles.headerTitle}>{PROFILE_TEXT.TITLE}</Text>
            <Text style={styles.headerSubtitle}>{PROFILE_TEXT.SUBTITLE}</Text>
          </View>

          <View style={styles.headerSpacer} />
        </View>

        <View style={styles.avatarSection}>
          <View style={styles.avatarBorder}>
            <View style={styles.avatar}>
              {profile?.profileImage ? (
                <Image source={{ uri: profile.profileImage }} style={styles.avatarImage} />
              ) : (
                <Text style={styles.avatarText}>
                  {(firstName || 'U').charAt(0).toUpperCase()}
                  {(lastName1 || '').charAt(0).toUpperCase()}
                </Text>
              )}
            </View>
          </View>

          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => Alert.alert('Próximamente', 'Cambio de foto próximamente.')}>
            <Ionicons name="camera-outline" size={24} color={theme.colors.white} />
          </TouchableOpacity>
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Ionicons name="person-outline" size={22} color={theme.colors.brandBlue} />
            </View>
            <Text style={styles.sectionTitle}>Información personal</Text>
          </View>

          <TextInput
            value={firstName}
            onChangeText={setFirstName}
            placeholder="Nombre"
            placeholderTextColor={theme.colors.textSecondary}
            style={styles.input}
          />

          <View style={styles.row}>
            <TextInput
              value={lastName1}
              onChangeText={setLastName1}
              placeholder="Primer apellido"
              placeholderTextColor={theme.colors.textSecondary}
              style={[styles.input, styles.halfInput]}
            />

            <TextInput
              value={lastName2}
              onChangeText={setLastName2}
              placeholder="Segundo apellido"
              placeholderTextColor={theme.colors.textSecondary}
              style={[styles.input, styles.halfInput]}
            />
          </View>

          <TextInput
            value={identificationNumber}
            onChangeText={setIdentificationNumber}
            placeholder="Número de identificación"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="number-pad"
            style={styles.input}
          />
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Ionicons name="call-outline" size={22} color={theme.colors.brandBlue} />
            </View>
            <Text style={styles.sectionTitle}>Contacto</Text>
          </View>

          <TextInput
            value={email}
            onChangeText={setEmail}
            placeholder="Correo electrónico"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="email-address"
            autoCapitalize="none"
            style={styles.input}
          />

          <TextInput
            value={phone}
            onChangeText={setPhone}
            placeholder="Teléfono"
            placeholderTextColor={theme.colors.textSecondary}
            keyboardType="phone-pad"
            style={styles.input}
          />
        </View>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Ionicons name="location-outline" size={22} color={theme.colors.brandBlue} />
            </View>
            <Text style={styles.sectionTitle}>Dirección</Text>
          </View>

          <TextInput
            value={address}
            onChangeText={setAddress}
            placeholder="Dirección"
            placeholderTextColor={theme.colors.textSecondary}
            style={styles.input}
          />
        </View>

        <View style={styles.securityCard}>
          <View style={styles.securityIcon}>
            <Ionicons name="shield-checkmark" size={24} color={theme.colors.white} />
          </View>

          <View style={styles.securityTextBox}>
            <Text style={styles.securityTitle}>Tu información está segura</Text>
            <Text style={styles.securityText}>
              En Zybus protegemos tus datos personales y nunca los compartimos.
            </Text>
          </View>
        </View>

        {error && <Text style={styles.errorText}>{error}</Text>}

        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.saveButton}
          disabled={isLoading}
          onPress={async () => {
            const success = await handleUpdateProfile({
              firstName,
              lastName1,
              lastName2,
              email,
              phone,
              identificationNumber,
              address,
              profileImage: profile?.profileImage ?? '',
            });

            if (success) {
              Alert.alert('Perfil actualizado', 'Tus datos se guardaron correctamente.');
            }
          }}
        >
          <Ionicons name="checkmark" size={22} color={theme.colors.white} />
          <Text style={styles.saveButtonText}>
            {isLoading ? 'Guardando...' : PROFILE_TEXT.SAVE_BUTTON}
          </Text>
        </TouchableOpacity>

        <View style={styles.privacyRow}>
          <Ionicons name="lock-closed" size={14} color={theme.colors.textSecondary} />
          <Text style={styles.privacyText}>Solo tú puedes ver esta información</Text>
        </View>
      </ScrollView>
    </View>
  );
}

function makeStyles(theme: AppTheme) {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      paddingHorizontal: 18,
      paddingTop: 52,
      paddingBottom: 36,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 22,
    },
    backBtn: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: theme.colors.surface,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: theme.colors.black,
      shadowOpacity: 0.06,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 2 },
      elevation: 2,
    },
    headerTextBox: {
      flex: 1,
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: theme.typography.xl,
      fontWeight: '800',
      color: theme.colors.textPrimary,
      marginBottom: 4,
    },
    headerSubtitle: {
      fontSize: theme.typography.sm,
      color: theme.colors.textSecondary,
    },
    headerSpacer: {
      width: 42,
    },
    avatarSection: {
      alignItems: 'center',
      marginBottom: 26,
    },
    avatarBorder: {
      width: 148,
      height: 148,
      borderRadius: 74,
      borderWidth: 3,
      borderColor: theme.colors.brandBlue,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.surface,
    },
    avatar: {
      width: 132,
      height: 132,
      borderRadius: 66,
      backgroundColor: theme.colors.brandBlue,
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    },
    avatarImage: {
      width: '100%',
      height: '100%',
    },
    avatarText: {
      color: theme.colors.white,
      fontSize: 38,
      fontWeight: '800',
    },
    cameraButton: {
      width: 52,
      height: 52,
      borderRadius: 26,
      backgroundColor: theme.colors.brandBlue,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: -42,
      marginLeft: 110,
      borderWidth: 4,
      borderColor: theme.colors.surface,
    },
    card: {
      backgroundColor: theme.colors.surface,
      borderRadius: 22,
      padding: 18,
      marginBottom: 14,
      shadowColor: theme.colors.black,
      shadowOpacity: 0.05,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 3 },
      elevation: 2,
    },
    sectionHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 16,
      gap: 12,
    },
    sectionIcon: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: theme.colors.surfaceAlt,
      alignItems: 'center',
      justifyContent: 'center',
    },
    sectionTitle: {
      fontSize: theme.typography.lg,
      fontWeight: '800',
      color: theme.colors.textPrimary,
    },
    row: {
      flexDirection: 'row',
      gap: 10,
    },
    input: {
      height: 58,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.colors.border,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: 14,
      fontSize: theme.typography.sm,
      color: theme.colors.textPrimary,
      marginBottom: 12,
    },
    halfInput: {
      flex: 1,
    },
    securityCard: {
      backgroundColor: theme.colors.surfaceAlt,
      borderRadius: 18,
      padding: 18,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 14,
      marginTop: 4,
      marginBottom: 18,
    },
    securityIcon: {
      width: 42,
      height: 42,
      borderRadius: 21,
      backgroundColor: theme.colors.brandBlue,
      alignItems: 'center',
      justifyContent: 'center',
    },
    securityTextBox: {
      flex: 1,
    },
    securityTitle: {
      color: theme.colors.brandBlue,
      fontSize: theme.typography.sm,
      fontWeight: '800',
      marginBottom: 4,
    },
    securityText: {
      color: theme.colors.textPrimary,
      fontSize: theme.typography.xs,
      lineHeight: 18,
    },
    errorText: {
      color: theme.colors.error,
      fontSize: theme.typography.xs,
      fontWeight: '600',
      marginBottom: 14,
    },
    saveButton: {
      height: 58,
      borderRadius: 14,
      backgroundColor: theme.colors.brandBlue,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      marginBottom: 16,
    },
    saveButtonText: {
      color: theme.colors.white,
      fontSize: theme.typography.md,
      fontWeight: '800',
    },
    privacyRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
    },
    privacyText: {
      color: theme.colors.textSecondary,
      fontSize: theme.typography.xs,
      fontWeight: '500',
    },
  });
}