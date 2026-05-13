import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../../../navigation/types';


type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export function Header({ title }: { title: string }) {
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.arrow}>‹</Text>
      </Pressable>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor:  '#152f52',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
    color:'#fff',
    fontWeight: 'bold',
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
    color: '#fff',
  },
});