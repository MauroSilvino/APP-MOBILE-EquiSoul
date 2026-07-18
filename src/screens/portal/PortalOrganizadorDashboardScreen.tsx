import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePortalStore } from '../../store/usePortalStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalOrganizadorDashboard'>;

type Target = 'PortalCriarEvento' | 'PortalParticipantes' | 'PortalCheckin' | null;

export function PortalOrganizadorDashboardScreen({ navigation }: Props) {
  const eventosCriados = usePortalStore((s) => s.eventosCriados);

  const cards: { valor: string; label: string; target: Target }[] = [
    { valor: String(2 + eventosCriados), label: 'Eventos ativos', target: 'PortalCriarEvento' },
    { valor: '184', label: 'Participantes', target: 'PortalParticipantes' },
    { valor: '210', label: 'Ingressos vendidos', target: null },
    { valor: 'R$ 38.900', label: 'Receita', target: null },
    { valor: '3', label: 'Patrocinadores', target: null },
    { valor: '184', label: 'Check-ins', target: 'PortalCheckin' },
    { valor: '4', label: 'Pendências', target: null },
  ];

  return (
    <PortalScreen
      title="Portal do organizador"
      activeModule="PortalOrganizadorDashboard"
      onNavigateModule={(route) => navigation.navigate(route)}
    >
      <View style={styles.grid}>
        {cards.map((c) => (
          <Pressable
            key={c.label}
            style={styles.card}
            disabled={!c.target}
            onPress={() => c.target && navigation.navigate(c.target)}
          >
            <Text variant="lg" weight="extraBold">
              {c.valor}
            </Text>
            <Text variant="xs" weight="semiBold" color="secondary" style={styles.cardLabel}>
              {c.label}
            </Text>
          </Pressable>
        ))}
      </View>
    </PortalScreen>
  );
}

const styles = StyleSheet.create({
  grid: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  card: {
    width: '47%',
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 1,
  },
  cardLabel: {
    marginTop: 2,
  },
});
