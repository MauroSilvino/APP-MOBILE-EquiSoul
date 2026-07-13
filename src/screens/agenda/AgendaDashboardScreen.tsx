import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import { AiIcon, CalendarIcon, ChartBarIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { hojeISO, useAgendaStore } from '../../store/useAgendaStore';
import { useHealthStore } from '../../store/useHealthStore';
import { useHorseStore } from '../../store/useHorseStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AgendaDashboard'>;

const ACOES_RAPIDAS = ['Adicionar compromisso', 'Registrar treino', 'Novo evento', 'Nova memória', 'Compartilhar agenda'];

export function AgendaDashboardScreen({ navigation }: Props) {
  const compromissos = useAgendaStore((state) => state.compromissos);
  const metas = useAgendaStore((state) => state.metas);
  const horse = useHorseStore((state) => state.horses[0] ?? null);
  const records = useHealthStore((state) => (horse ? state.getRecords(horse.id) : null));
  const { message, show } = useToast();
  const [linkCopiado, setLinkCopiado] = useState(false);

  const hoje = hojeISO();

  const cards = useMemo(() => {
    const compromissosHoje = compromissos.filter((c) => c.data === hoje);
    const futuros = compromissos
      .filter((c) => c.data >= hoje)
      .sort((a, b) => (a.data + a.hora).localeCompare(b.data + b.hora));
    const proximoEvento = futuros[0] ?? null;
    const proximoTreino = futuros.find((c) => c.tipo === 'Treino') ?? null;
    const metasEmAndamento = metas.filter((m) => m.progresso < 100).length;
    const proximoFerrageamento = records?.ferrageamentos[0]?.data ?? null;

    return [
      {
        label: 'Agenda de hoje',
        valor: compromissosHoje.length > 0 ? `${compromissosHoje.length} compromisso(s)` : 'Nada por hoje',
        onPress: () => navigation.navigate('AgendaDoDia', { data: hoje }),
      },
      {
        label: 'Próximo evento',
        valor: proximoEvento ? proximoEvento.titulo : 'Nenhum agendado',
        onPress: () =>
          proximoEvento
            ? navigation.navigate('AgendaDoDia', { data: proximoEvento.data })
            : navigation.navigate('CriarCompromisso', undefined),
      },
      {
        label: 'Treino planejado',
        valor: proximoTreino ? `${proximoTreino.data} às ${proximoTreino.hora}` : 'Nenhum treino',
        onPress: () =>
          proximoTreino
            ? navigation.navigate('AgendaDoDia', { data: proximoTreino.data })
            : navigation.navigate('CriarCompromisso', { tipoInicial: 'Treino' }),
      },
      {
        label: 'Cuidados',
        valor: proximoFerrageamento ? `Ferrageamento · ${proximoFerrageamento}` : 'Nenhum cuidado previsto',
        onPress: () => navigation.navigate('PlanejamentoSemanal'),
      },
      {
        label: 'Metas',
        valor: metasEmAndamento > 0 ? `${metasEmAndamento} em andamento` : 'Nenhuma meta ativa',
        onPress: () => navigation.navigate('Metas'),
      },
      {
        label: 'Clima',
        valor: '26°C · ensolarado',
        onPress: () => navigation.navigate('Clima'),
      },
    ];
  }, [compromissos, metas, records, hoje, navigation]);

  function handleAcaoRapida(label: string) {
    if (label === 'Adicionar compromisso') navigation.navigate('CriarCompromisso', undefined);
    else if (label === 'Registrar treino') navigation.navigate('CriarCompromisso', { tipoInicial: 'Treino' });
    else if (label === 'Novo evento') navigation.navigate('CriarCompromisso', { tipoInicial: 'Evento' });
    else if (label === 'Nova memória') navigation.navigate('NovoRegistro', undefined);
    else if (label === 'Compartilhar agenda') {
      setLinkCopiado(true);
      show('Link da agenda copiado');
      setTimeout(() => setLinkCopiado(false), 2200);
    }
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Agenda
        </Text>

        <View style={styles.insightBanner}>
          <Text variant="sm" weight="medium">
            Esta semana vocês possuem {compromissos.length > 0 ? `${compromissos.length} compromisso(s) na agenda` : 'a agenda livre'}.
          </Text>
        </View>

        <View style={styles.cardsGrid}>
          {cards.map((card) => (
            <Pressable key={card.label} style={styles.card} onPress={card.onPress}>
              <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.cardLabel}>
                {card.label.toUpperCase()}
              </Text>
              <Text variant="md" weight="bold" style={styles.cardValor}>
                {card.valor}
              </Text>
            </Pressable>
          ))}
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          AÇÕES RÁPIDAS
        </Text>
        <View style={styles.acoesRapidas}>
          {ACOES_RAPIDAS.map((label) => (
            <Pressable key={label} style={styles.acaoChip} onPress={() => handleAcaoRapida(label)}>
              <Text variant="sm" weight="bold">
                {label}
              </Text>
            </Pressable>
          ))}
        </View>
        {linkCopiado && (
          <Text variant="xs" weight="bold" color={theme.colors.accent.moss} style={styles.linkCopiado}>
            Link da agenda copiado ✓
          </Text>
        )}

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          EXPLORAR
        </Text>
        <View style={styles.explorarRow}>
          <Pressable style={styles.explorarButton} onPress={() => navigation.navigate('AgendaCalendario')}>
            <CalendarIcon size={15} />
            <Text variant="sm" weight="bold">
              Calendário
            </Text>
          </Pressable>
          <Pressable style={styles.explorarButton} onPress={() => navigation.navigate('Analytics')}>
            <ChartBarIcon />
            <Text variant="sm" weight="bold">
              Analytics
            </Text>
          </Pressable>
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          INSIGHTS
        </Text>
        <Pressable style={styles.insightCard} onPress={() => navigation.navigate('InsightsInteligentes')}>
          <AiIcon />
          <Text variant="sm" weight="medium" color="secondary" style={styles.insightText}>
            Vocês participaram de mais eventos este semestre do que no anterior.
          </Text>
        </Pressable>
      </ScrollView>

      <BottomTabBar active="Home" />
      <Toast message={message} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
    paddingBottom: 130,
  },
  insightBanner: {
    marginTop: theme.spacing.md,
    borderRadius: theme.radius.cardLarge,
    backgroundColor: 'rgba(201,161,90,0.12)',
    padding: theme.cardPadding.min,
  },
  cardsGrid: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  card: {
    width: '47%',
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  cardLabel: {
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  cardValor: {
    marginTop: theme.spacing.sm,
  },
  sectionLabel: {
    marginTop: theme.spacing.xl,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  acoesRapidas: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  acaoChip: {
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  linkCopiado: {
    marginTop: theme.spacing.sm,
  },
  explorarRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  explorarButton: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  insightCard: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  insightText: {
    flex: 1,
  },
});
