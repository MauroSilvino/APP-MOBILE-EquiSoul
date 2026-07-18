import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePortalStore } from '../../store/usePortalStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalAvaliacoes'>;

export function PortalAvaliacoesScreen({ navigation }: Props) {
  const avaliacoes = usePortalStore((s) => s.avaliacoes);

  return (
    <PortalScreen
      title="Avaliações"
      activeModule="PortalDashboard"
      onBack={() => navigation.goBack()}
      onNavigateModule={(route) => navigation.navigate(route)}
    >
      <View style={styles.aiCard}>
        <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.aiLabel}>
          RESUMO DA IA
        </Text>
        <Text variant="sm" weight="medium" style={styles.aiText}>
          Clientes elogiam a pontualidade e o cuidado durante os atendimentos. A comunicação clara é um ponto
          recorrente.
        </Text>
      </View>

      <View style={styles.list}>
        {avaliacoes.map((a) => (
          <View key={a.nome} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text variant="sm" weight="bold">
                {a.nome}
              </Text>
              <Text variant="sm" weight="bold" color={theme.colors.accent.leather}>
                ★ {a.nota}
              </Text>
            </View>
            <Text variant="xs" weight="medium" color="secondary" style={styles.comentario}>
              {a.comentario}
            </Text>
          </View>
        ))}
      </View>
    </PortalScreen>
  );
}

const styles = StyleSheet.create({
  aiCard: {
    marginTop: theme.spacing.md,
    borderRadius: 18,
    backgroundColor: 'rgba(201,161,90,0.12)',
    padding: theme.spacing.md,
  },
  aiLabel: {
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  aiText: {
    marginTop: 6,
    lineHeight: 22,
  },
  list: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  card: {
    borderRadius: 18,
    backgroundColor: '#fff',
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  comentario: {
    marginTop: 6,
    lineHeight: 19,
  },
});
