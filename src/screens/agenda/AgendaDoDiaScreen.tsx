import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, CalendarIcon, CheckIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { Compromisso, TIPO_COMPROMISSO_COR, formatDataISOParaLabel, hojeISO, useAgendaStore } from '../../store/useAgendaStore';
import { useHorseStore } from '../../store/useHorseStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AgendaDoDia'>;

interface CompromissoDisplay {
  compromisso: Compromisso;
  cor: string;
  opacity: number;
  showCheck: boolean;
  titleDecoration: 'none' | 'line-through';
  statusLabel: string | null;
}

export function AgendaDoDiaScreen({ navigation, route }: Props) {
  const data = route.params?.data ?? hojeISO();
  const compromissos = useAgendaStore((state) => state.compromissos);
  const horses = useHorseStore((state) => state.horses);

  const agora = Date.now();

  const doDia: CompromissoDisplay[] = useMemo(() => {
    return compromissos
      .filter((c) => c.data === data)
      .sort((a, b) => a.hora.localeCompare(b.hora))
      .map((c) => {
        const [h, m] = c.hora.split(':').map(Number);
        const [ano, mes, dia] = c.data.split('-').map(Number);
        const dataHora = new Date(ano, (mes ?? 1) - 1, dia ?? 1, h || 0, m || 0).getTime();
        if (c.status === 'cancelado') {
          return {
            compromisso: c,
            cor: TIPO_COMPROMISSO_COR[c.tipo],
            opacity: 0.6,
            showCheck: false,
            titleDecoration: 'line-through' as const,
            statusLabel: 'Cancelado',
          };
        }
        const concluido = dataHora < agora;
        return {
          compromisso: c,
          cor: TIPO_COMPROMISSO_COR[c.tipo],
          opacity: concluido ? 0.55 : 1,
          showCheck: concluido,
          titleDecoration: 'none' as const,
          statusLabel: null,
        };
      });
  }, [compromissos, data, agora]);

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable style={styles.backInline} onPress={() => navigation.goBack()} hitSlop={8}>
            <BackIcon size={16} />
          </Pressable>
          <Text variant="xxl" weight="extraBold">
            {formatDataISOParaLabel(data)}
          </Text>
        </View>

        {doDia.length > 0 ? (
          <>
            <View style={styles.timeline}>
              {doDia.map((item, index) => {
                const cavalo = horses.find((h) => h.id === item.compromisso.cavaloId);
                return (
                  <View key={item.compromisso.id} style={styles.timelineRow}>
                    <Text variant="sm" weight="bold" color={theme.colors.accent.leather} style={styles.hora}>
                      {item.compromisso.hora}
                    </Text>
                    <View style={styles.dotColumn}>
                      <View style={[styles.dot, { backgroundColor: item.cor }]} />
                      {index < doDia.length - 1 && <View style={styles.line} />}
                    </View>
                    <View style={[styles.eventCard, { opacity: item.opacity }]}>
                      <View style={styles.eventTitleRow}>
                        <Text
                          variant="md"
                          weight="bold"
                          style={item.titleDecoration === 'line-through' ? styles.strike : undefined}
                        >
                          {item.compromisso.titulo}
                        </Text>
                        {item.showCheck && <CheckIcon size={14} color={theme.colors.accent.olive} />}
                      </View>
                      <Text variant="sm" weight="medium" color="secondary" style={styles.eventSubtitle}>
                        {item.compromisso.local}
                        {cavalo ? ` · ${cavalo.nome}` : ''}
                      </Text>
                      {!!item.statusLabel && (
                        <View style={styles.statusBadge}>
                          <Text variant="xs" weight="bold" color={theme.colors.error}>
                            {item.statusLabel}
                          </Text>
                        </View>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
            <Pressable style={styles.registrarButton} onPress={() => navigation.navigate('NovoRegistro', undefined)}>
              <Text variant="sm" weight="extraBold">
                Registrar memória do dia
              </Text>
            </Pressable>
          </>
        ) : (
          <View style={styles.empty}>
            <CalendarIcon size={34} color={theme.colors.text.tertiary} strokeWidth={1.6} />
            <Text variant="md" weight="bold" style={styles.emptyTitle}>
              Nenhum compromisso neste dia
            </Text>
            <Text variant="sm" weight="medium" color="secondary" style={styles.emptySubtitle}>
              Aproveite para descansar ou adicione algo novo à agenda.
            </Text>
            <View style={styles.emptyButton}>
              <Button onPress={() => navigation.navigate('CriarCompromisso', { data })}>Adicionar compromisso</Button>
            </View>
          </View>
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
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  backInline: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeline: {
    marginTop: theme.spacing.lg,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  hora: {
    width: 48,
    paddingTop: 2,
  },
  dotColumn: {
    alignItems: 'center',
  },
  dot: {
    width: 11,
    height: 11,
    borderRadius: 6,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: 'rgba(43,41,36,0.12)',
    marginVertical: 2,
  },
  eventCard: {
    flex: 1,
    marginBottom: theme.spacing.sm,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  eventTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  strike: {
    textDecorationLine: 'line-through',
  },
  eventSubtitle: {
    marginTop: 4,
  },
  statusBadge: {
    marginTop: theme.spacing.xs,
    alignSelf: 'flex-start',
    borderRadius: 8,
    backgroundColor: 'rgba(184,92,76,0.12)',
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  registrarButton: {
    marginTop: theme.spacing.sm,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    marginTop: 40,
    alignItems: 'center',
    gap: 10,
  },
  emptyTitle: {
    textAlign: 'center',
  },
  emptySubtitle: {
    textAlign: 'center',
    maxWidth: 220,
  },
  emptyButton: {
    marginTop: theme.spacing.sm,
    alignSelf: 'stretch',
  },
});
