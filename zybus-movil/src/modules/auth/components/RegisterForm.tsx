import type { ReactElement } from 'react';
import { useState } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import FormInput from './FormInput';
import PrimaryButton from './PrimaryButton';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/types';
import { useAuth } from '../hooks/useAuth';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
};

export default function RegisterForm({ navigation }: Props): ReactElement {
  const { theme } = useAppTheme();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1);

  const [firstName, setFirstName] = useState('');
  const [lastName1, setLastName1] = useState('');
  const [lastName2, setLastName2] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [identificationNumber, setIdentificationNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { handleRegister, isLoading, error } = useAuth();

  return (
    <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 28 }} keyboardShouldPersistTaps="handled" style={{ flex: 1 }}>
        {step === 1 && (
          <>
            <View style={{ flexDirection: 'row', gap: 12 }}>
              <View style={{ flex: 1 }}>
                <FormInput label="Nombre" placeholder="Tu nombre" value={firstName} onChangeText={setFirstName} />
              </View>
              <View style={{ flex: 1 }}>
                <FormInput label="Primer apellido" placeholder="Primer apellido" value={lastName1} onChangeText={setLastName1} />
              </View>
            </View>

            <FormInput label="Segundo apellido" placeholder="Segundo apellido" value={lastName2} onChangeText={setLastName2} />
            <FormInput label="Número de identificación" placeholder="Tu número de identificación" keyboardType="number-pad" value={identificationNumber} onChangeText={setIdentificationNumber} />
          </>
        )}

        {step === 2 && (
          <>
            <FormInput label="Correo electrónico" placeholder="Tu correo electrónico" keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} />
            <FormInput label="Teléfono" placeholder="Tu número de teléfono" keyboardType="phone-pad" value={phone} onChangeText={setPhone} />

            <FormInput label="Contraseña" placeholder="Crea una contraseña" secure value={password} onChangeText={setPassword} />
            <FormInput label="Confirmar contraseña" placeholder="Confirma tu contraseña" secure value={confirmPassword} onChangeText={setConfirmPassword} />

            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginTop: 4, marginBottom: 20 }}>
              <View style={{ width: 22, height: 22, borderRadius: 6, borderWidth: 1, marginRight: 10, marginTop: 1, backgroundColor: theme.colors.surface }} />
              <Text style={{ flex: 1, color: theme.colors.textSecondary, fontSize: 14, lineHeight: 20 }}>
                Acepto los <Text style={{ color: theme.colors.brandBlue, fontWeight: '700' }}>Términos y Condiciones</Text> y la <Text style={{ color: theme.colors.brandBlue, fontWeight: '700' }}>Política de Privacidad</Text>
              </Text>
            </View>
          </>
        )}

        {error && <Text style={{ color: '#D32F2F', fontSize: 13, fontWeight: '600', marginBottom: 14 }}>{error}</Text>}

        <PrimaryButton disabled={isLoading} onPress={async () => {
          if (step === 1) { setStep(2); return; }

          const success = await handleRegister({ firstName, lastName1, lastName2, email, phone, identificationNumber, password, confirmPassword });
          if (success) navigation.navigate('Verification');
        }}>
          {isLoading ? 'Creando cuenta...' : step === 1 ? 'Continuar' : 'Crear cuenta'}
        </PrimaryButton>

        {step === 2 && (
          <TouchableOpacity style={{ alignItems: 'center', marginBottom: 18 }} onPress={() => setStep(1)}>
            <Text style={{ color: theme.colors.brandBlue, fontSize: 15, fontWeight: '700' }}>Volver</Text>
          </TouchableOpacity>
        )}

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 8 }}>
          <Text style={{ color: theme.colors.textSecondary, fontSize: 15 }}>¿Ya tienes una cuenta? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: theme.colors.brandBlue, fontSize: 15, fontWeight: '800' }}>Inicia sesión</Text>
          </TouchableOpacity>
        </View>
    </ScrollView>
  );
}
