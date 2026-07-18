import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePortalStore } from '../../store/usePortalStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalNovaPromocao'>;

export function PortalNovaPromocaoScreen({ navigation }: Props) {
  const addPromocao = usePortalStore((s) => s.addPromocao);
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('');
  const [validade, setValidade] = useState('');

  function handleSalvar() {
    if (!nome.trim()) return;
    addPromocao({ nome, tipo, validade });
    navigation.navigate('PortalPromocoes');
  }

  return (
    <PortalScreen
      title="Nova promoção"
      activeModule="PortalLoja"
      onBack={() => navigation.goBack()}
      onNavigateModule={(route) => navigation.navigate(route)}
    >
      <View style={styles.form}>
        <TextField value={nome} onChangeText={setNome} placeholder="Nome da promoção" style={styles.input} />
        <TextField value={tipo} onChangeText={setTipo} placeholder="Tipo (Frete, Combo, Cupom...)" style={styles.input} />
        <TextField value={validade} onChangeText={setValidade} placeholder="Válida até" style={styles.input} />
      </View>

      <Pressable style={styles.saveButton} onPress={handleSalvar}>
        <Text variant="sm" weight="extraBold">
          Salvar promoção
        </Text>
      </Pressable>
    </PortalScreen>
  );
}

const styles = StyleSheet.create({
  form: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  input: {
    height: 48,
  },
  saveButton: {
    marginTop: theme.spacing.lg,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
