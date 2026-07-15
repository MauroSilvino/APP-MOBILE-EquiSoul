import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { FATURAS_ANUAL, FATURAS_MENSAL, usePremiumStore } from '../../store/usePremiumStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PremiumGerenciarAssinatura'>;

export function PremiumGerenciarAssinaturaScreen({ navigation }: Props) {
  const assinaturaAtiva = usePremiumStore((state) => state.assinaturaAtiva);
  const cancelarAssinatura = usePremiumStore((state) => state.cancelarAssinatura);
  const reativarAssinatura = usePremiumStore((state) => state.reativarAssinatura);
  const [cancelConfirmOpen, setCancelConfirmOpen] = useState(false);

  if (!assinaturaAtiva.planoId) {
    return (
      <Screen style={styles.screen}>
        <View style={styles.emptyContent}>
          <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
            <BackIcon size={16} />
          </Pressable>
          <Text variant="xl" weight="extraBold" style={styles.emptyTitle}>
            Você está no plano Gratuito
          </Text>
          <Text variant="sm" weight="medium" color="secondary" style={styles.emptyText}>
            Assine o Premium para gerenciar sua assinatura, faturas e método de cobrança por aqui.
          </Text>
          <Pressable style={styles.emptyCta} onPress={() => navigation.navigate('PremiumAssinatura')}>
            <Text variant="md" weight="extraBold" color={theme.colors.accent.gold}>
              Ver planos Premium
            </Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  const cancelada = assinaturaAtiva.status === 'cancelada';
  const faturas = assinaturaAtiva.billing === 'Anual' ? FATURAS_ANUAL : FATURAS_MENSAL;

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <BackIcon size={16} />
        </Pressable>

        <Text variant="xxl" weight="extraBold">
          Gerenciar assinatura
        </Text>

        <View style={styles.planoCard}>
          <View style={styles.planoHeader}>
            <Text variant="lg" weight="extraBold">
              {assinaturaAtiva.plano}
            </Text>
            <View style={[styles.statusBadge, { backgroundColor: cancelada ? 'rgba(43,41,36,0.08)' : 'rgba(107,115,83,0.16)' }]}>
              <Text variant="xs" weight="extraBold" color={cancelada ? 'secondary' : theme.colors.accent.moss}>
                {cancelada ? 'Cancelada' : 'Ativa'}
              </Text>
            </View>
          </View>
          <Text variant="lg" weight="bold" style={styles.planoPreco}>
            {assinaturaAtiva.preco}
          </Text>
          <Text variant="xs" weight="medium" color="secondary" style={styles.proximaCobranca}>
            {cancelada
              ? `Acesso Premium até ${assinaturaAtiva.proximaCobranca}`
              : `Próxima cobrança em ${assinaturaAtiva.proximaCobranca}`}
          </Text>
        </View>

        <Pressable
          style={styles.trocarButton}
          onPress={() => navigation.navigate('PremiumAssinatura')}
        >
          <Text variant="sm" weight="extraBold">
            Trocar de plano
          </Text>
        </Pressable>

        {cancelada && (
          <Pressable style={styles.reativarButton} onPress={reativarAssinatura}>
            <Text variant="sm" weight="extraBold" color={theme.colors.accent.gold}>
              Reativar assinatura
            </Text>
          </Pressable>
        )}

        {!cancelada && (
          <>
            {cancelConfirmOpen ? (
              <View style={styles.cancelConfirmCard}>
                <Text variant="sm" weight="bold" style={styles.cancelConfirmText}>
                  Tem certeza que deseja cancelar? Você perde acesso aos recursos Premium ao fim do
                  período pago.
                </Text>
                <View style={styles.cancelConfirmRow}>
                  <Pressable
                    style={styles.manterButton}
                    onPress={() => setCancelConfirmOpen(false)}
                  >
                    <Text variant="xs" weight="extraBold">
                      Manter
                    </Text>
                  </Pressable>
                  <Pressable
                    style={styles.confirmarCancelButton}
                    onPress={() => {
                      cancelarAssinatura();
                      setCancelConfirmOpen(false);
                    }}
                  >
                    <Text variant="xs" weight="extraBold" color={theme.colors.accent.gold}>
                      Confirmar cancelamento
                    </Text>
                  </Pressable>
                </View>
              </View>
            ) : (
              <Pressable style={styles.cancelarLink} onPress={() => setCancelConfirmOpen(true)}>
                <Text variant="xs" weight="bold" color={theme.colors.error} style={styles.cancelarLinkText}>
                  Cancelar assinatura
                </Text>
              </Pressable>
            )}
          </>
        )}

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          FATURAS RECENTES
        </Text>
        <View style={styles.faturasList}>
          {faturas.slice(0, 3).map((fatura) => (
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
  emptyContent: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
  },
  emptyTitle: {
    marginTop: theme.spacing.xxl,
  },
  emptyText: {
    marginTop: theme.spacing.sm,
    lineHeight: 20,
  },
  emptyCta: {
    marginTop: theme.spacing.xl,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planoCard: {
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
  planoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  planoPreco: {
    marginTop: theme.spacing.xs,
  },
  proximaCobranca: {
    marginTop: 4,
  },
  trocarButton: {
    marginTop: theme.spacing.lg,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: theme.colors.text.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reativarButton: {
    marginTop: theme.spacing.sm,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelConfirmCard: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(201,161,90,0.14)',
    padding: theme.spacing.md,
  },
  cancelConfirmText: {
    lineHeight: 20,
  },
  cancelConfirmRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  manterButton: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmarCancelButton: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelarLink: {
    marginTop: theme.spacing.sm,
    alignItems: 'center',
  },
  cancelarLinkText: {
    textDecorationLine: 'underline',
  },
  sectionLabel: {
    marginTop: theme.spacing.xl,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  faturasList: {
    marginTop: theme.spacing.sm,
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
});
