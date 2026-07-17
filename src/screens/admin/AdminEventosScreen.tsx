import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View } from 'react-native';
import { AdminScreen } from '../../components/admin/AdminScreen';
import { PlusIcon } from '../../components/ui/icons';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useAdminStore } from '../../store/useAdminStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminEventos'>;

export function AdminEventosScreen({ navigation }: Props) {
  const eventosAdmin = useAdminStore((s) => s.eventosAdmin);

  return (
    <AdminScreen
      title="Eventos"
      activeRoute="AdminEventos"
      onNavigateModule={(route) => navigation.navigate(route)}
      onNavigateUsuario={(id) => navigation.navigate('AdminUsuarioDetalhe', { id })}
      onNavigateCavalo={(id) => navigation.navigate('AdminCavaloDetalhe', { id })}
      onNavigateChamado={(id) => navigation.navigate('AdminChamadoDetalhe', { id })}
      headerRight={
        <Pressable
          style={styles.addButton}
          onPress={() => navigation.navigate('AdminCriarEvento')}
          accessibilityLabel="Criar evento"
        >
          <PlusIcon size={14} />
        </Pressable>
      }
    >
      <View style={styles.list}>
        {eventosAdmin.map((e, i) => (
          <View key={`${e.titulo}-${i}`} style={styles.card}>
            <Text variant="sm" weight="bold">
              {e.titulo}
            </Text>
            <Text variant="xs" weight="medium" color="secondary" style={styles.meta}>
              {e.organizador} · {e.participantes} participantes · {e.ingressos}
            </Text>
          </View>
        ))}
      </View>
    </AdminScreen>
  );
}

const styles = StyleSheet.create({
  addButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  card: {
    borderRadius: 14,
    backgroundColor: '#fff',
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 1,
  },
  meta: {
    marginTop: 3,
  },
});
