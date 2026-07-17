import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { AdminScreen } from '../../components/admin/AdminScreen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useAdminStore } from '../../store/useAdminStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminCriarEvento'>;

export function AdminCriarEventoScreen({ navigation }: Props) {
  const addEvento = useAdminStore((s) => s.addEvento);
  const [titulo, setTitulo] = useState('');
  const [data, setData] = useState('');
  const [organizador, setOrganizador] = useState('');

  function handleSalvar() {
    if (!titulo.trim()) return;
    addEvento({
      titulo,
      organizador: organizador || 'Você',
      participantes: 0,
      ingressos: data ? `agendado · ${data}` : 'agendado',
    });
    navigation.navigate('AdminEventos');
  }

  return (
    <AdminScreen
      title="Criar evento"
      activeRoute="AdminEventos"
      onBack={() => navigation.goBack()}
      onNavigateModule={(route) => navigation.navigate(route)}
      onNavigateUsuario={(id) => navigation.navigate('AdminUsuarioDetalhe', { id })}
      onNavigateCavalo={(id) => navigation.navigate('AdminCavaloDetalhe', { id })}
      onNavigateChamado={(id) => navigation.navigate('AdminChamadoDetalhe', { id })}
    >
      <Text variant="xs" weight="bold" style={styles.fieldLabel}>
        TÍTULO
      </Text>
      <TextField value={titulo} onChangeText={setTitulo} placeholder="Nome do evento" style={styles.input} />

      <Text variant="xs" weight="bold" style={styles.fieldLabel}>
        DATA
      </Text>
      <TextField value={data} onChangeText={setData} placeholder="ex: 20 ago 2026" style={styles.input} />

      <Text variant="xs" weight="bold" style={styles.fieldLabel}>
        ORGANIZADOR
      </Text>
      <TextField
        value={organizador}
        onChangeText={setOrganizador}
        placeholder="Nome do organizador"
        style={styles.input}
      />

      <Pressable style={styles.saveButton} onPress={handleSalvar}>
        <Text variant="sm" weight="extraBold" color={theme.colors.accent.gold}>
          Criar evento
        </Text>
      </Pressable>
    </AdminScreen>
  );
}

const styles = StyleSheet.create({
  fieldLabel: {
    marginTop: theme.spacing.lg,
    letterSpacing: 0.4,
  },
  input: {
    marginTop: theme.spacing.sm,
    height: 46,
  },
  saveButton: {
    marginTop: theme.spacing.xl,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
