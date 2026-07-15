import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, CheckIcon, ChevronRightIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { PlanoPremium, PremiumBilling, usePremiumStore } from '../../store/usePremiumStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PremiumAssinatura'>;

const PAGAMENTO_OPCOES = ['Apple Pay', 'Google Pay', 'PIX', 'Cartão de Crédito', 'Cartão de Débito'];

function precoDoPlano(plano: PlanoPremium, billing: PremiumBilling) {
  return billing === 'Anual'
    ? { precoMain: plano.precoAnual, precoNote: plano.precoNotaAnual }
    : { precoMain: plano.precoMensal, precoNote: plano.precoNotaMensal };
}

export function PremiumAssinaturaScreen({ navigation }: Props) {
  const planosPremium = usePremiumStore((state) => state.planosPremium);
  const [billing, setBilling] = useState<PremiumBilling>('Anual');
  const [expandedPlanoId, setExpandedPlanoId] = useState<string | null>('individual');
  const [metodoPagamento, setMetodoPagamento] = useState(PAGAMENTO_OPCOES[2]);

  const onPressPlano = (plano: PlanoPremium) => {
    if (plano.id === 'gratuito') {
      navigation.navigate('PremiumHome');
      return;
    }
    const { precoMain } = precoDoPlano(plano, billing);
    navigation.navigate('PremiumCheckout', {
      tipo: 'plano',
      planoId: plano.id,
      titulo: plano.nome,
      preco: precoMain,
      recorrente: true,
      proximaCobranca: billing === 'Anual' ? '14 jul 2027' : '14 ago 2026',
      billing,
    });
  };

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <BackIcon size={16} />
        </Pressable>

        <Text variant="xxl" weight="extraBold">
          Assinatura
        </Text>
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
          Escolha o plano ideal para você e seu cavalo.
        </Text>

        <Pressable
          style={styles.gerenciarLink}
          onPress={() => navigation.navigate('PremiumGerenciarAssinatura')}
        >
          <Text variant="xs" weight="bold" color={theme.colors.accent.moss}>
            Já é assinante? Gerenciar assinatura
          </Text>
          <ChevronRightIcon size={14} color={theme.colors.accent.moss} />
        </Pressable>

        <View style={styles.planosList}>
          {planosPremium.map((plano) => {
            const expanded = expandedPlanoId === plano.id;
            const { precoMain, precoNote } = precoDoPlano(plano, billing);
            return (
              <View
                key={plano.id}
                style={[styles.planoCard, plano.highlight && styles.planoCardHighlight]}
              >
                <Pressable
                  style={styles.planoHeader}
                  onPress={() => setExpandedPlanoId(expanded ? null : plano.id)}
                >
                  <View style={styles.planoHeaderLeft}>
                    <Text variant="lg" weight="extraBold">
                      {plano.nome}
                    </Text>
                    {!!plano.badge && (
                      <View style={styles.badge}>
                        <Text variant="xs" weight="extraBold">
                          {plano.badge}
                        </Text>
                      </View>
                    )}
                  </View>
                  <View style={{ transform: [{ rotate: expanded ? '90deg' : '0deg' }] }}>
                    <ChevronRightIcon size={15} color={theme.colors.accent.leather} />
                  </View>
                </Pressable>

                {plano.id === 'individual' && expanded && (
                  <View style={styles.billingRow}>
                    {(['Mensal', 'Anual'] as PremiumBilling[]).map((opcao) => {
                      const selected = billing === opcao;
                      return (
                        <Pressable
                          key={opcao}
                          style={[styles.billingChip, selected && styles.billingChipSelected]}
                          onPress={() => setBilling(opcao)}
                        >
                          <Text
                            variant="sm"
                            weight="bold"
                            color={selected ? theme.colors.text.inverse : 'primary'}
                          >
                            {opcao}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                )}

                <Text variant="xl" weight="bold" style={styles.precoMain}>
                  {precoMain}
                </Text>
                <Text variant="xs" weight="semiBold" color={theme.colors.accent.leather} style={styles.precoNote}>
                  {precoNote}
                </Text>

                {expanded && (
                  <>
                    {!!plano.socialProof && (
                      <Text variant="xs" weight="semiBold" color={theme.colors.accent.olive} style={styles.socialProof}>
                        {plano.socialProof}
                      </Text>
                    )}

                    {!!plano.tags && (
                      <View style={styles.tagsRow}>
                        {plano.tags.map((tag) => (
                          <View key={tag} style={styles.tag}>
                            <Text variant="xs" weight="bold">
                              {tag}
                            </Text>
                          </View>
                        ))}
                      </View>
                    )}

                    <View style={styles.featuresGrid}>
                      {plano.features.map((feature) => (
                        <View key={feature} style={styles.featureItem}>
                          <CheckIcon size={13} color={theme.colors.accent.olive} strokeWidth={2.4} />
                          <Text variant="xs" weight="semiBold" style={styles.featureText}>
                            {feature}
                          </Text>
                        </View>
                      ))}
                    </View>

                    <Pressable
                      style={[
                        styles.planoCta,
                        {
                          backgroundColor: plano.id === 'gratuito' ? 'transparent' : theme.colors.surfaceDark,
                          borderWidth: plano.id === 'gratuito' ? 2 : 0,
                          borderColor: theme.colors.text.primary,
                        },
                      ]}
                      onPress={() => onPressPlano(plano)}
                    >
                      <Text
                        variant="sm"
                        weight="extraBold"
                        color={plano.id === 'gratuito' ? 'primary' : theme.colors.accent.gold}
                      >
                        {plano.botao}
                      </Text>
                    </Pressable>

                    {!!plano.cancelNote && (
                      <Text variant="xs" weight="semiBold" color="tertiary" style={styles.cancelNote}>
                        {plano.cancelNote}
                      </Text>
                    )}
                  </>
                )}
              </View>
            );
          })}
        </View>

        <Pressable
          style={styles.navCard}
          onPress={() => navigation.navigate('PremiumCriacoesExclusivas')}
        >
          <View>
            <Text variant="sm" weight="extraBold">
              Criações Exclusivas
            </Text>
            <Text variant="xs" weight="medium" color="secondary" style={styles.navCardSubtitle}>
              Recursos avulsos de IA
            </Text>
          </View>
          <ChevronRightIcon size={16} color={theme.colors.text.tertiary} />
        </Pressable>

        <Pressable
          style={styles.founderCard}
          onPress={() => navigation.navigate('PremiumFoundingMembers')}
        >
          <Text variant="xs" weight="bold" color={theme.colors.accent.gold} style={styles.founderLabel}>
            FOUNDING MEMBERS
          </Text>
          <View style={styles.founderRow}>
            <Text variant="md" weight="extraBold" color="inverse">
              Seja um Fundador do EquiSoul
            </Text>
            <ChevronRightIcon size={16} color={theme.colors.accent.gold} />
          </View>
        </Pressable>

        <Pressable style={styles.navCard} onPress={() => navigation.navigate('PremiumFAQ')}>
          <Text variant="sm" weight="extraBold">
            Perguntas Frequentes
          </Text>
          <ChevronRightIcon size={16} color={theme.colors.text.tertiary} />
        </Pressable>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          MÉTODOS DE PAGAMENTO
        </Text>
        <View style={styles.chipsRow}>
          {PAGAMENTO_OPCOES.map((opcao) => {
            const selected = metodoPagamento === opcao;
            return (
              <Pressable
                key={opcao}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => setMetodoPagamento(opcao)}
              >
                <Text variant="sm" weight="bold" color={selected ? theme.colors.text.inverse : 'primary'}>
                  {opcao}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Pressable
          style={styles.historicoCta}
          onPress={() => navigation.navigate('PremiumHistoricoFinanceiro')}
        >
          <Text variant="md" weight="extraBold" color={theme.colors.accent.gold}>
            Ver histórico financeiro
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
  subtitle: {
    marginTop: 4,
    lineHeight: 20,
  },
  gerenciarLink: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(107,115,83,0.12)',
    padding: theme.spacing.md,
  },
  planosList: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  planoCard: {
    borderRadius: 22,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: 'rgba(43,41,36,0.08)',
    padding: theme.spacing.md,
  },
  planoCardHighlight: {
    backgroundColor: 'rgba(201,161,90,0.10)',
    borderColor: theme.colors.accent.gold,
  },
  planoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  planoHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: theme.colors.accent.gold,
  },
  billingRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  billingChip: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderRadius: 14,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  billingChipSelected: {
    backgroundColor: theme.colors.surfaceDark,
  },
  precoMain: {
    marginTop: theme.spacing.md,
  },
  precoNote: {
    marginTop: 2,
  },
  socialProof: {
    marginTop: theme.spacing.sm,
  },
  tagsRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 11,
    borderRadius: 12,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  featuresGrid: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  featureItem: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
  },
  featureText: {
    flex: 1,
    lineHeight: 16,
  },
  planoCta: {
    marginTop: theme.spacing.lg,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelNote: {
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  navCard: {
    marginTop: theme.spacing.md,
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
  navCardSubtitle: {
    marginTop: 2,
  },
  founderCard: {
    marginTop: theme.spacing.sm,
    borderRadius: theme.radius.card,
    backgroundColor: theme.colors.surfaceDark,
    padding: theme.spacing.md,
  },
  founderLabel: {
    letterSpacing: 0.6,
  },
  founderRow: {
    marginTop: theme.spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionLabel: {
    marginTop: theme.spacing.xl,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  chipsRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  chip: {
    paddingVertical: theme.chipPadding.vertical,
    paddingHorizontal: theme.chipPadding.horizontal,
    borderRadius: theme.radius.chip,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  chipSelected: {
    backgroundColor: theme.colors.surfaceDark,
  },
  historicoCta: {
    marginTop: theme.spacing.lg,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
