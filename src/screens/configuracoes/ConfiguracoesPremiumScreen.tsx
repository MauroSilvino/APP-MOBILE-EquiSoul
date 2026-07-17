import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { SettingsHeader } from '../../components/configuracoes/SettingsHeader';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { CheckIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePremiumStore } from '../../store/usePremiumStore';

type Props = NativeStackScreenProps<RootStackParamList, 'ConfiguracoesPremium'>;

export function ConfiguracoesPremiumScreen({ navigation }: Props) {
  const assinaturaAtiva = usePremiumStore((state) => state.assinaturaAtiva);
  const beneficiosList = usePremiumStore((state) => state.beneficiosList);
  const isPremium = !!assinaturaAtiva.planoId && assinaturaAtiva.status === 'ativa';

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <SettingsHeader title="Premium" onBack={() => navigation.navigate('Configuracoes')} />

        <View style={styles.planoCard}>
          <Text variant="xs" weight="bold" color={theme.colors.accent.gold} style={styles.planoLabel}>
            PLANO ATUAL
          </Text>
          <Text variant="xl" weight="extraBold" color="inverse" style={styles.planoNome}>
            {isPremium ? assinaturaAtiva.plano : 'EquiSoul Gratuito'}
          </Text>
          <Text variant="sm" weight="medium" color="rgba(251,249,244,0.65)">
            {isPremium ? `Renova em ${assinaturaAtiva.proximaCobranca}` : 'Assine para desbloquear todos os benefícios'}
          </Text>
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionTitle}>
          BENEFÍCIOS INCLUSOS
        </Text>
        <View style={styles.beneficiosList}>
          {beneficiosList.slice(0, 6).map((b) => (
            <View key={b} style={styles.beneficioRow}>
              <CheckIcon size={16} color={theme.colors.accent.moss} />
              <Text variant="sm" weight="semiBold" style={styles.beneficioText}>
                {b}
              </Text>
            </View>
          ))}
        </View>

        <Pressable
          style={styles.manageButton}
          onPress={() => navigation.navigate(isPremium ? 'PremiumGerenciarAssinatura' : 'PremiumAssinatura')}
        >
          <Text variant="sm" weight="bold">
            {isPremium ? 'Gerenciar assinatura' : 'Ver planos Premium'}
          </Text>
        </Pressable>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxl,
    paddingBottom: 40,
  },
  planoCard: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.cardLarge,
    backgroundColor: theme.colors.surfaceDark,
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  planoLabel: {
    letterSpacing: 0.6,
  },
  planoNome: {
    marginTop: 6,
  },
  sectionTitle: {
    marginTop: theme.spacing.xl,
    letterSpacing: 0.4,
  },
  beneficiosList: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  beneficioRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  beneficioText: {
    flex: 1,
  },
  manageButton: {
    marginTop: theme.spacing.lg,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
