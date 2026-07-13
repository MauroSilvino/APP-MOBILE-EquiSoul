import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, CheckIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMarketplaceStore } from '../../store/useMarketplaceStore';

type Props = NativeStackScreenProps<RootStackParamList, 'MarketplaceReserva'>;

const DATA_OPCOES = ['Sáb 12', 'Dom 13', 'Seg 14', 'Ter 15', 'Qua 16'];
const HORARIO_OPCOES = ['09:00', '11:00', '14:00', '16:00'];
const PAGAMENTO_OPCOES = ['Apple Pay', 'Google Pay', 'PIX', 'Cartão'];

export function MarketplaceReservaScreen({ navigation, route }: Props) {
  const { origem, nome, precoLabel } = route.params;
  const addReserva = useMarketplaceStore((state) => state.addReserva);

  const [data, setData] = useState(DATA_OPCOES[0]);
  const [horario, setHorario] = useState<string | null>(null);
  const [pagamento, setPagamento] = useState('PIX');
  const [confirmada, setConfirmada] = useState(false);
  const [icsAdicionado, setIcsAdicionado] = useState(false);

  const confirmar = () => {
    addReserva({ origem, nome, data, horario: horario ?? HORARIO_OPCOES[0], precoLabel });
    setConfirmada(true);
  };

  if (confirmada) {
    return (
      <Screen style={styles.screen}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <BackIcon size={16} />
        </Pressable>
        <View style={styles.confirmWrap}>
          <View style={styles.confirmIcon}>
            <CheckIcon size={28} color={theme.colors.accent.moss} strokeWidth={2.4} />
          </View>
          <Text variant="xl" weight="extraBold">
            Reserva confirmada
          </Text>
          <Text variant="sm" weight="medium" color="secondary" style={styles.confirmText}>
            {origem} com {nome} · {data} às {horario ?? HORARIO_OPCOES[0]}. Você vai receber um lembrete
            próximo à data.
          </Text>
          <Pressable style={styles.icsButton} onPress={() => setIcsAdicionado((v) => !v)}>
            <Text variant="sm" weight="bold">
              {icsAdicionado ? 'Adicionado ✓' : 'Adicionar ao calendário'}
            </Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('MarketplaceHome')}>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather}>
              Voltar ao início
            </Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <BackIcon size={16} />
        </Pressable>

        <Text variant="xxl" weight="extraBold">
          Reservar
        </Text>
        <Text variant="sm" weight="semiBold" color="secondary" style={styles.contexto}>
          {origem} · {nome}
        </Text>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          DATA
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
          <View style={styles.chipsRow}>
            {DATA_OPCOES.map((opcao) => {
              const selected = data === opcao;
              return (
                <Pressable
                  key={opcao}
                  style={[styles.dataChip, selected && styles.chipSelected]}
                  onPress={() => setData(opcao)}
                >
                  <Text variant="sm" weight="bold" color={selected ? theme.colors.accent.gold : 'primary'}>
                    {opcao}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          HORÁRIO
        </Text>
        <View style={styles.wrapRow}>
          {HORARIO_OPCOES.map((opcao) => {
            const selected = horario === opcao;
            return (
              <Pressable
                key={opcao}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => setHorario(opcao)}
              >
                <Text variant="sm" weight="bold" color={selected ? theme.colors.accent.gold : 'primary'}>
                  {opcao}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          PAGAMENTO
        </Text>
        <View style={styles.wrapRow}>
          {PAGAMENTO_OPCOES.map((opcao) => {
            const selected = pagamento === opcao;
            return (
              <Pressable
                key={opcao}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => setPagamento(opcao)}
              >
                <Text variant="sm" weight="bold" color={selected ? theme.colors.accent.gold : 'primary'}>
                  {opcao}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.totalRow}>
          <Text variant="md" weight="bold">
            Total
          </Text>
          <Text variant="md" weight="bold">
            {precoLabel}
          </Text>
        </View>

        <Pressable style={[styles.confirmButton, !horario && styles.confirmButtonDisabled]} onPress={confirmar} disabled={!horario}>
          <Text variant="lg" weight="extraBold">
            Confirmar reserva
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
  contexto: {
    marginTop: 4,
  },
  sectionLabel: {
    marginTop: theme.spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  chipsScroll: {
    marginTop: theme.spacing.sm,
  },
  chipsRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  wrapRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  dataChip: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  chip: {
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  chipSelected: {
    backgroundColor: theme.colors.surfaceDark,
  },
  totalRow: {
    marginTop: theme.spacing.xl,
    borderRadius: theme.radius.card,
    padding: theme.spacing.md,
    backgroundColor: 'rgba(43,41,36,0.05)',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmButton: {
    marginTop: theme.spacing.xl,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonDisabled: {
    opacity: 0.5,
  },
  confirmWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
  },
  confirmIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(107,115,83,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmText: {
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 20,
  },
  icsButton: {
    height: 52,
    paddingHorizontal: 24,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
