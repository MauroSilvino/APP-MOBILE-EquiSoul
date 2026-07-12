import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMemoriesStore } from '../../store/useMemoriesStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Calendario'>;

const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const MONTHS = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

export function CalendarioScreen({ navigation }: Props) {
  const memorias = useMemoriesStore((state) => state.memorias);

  const now = useMemo(() => new Date(), []);
  const [modo, setModo] = useState<'calendario' | 'agenda'>('calendario');
  const [selectedDay, setSelectedDay] = useState(now.getDate());

  const year = now.getFullYear();
  const month = now.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const totalCells = Math.ceil((firstWeekday + daysInMonth) / 7) * 7;

  const registrosPorDia = new Map<number, (typeof memorias)[number]>();
  memorias.forEach((memoria) => {
    if (memoria.diaDoMes !== null && !registrosPorDia.has(memoria.diaDoMes)) {
      registrosPorDia.set(memoria.diaDoMes, memoria);
    }
  });
  const eventDays = Array.from(registrosPorDia.keys()).sort((a, b) => a - b);
  const registroDoDia = registrosPorDia.get(selectedDay) ?? null;

  const cells = Array.from({ length: totalCells }, (_, i) => {
    const num = i - firstWeekday + 1;
    const valid = num >= 1 && num <= daysInMonth;
    return { num: valid ? num : null, hasEvent: valid && registrosPorDia.has(num) };
  });

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Calendário
        </Text>

        <View style={styles.modeRow}>
          <Pressable
            style={[styles.modeChip, modo === 'calendario' && styles.modeChipActive]}
            onPress={() => setModo('calendario')}
          >
            <Text variant="sm" weight="bold" color={modo === 'calendario' ? theme.colors.accent.gold : 'primary'}>
              Modo calendário
            </Text>
          </Pressable>
          <Pressable
            style={[styles.modeChip, modo === 'agenda' && styles.modeChipActive]}
            onPress={() => setModo('agenda')}
          >
            <Text variant="sm" weight="bold" color={modo === 'agenda' ? theme.colors.accent.gold : 'primary'}>
              Modo agenda
            </Text>
          </Pressable>
        </View>

        {modo === 'calendario' ? (
          <>
            <Text variant="lg" weight="bold" style={styles.monthLabel}>
              {MONTHS[month]} {year}
            </Text>
            <View style={styles.grid}>
              {WEEKDAYS.map((label, index) => (
                <Text key={`${label}-${index}`} variant="xs" weight="bold" color="tertiary" style={styles.weekday}>
                  {label}
                </Text>
              ))}
              {cells.map((cell, index) => {
                const selected = cell.num !== null && cell.num === selectedDay;
                return (
                  <Pressable
                    key={index}
                    disabled={cell.num === null}
                    onPress={() => cell.num !== null && setSelectedDay(cell.num)}
                    style={[styles.day, selected && styles.daySelected]}
                  >
                    <Text
                      variant="sm"
                      weight="semiBold"
                      color={cell.num === null ? 'transparent' : selected ? theme.colors.accent.gold : 'primary'}
                    >
                      {cell.num ?? ''}
                    </Text>
                    {cell.hasEvent && <View style={styles.eventDot} />}
                  </Pressable>
                );
              })}
            </View>

            <Text variant="xs" weight="bold" style={styles.sectionLabel}>
              REGISTROS EM {selectedDay} DE {MONTHS[month].toUpperCase()}
            </Text>
            {registroDoDia ? (
              <Pressable
                style={styles.registroCard}
                onPress={() => navigation.navigate('MemoriaCompleta', { id: registroDoDia.id })}
              >
                <View style={styles.registroThumb} />
                <View style={styles.registroText}>
                  <Text variant="md" weight="bold">
                    {registroDoDia.titulo}
                  </Text>
                  {!!registroDoDia.subtitulo && (
                    <Text variant="sm" weight="medium" color="secondary" style={styles.registroSubtitle}>
                      {registroDoDia.subtitulo}
                    </Text>
                  )}
                </View>
              </Pressable>
            ) : (
              <View style={styles.emptyBox}>
                <Text variant="sm" weight="medium" color="secondary">
                  Nenhum registro neste dia ainda.
                </Text>
              </View>
            )}
          </>
        ) : (
          <View style={styles.agendaList}>
            {eventDays.map((dia) => {
              const memoria = registrosPorDia.get(dia)!;
              return (
                <Pressable
                  key={dia}
                  style={styles.registroCard}
                  onPress={() => navigation.navigate('MemoriaCompleta', { id: memoria.id })}
                >
                  <Text variant="sm" weight="bold" color={theme.colors.accent.leather} style={styles.agendaDia}>
                    {dia} {MONTHS[month].slice(0, 3).toLowerCase()}
                  </Text>
                  <View style={styles.registroText}>
                    <Text variant="md" weight="bold">
                      {memoria.titulo}
                    </Text>
                    {!!memoria.subtitulo && (
                      <Text variant="sm" weight="medium" color="secondary" style={styles.registroSubtitle}>
                        {memoria.subtitulo}
                      </Text>
                    )}
                  </View>
                </Pressable>
              );
            })}
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
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xxl,
  },
  modeRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  modeChip: {
    paddingVertical: theme.chipPadding.vertical,
    paddingHorizontal: theme.chipPadding.horizontal,
    borderRadius: theme.radius.chip,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  modeChipActive: {
    backgroundColor: theme.colors.surfaceDark,
  },
  monthLabel: {
    marginTop: theme.spacing.lg,
  },
  grid: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  weekday: {
    width: `${100 / 7}%`,
    textAlign: 'center',
  },
  day: {
    width: `${100 / 7}%`,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  daySelected: {
    backgroundColor: theme.colors.surfaceDark,
    borderRadius: 12,
  },
  eventDot: {
    position: 'absolute',
    bottom: 4,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: theme.colors.accent.gold,
  },
  sectionLabel: {
    marginTop: theme.spacing.xl,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  registroCard: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    gap: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    alignItems: 'center',
  },
  registroThumb: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: theme.colors.placeholder.background,
  },
  registroText: {
    flex: 1,
    minWidth: 0,
  },
  registroSubtitle: {
    marginTop: 2,
  },
  emptyBox: {
    marginTop: theme.spacing.sm,
    padding: theme.spacing.lg,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(43,41,36,0.04)',
    alignItems: 'center',
  },
  agendaList: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  agendaDia: {
    width: 44,
  },
});
