import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, CheckIcon, StarIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePremiumStore } from '../../store/usePremiumStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PremiumFoundingMembers'>;

const VAGAS_TOTAL = 500;

export function PremiumFoundingMembersScreen({ navigation }: Props) {
  const fundadorBeneficios = usePremiumStore((state) => state.fundadorBeneficios);
  const vagasOcupadas = usePremiumStore((state) => state.vagasOcupadas);
  const waitlisted = usePremiumStore((state) => state.waitlisted);
  const entrarListaEspera = usePremiumStore((state) => state.entrarListaEspera);

  const vagasEsgotadas = vagasOcupadas >= VAGAS_TOTAL;
  const vagasPercent = Math.round((vagasOcupadas / VAGAS_TOTAL) * 100);

  const onPressCTA = () => {
    if (vagasEsgotadas) {
      entrarListaEspera();
      return;
    }
    navigation.navigate('PremiumCheckout', {
      tipo: 'fundador',
      planoId: 'fundador',
      titulo: 'Founding Member EquiSoul',
      preco: 'R$ 497',
      recorrente: false,
      proximaCobranca: 'Vitalício',
    });
  };

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <BackIcon size={16} color={theme.colors.text.inverse} />
        </Pressable>

        <View style={styles.heroCard}>
          <StarIcon size={26} color={theme.colors.accent.gold} />
          <Text variant="xl" weight="extraBold" color="inverse" style={styles.heroTitle}>
            Seja um Fundador do EquiSoul
          </Text>
          <Text variant="sm" weight="medium" color="rgba(251,249,244,0.72)" style={styles.heroText}>
            Faça parte do grupo que ajudou a construir a maior plataforma do mundo para amantes de
            cavalos.
          </Text>
        </View>

        <View style={styles.list}>
          {fundadorBeneficios.map((beneficio) => (
            <View key={beneficio} style={styles.listItem}>
              <CheckIcon size={16} color={theme.colors.accent.olive} strokeWidth={2.4} />
              <Text variant="sm" weight="bold">
                {beneficio}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.vagasCard}>
          <View style={styles.vagasHeader}>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.vagasLabel}>
              VAGAS DE FUNDADOR
            </Text>
            {vagasEsgotadas && (
              <View style={styles.esgotadoBadge}>
                <Text variant="xs" weight="extraBold">
                  Esgotado
                </Text>
              </View>
            )}
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${vagasPercent}%` }]} />
          </View>
          <Text variant="xs" weight="semiBold" color="secondary" style={styles.vagasNote}>
            {vagasOcupadas} de {VAGAS_TOTAL} vagas disponíveis
          </Text>
        </View>

        <Text variant="xxl" weight="extraBold" style={styles.preco}>
          R$ 497{' '}
          <Text variant="sm" weight="semiBold" color="secondary">
            pagamento único
          </Text>
        </Text>

        {vagasEsgotadas && (
          <View style={styles.esgotadoNote}>
            <Text variant="xs" weight="medium" color={theme.colors.accent.moss} style={styles.esgotadoText}>
              Todas as vagas de Fundador foram preenchidas. Entre na lista de espera e avisaremos se
              surgir uma vaga.
            </Text>
          </View>
        )}

        <Pressable
          style={[styles.cta, { backgroundColor: vagasEsgotadas ? 'rgba(43,41,36,0.1)' : theme.colors.accent.gold }]}
          onPress={onPressCTA}
        >
          <Text variant="md" weight="extraBold">
            {vagasEsgotadas ? 'Entrar na lista de espera' : 'Quero ser Fundador'}
          </Text>
        </Pressable>

        {waitlisted && (
          <Text variant="xs" weight="bold" color={theme.colors.accent.olive} style={styles.waitlistedText}>
            Você entrou na lista de espera ✓
          </Text>
        )}
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
    backgroundColor: 'rgba(43,41,36,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  heroCard: {
    borderRadius: theme.radius.card,
    backgroundColor: theme.colors.surfaceDark,
    padding: theme.spacing.lg,
  },
  heroTitle: {
    marginTop: theme.spacing.md,
    lineHeight: 25,
  },
  heroText: {
    marginTop: theme.spacing.sm,
    lineHeight: 20,
  },
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  vagasCard: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 2,
  },
  vagasHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vagasLabel: {
    letterSpacing: 0.4,
  },
  esgotadoBadge: {
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 9,
    backgroundColor: 'rgba(43,41,36,0.08)',
  },
  progressTrack: {
    marginTop: theme.spacing.sm,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(43,41,36,0.08)',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: theme.colors.accent.gold,
  },
  vagasNote: {
    marginTop: theme.spacing.sm,
  },
  preco: {
    marginTop: theme.spacing.lg,
    textAlign: 'center',
  },
  esgotadoNote: {
    marginTop: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(107,115,83,0.12)',
    padding: theme.spacing.md,
  },
  esgotadoText: {
    lineHeight: 19,
  },
  cta: {
    marginTop: theme.spacing.lg,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  waitlistedText: {
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
});
