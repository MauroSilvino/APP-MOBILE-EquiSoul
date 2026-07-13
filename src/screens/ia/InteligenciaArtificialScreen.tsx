import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { AiIcon, LockIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useUserStore } from '../../store/useUserStore';

type Props = NativeStackScreenProps<RootStackParamList, 'InteligenciaArtificial'>;

const HUB_CARDS = [
  { label: 'Cartas', desc: 'Mensagens emocionantes do seu cavalo', route: 'CartasIA', premium: false },
  { label: 'Insights', desc: 'Descobertas sobre a parceria', route: 'Insights', premium: false },
  {
    label: 'Linha do tempo emocional',
    desc: 'A narrativa contínua da jornada',
    route: 'LinhaTempoEmocional',
    premium: false,
  },
  { label: 'Retrospectivas', desc: 'Mensal, semestral e anual', route: 'Retrospectivas', premium: false },
  { label: 'Histórias', desc: 'Capítulos escritos pela IA', route: 'HistoriasIA', premium: false },
  { label: 'Sugestões', desc: 'Ideias, nunca obrigações', route: 'Sugestoes', premium: false },
  {
    label: 'Estúdio criativo',
    desc: 'Vídeos e posts prontos para compartilhar',
    route: 'EstudioCriativo',
    premium: true,
  },
  { label: 'Assistente', desc: 'Converse sobre a história de vocês', route: 'AssistenteIA', premium: false },
] as const;

export function InteligenciaArtificialScreen({ navigation }: Props) {
  const premium = useUserStore((state) => state.premium);
  const setPremium = useUserStore((state) => state.setPremium);
  const [paywallOpen, setPaywallOpen] = useState(false);

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Inteligência Artificial
        </Text>
        <Text variant="md" weight="medium" color="secondary" style={styles.subtitle}>
          Um companheiro silencioso, guardando a história de vocês dois.
        </Text>

        <View style={styles.contaRow}>
          <View style={[styles.contaDot, { backgroundColor: premium ? theme.colors.accent.gold : theme.colors.text.tertiary }]} />
          <Text variant="xs" weight="bold" color="secondary">
            {premium ? 'Conta Premium — uso ilimitado de IA' : 'Conta gratuita — 5 perguntas de IA por mês'}
          </Text>
        </View>

        <View style={styles.grid}>
          {HUB_CARDS.map((card) => (
            <Pressable
              key={card.route}
              style={styles.card}
              onPress={() => {
                if (card.premium && !premium) {
                  setPaywallOpen(true);
                  return;
                }
                navigation.navigate(card.route);
              }}
            >
              {card.premium && !premium && (
                <View style={styles.lockBadge}>
                  <Text variant="xs" weight="extraBold" color={theme.colors.accent.leather}>
                    Premium
                  </Text>
                </View>
              )}
              <AiIcon size={22} color={theme.colors.accent.olive} />
              <Text variant="sm" weight="extraBold" style={styles.cardLabel}>
                {card.label}
              </Text>
              <Text variant="xs" weight="medium" color="secondary" style={styles.cardDesc}>
                {card.desc}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {paywallOpen && (
        <View style={styles.paywallOverlay}>
          <Pressable style={StyleSheet.absoluteFill} onPress={() => setPaywallOpen(false)} />
          <View style={styles.paywallSheet}>
            <View style={styles.paywallHandle} />
            <View style={styles.paywallLockRow}>
              <LockIcon size={20} color={theme.colors.accent.leather} />
              <Text variant="lg" weight="extraBold">
                Estúdio criativo é Premium
              </Text>
            </View>
            <Text variant="md" weight="medium" color="secondary" style={styles.paywallText}>
              Gere vídeos, reels e posts com IA a partir das memórias de vocês. Disponível na assinatura
              Premium.
            </Text>
            <Pressable
              style={styles.paywallButton}
              onPress={() => {
                setPremium(true);
                setPaywallOpen(false);
              }}
            >
              <Text variant="md" weight="extraBold">
                Assinar Premium
              </Text>
            </Pressable>
            <Pressable onPress={() => setPaywallOpen(false)}>
              <Text variant="sm" weight="bold" color="secondary" style={styles.paywallDismiss}>
                Agora não
              </Text>
            </Pressable>
          </View>
        </View>
      )}
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
    paddingBottom: theme.spacing.xxl,
  },
  subtitle: {
    marginTop: theme.spacing.xs,
    lineHeight: 20,
  },
  contaRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  contaDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  grid: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  card: {
    width: '47.5%',
    borderRadius: 20,
    backgroundColor: '#fff',
    padding: theme.spacing.md,
    gap: theme.spacing.sm,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 2,
  },
  lockBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: 'rgba(201,161,90,0.18)',
  },
  cardLabel: {
    marginTop: theme.spacing.xs,
  },
  cardDesc: {
    lineHeight: 16,
  },
  paywallOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(43,41,36,0.5)',
    justifyContent: 'flex-end',
  },
  paywallSheet: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
    gap: theme.spacing.md,
  },
  paywallHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(43,41,36,0.15)',
    alignSelf: 'center',
    marginBottom: theme.spacing.xs,
  },
  paywallLockRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  paywallText: {
    lineHeight: 20,
  },
  paywallButton: {
    height: theme.buttonHeight.min + 4,
    borderRadius: (theme.buttonHeight.min + 4) / 2,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paywallDismiss: {
    textAlign: 'center',
  },
});
