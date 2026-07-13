import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Chip } from '../../components/ui/Chip';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useEventsStore } from '../../store/useEventsStore';

type Props = NativeStackScreenProps<RootStackParamList, 'EventosCalendario'>;

const VISUALIZACOES = ['Mensal', 'Semanal', 'Agenda'];
const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];
const SYNC_OPTIONS = ['Google', 'Apple', 'Outlook'];

export function EventosCalendarioScreen({ navigation }: Props) {
  const eventos = useEventsStore((state) => state.eventos);
  const [visualizacao, setVisualizacao] = useState('Mensal');

  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();

  const eventoPorDia = useMemo(() => {
    const map: Record<number, string> = {};
    eventos.forEach((evento) => {
      const [evAno, evMes] = evento.dataISO.split('-').map(Number);
      if (evAno === ano && evMes === mes + 1) map[evento.dia] = evento.id;
    });
    return map;
  }, [eventos, ano, mes]);

  const dias = useMemo(() => {
    const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
    const totalDias = new Date(ano, mes + 1, 0).getDate();
    return Array.from({ length: 35 }, (_, i) => {
      const num = i - primeiroDiaSemana + 1;
      const valido = num >= 1 && num <= totalDias;
      const eventId = valido ? eventoPorDia[num] : undefined;
      return { num: valido ? num : null, eventId };
    });
  }, [ano, mes, eventoPorDia]);

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Calendário
        </Text>

        <View style={styles.chipsRow}>
          {VISUALIZACOES.map((label) => (
            <Chip key={label} label={label} selected={visualizacao === label} onPress={() => setVisualizacao(label)} />
          ))}
        </View>

        <Text variant="lg" weight="bold" style={styles.mesLabel}>
          {MESES[mes]} {ano}
        </Text>

        <View style={styles.grid}>
          {WEEKDAYS.map((w, i) => (
            <Text key={`w-${i}`} variant="xs" weight="bold" color="tertiary" style={styles.weekdayCell}>
              {w}
            </Text>
          ))}
          {dias.map((d, i) => (
            <Pressable
              key={i}
              disabled={!d.eventId}
              style={styles.dayCell}
              onPress={() => d.eventId && navigation.navigate('EventoPagina', { eventId: d.eventId })}
            >
              {d.num !== null && (
                <Text variant="sm" weight="semiBold">
                  {d.num}
                </Text>
              )}
              {!!d.eventId && <View style={styles.eventDot} />}
            </Pressable>
          ))}
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          SINCRONIZAR COM
        </Text>
        <View style={styles.syncRow}>
          {SYNC_OPTIONS.map((label) => (
            <View key={label} style={styles.syncButton}>
              <Text variant="xs" weight="bold">
                {label}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
        <BackIcon size={16} />
      </Pressable>

      <BottomTabBar active="Comunidade" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: 60,
    paddingBottom: 130,
  },
  chipsRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  mesLabel: {
    marginTop: theme.spacing.lg,
  },
  grid: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  weekdayCell: {
    width: '13%',
    textAlign: 'center',
  },
  dayCell: {
    width: '13%',
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventDot: {
    position: 'absolute',
    bottom: 3,
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
  syncRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  syncButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 20,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 4,
  },
});
