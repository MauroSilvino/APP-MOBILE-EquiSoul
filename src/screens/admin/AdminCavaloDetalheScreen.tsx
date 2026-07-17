import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { AdminScreen } from '../../components/admin/AdminScreen';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useAdminStore } from '../../store/useAdminStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminCavaloDetalhe'>;

export function AdminCavaloDetalheScreen({ navigation, route }: Props) {
  const { id } = route.params;
  const cavalos = useAdminStore((s) => s.cavalos);
  const cavalo = cavalos.find((c) => c.id === id) ?? cavalos[0];

  return (
    <AdminScreen
      title={`${cavalo.nome} · ${cavalo.idade}`}
      activeRoute="AdminCavalos"
      onBack={() => navigation.goBack()}
      onNavigateModule={(route2) => navigation.navigate(route2)}
      onNavigateUsuario={(uid) => navigation.navigate('AdminUsuarioDetalhe', { id: uid })}
      onNavigateCavalo={(cid) => navigation.navigate('AdminCavaloDetalhe', { id: cid })}
      onNavigateChamado={(chid) => navigation.navigate('AdminChamadoDetalhe', { id: chid })}
    >
      <View style={styles.headerRow}>
        <ImagePlaceholder caption="" style={styles.avatar} />
        <Text variant="sm" weight="semiBold" color="secondary">
          {cavalo.raca} · {cavalo.idade}
        </Text>
      </View>

      <View style={styles.card}>
        <InfoRow label="Tutor" value={cavalo.usuario} />
        <InfoRow label="País" value={cavalo.pais} />
        <InfoRow label="Eventos" value={String(cavalo.eventos)} />
      </View>
    </AdminScreen>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text variant="xs" weight="semiBold" color="secondary">
        {label}
      </Text>
      <Text variant="sm" weight="bold">
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headerRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 14,
  },
  card: {
    marginTop: theme.spacing.lg,
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 14,
    gap: theme.spacing.sm,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 1,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
