import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePortalStore } from '../../store/usePortalStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalNovoServico'>;

export function PortalNovoServicoScreen({ navigation }: Props) {
  const addServico = usePortalStore((s) => s.addServico);
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [duracao, setDuracao] = useState('');
  const [preco, setPreco] = useState('');

  function handleSalvar() {
    if (!nome.trim()) return;
    addServico({ nome, categoria, duracao, preco });
    navigation.navigate('PortalServicos');
  }

  return (
    <PortalScreen
      title="Novo serviço"
      activeModule="PortalDashboard"
      onBack={() => navigation.goBack()}
      onNavigateModule={(route) => navigation.navigate(route)}
    >
      <View style={styles.form}>
        <TextField value={nome} onChangeText={setNome} placeholder="Nome do serviço" style={styles.input} />
        <TextField value={categoria} onChangeText={setCategoria} placeholder="Categoria" style={styles.input} />
        <View style={styles.row}>
          <TextField value={duracao} onChangeText={setDuracao} placeholder="Duração" style={[styles.input, styles.rowInput]} />
          <TextField value={preco} onChangeText={setPreco} placeholder="Preço" style={[styles.input, styles.rowInput]} />
        </View>
      </View>

      <Pressable style={styles.saveButton} onPress={handleSalvar}>
        <Text variant="sm" weight="extraBold">
          Salvar serviço
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
  row: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  rowInput: {
    flex: 1,
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
