import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { FATURAS_ANUAL, FATURAS_MENSAL, usePremiumStore } from '../../store/usePremiumStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PremiumHistoricoFinanceiro'>;

export function PremiumHistoricoFinanceiroScreen({ navigation }: Props) {
  const assinaturaAtiva = usePremiumStore((state) => state.assinaturaAtiva);
  const faturas = assinaturaAtiva.billing === 'Anual' ? FATURAS_ANUAL : FATURAS_MENSAL;

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <BackIcon size={16} />
        </Pressable>

        <Text variant="xxl" weight="extraBold">
          Histórico financeiro
        </Text>

        {assinaturaAtiva.planoId ? (
          <View style={styles.list}>
            {faturas.map((fatura) => (
              <View key={fatura.id} style={styles.faturaRow}>
                <View>
                  <Text variant="sm" weight="bold">
                    {fatura.plano}
                  </Text>
                  <Text variant="xs" weight="medium" color="secondary" style={styles.faturaData}>
                    {fatura.data}
                  </Text>
                </View>
                <Text variant="sm" weight="bold">
                  {fatura.valor}
                </Text>
              </View>
            ))}
          </View>
        ) : (
          <Text variant="sm" weight="medium" color="secondary" style={styles.emptyText}>
            Você ainda não tem cobranças — assine o Premium para ver seu histórico financeiro aqui.
          </Text>
        )}

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          FIDELIDADE
        </Text>
        <View style={styles.fidelidadeCard}>
          <Text variant="xs" weight="medium" color="secondary" style={styles.fidelidadeText}>
            12 meses de assinatura — você desbloqueou a capa exclusiva "Haras Clássico".
          </Text>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  faturaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  faturaData: {
    marginTop: 2,
  },
  emptyText: {
    marginTop: theme.spacing.lg,
    lineHeight: 20,
  },
  sectionLabel: {
    marginTop: theme.spacing.xl,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  fidelidadeCard: {
    marginTop: theme.spacing.sm,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(201,161,90,0.14)',
    padding: theme.spacing.md,
  },
  fidelidadeText: {
    lineHeight: 19,
  },
});
