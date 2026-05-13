import type { ReactElement } from 'react';
import { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CodeInputRow from './CodeInputRow';
import PrimaryButton from './PrimaryButton';
import { useAuth } from '../hooks/useAuth';
import { useAppTheme } from '../../../shared/hooks/useAppTheme';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/types';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Verification'>;
};

export default function VerificationForm({ navigation }: Props): ReactElement {
  const { theme } = useAppTheme();
  const [code1, setCode1] = useState('');
  const [code2, setCode2] = useState('');
  const [code3, setCode3] = useState('');
  const [code4, setCode4] = useState('');

  const { handleVerifyCode, isLoading, error } = useAuth();

  const code = `${code1}${code2}${code3}${code4}`;

  return (
    <View style={{ paddingHorizontal: 24 }}>
      <CodeInputRow values={[code1, code2, code3, code4]} setters={[setCode1, setCode2, setCode3, setCode4]} />

      {error && <Text style={{ color: '#D32F2F', fontSize: 13, fontWeight: '600', marginBottom: 14 }}>{error}</Text>}

      <PrimaryButton disabled={isLoading} onPress={async () => {
        const success = await handleVerifyCode({ code });
        if (success) navigation.navigate('MainTabs');
      }}>
        {isLoading ? 'Verificando...' : 'Continuar'}
      </PrimaryButton>

      <TouchableOpacity style={{ alignItems: 'center', marginTop: 22 }}>
        <Text style={{ color: theme.colors.brandBlue, fontSize: 14, fontWeight: '700' }}>¿No recibiste el código? Reenviar</Text>
      </TouchableOpacity>
    </View>
  );
}
