import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { Chip } from '../../components/ui/Chip';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePortalStore } from '../../store/usePortalStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalCriarEvento'>;

const CATEGORIAS = ['Salto', 'Adestramento', 'Enduro', 'Rédeas', 'Passeio', 'Exposição'];

export function PortalCriarEventoScreen({ navigation }: Props) {
  const addEvento = usePortalStore((s) => s.addEvento);
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [inicio, setInicio] = useState('');
  const [fim, setFim] = useState('');
  const [local, setLocal] = useState('');
  const [capacidade, setCapacidade] = useState('');
  const [categoria, setCategoria] = useState<(typeof CATEGORIAS)[number]>('Salto');

  function handlePublicar() {
    if (!titulo.trim()) return;
    addEvento();
    navigation.navigate('PortalOrganizadorDashboard');
  }

  return (
    <PortalScreen
      title="Criar evento"
      activeModule="PortalOrganizadorDashboard"
      onBack={() => navigation.goBack()}
      onNavigateModule={(route) => navigation.navigate(route)}
    >
      <View style={styles.form}>
        <TextField value={titulo} onChangeText={setTitulo} placeholder="Nome do evento" style={styles.input} />
        <TextField
          value={descricao}
          onChangeText={setDescricao}
          placeholder="Descrição"
          multiline
          numberOfLines={3}
          style={styles.textarea}
        />
        <View style={styles.row}>
          <TextField value={inicio} onChangeText={setInicio} placeholder="Data início" style={[styles.input, styles.rowInput]} />
          <TextField value={fim} onChangeText={setFim} placeholder="Data fim" style={[styles.input, styles.rowInput]} />
        </View>
        <TextField value={local} onChangeText={setLocal} placeholder="Local" style={styles.input} />
        <TextField value={capacidade} onChangeText={setCapacidade} placeholder="Capacidade" style={styles.input} />
      </View>

      <Text variant="xs" weight="bold" style={styles.sectionTitle}>
        CATEGORIA
      </Text>
      <View style={styles.chipsRow}>
        {CATEGORIAS.map((c) => (
          <Chip key={c} label={c} selected={categoria === c} onPress={() => setCategoria(c)} />
        ))}
      </View>

      <Pressable style={styles.saveButton} onPress={handlePublicar}>
        <Text variant="sm" weight="extraBold">
          Publicar evento
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
  textarea: {
    height: 88,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  rowInput: {
    flex: 1,
  },
  sectionTitle: {
    marginTop: theme.spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  chipsRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
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
