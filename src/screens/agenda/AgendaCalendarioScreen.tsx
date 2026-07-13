import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { TIPO_COMPROMISSO_COR, TipoCompromisso, useAgendaStore } from '../../store/useAgendaStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AgendaCalendario'>;

const WEEKDAYS = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const MESES = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];
const VISUALIZACOES = ['Dia', 'Semana', 'Mês', 'Agenda', 'Linha do tempo'];
const TIPOS: TipoCompromisso[] = ['Treino', 'Passeio', 'Consulta', 'Evento', 'Ferrageamento', 'Competição', 'Outro'];

export function AgendaCalendarioScreen({ navigation }: Props) {
  const compromissos = useAgendaStore((state) => state.compromissos);
  const [visualizacao, setVisualizacao] = useState('Mês');

  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();

  const corPorDia = useMemo(() => {
    const map = new Map<number, string>();
    compromissos.forEach((c) => {
      const [cAno, cMes, cDia] = c.data.split('-').map(Number);
      if (cAno === ano && (cMes ?? 0) - 1 === mes) {
        map.set(cDia, TIPO_COMPROMISSO_COR[c.tipo]);
      }
    });
    return map;
  }, [compromissos, ano, mes]);

  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const celulas: (number | null)[] = [
    ...Array(primeiroDiaSemana).fill(null),
    ...Array.from({ length: diasNoMes }, (_, index) => index + 1),
  ];

  function irParaDia(dia: number) {
    const mesStr = String(mes + 1).padStart(2, '0');
    const diaStr = String(dia).padStart(2, '0');
    navigation.navigate('AgendaDoDia', { data: `${ano}-${mesStr}-${diaStr}` });
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable style={styles.backInline} onPress={() => navigation.goBack()} hitSlop={8}>
            <BackIcon size={16} />
          </Pressable>
          <Text variant="xxl" weight="extraBold">
            Calendário
          </Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
          {VISUALIZACOES.map((label) => {
            const selected = visualizacao === label;
            return (
              <Pressable
                key={label}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => setVisualizacao(label)}
              >
                <Text variant="sm" weight="bold" color={selected ? theme.colors.accent.gold : 'primary'}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <Text variant="lg" weight="bold" style={styles.mesLabel}>
          {MESES[mes]} {ano}
        </Text>

        <View style={styles.grid}>
          {WEEKDAYS.map((dia, index) => (
            <Text key={`${dia}-${index}`} variant="xs" weight="bold" color="tertiary" style={styles.weekdayCell}>
              {dia}
            </Text>
          ))}
          {celulas.map((dia, index) => {
            if (dia === null) return <View key={`blank-${index}`} style={styles.dayCell} />;
            const cor = corPorDia.get(dia);
            const isHoje = dia === hoje.getDate();
            return (
              <Pressable key={dia} style={styles.dayCell} onPress={() => irParaDia(dia)}>
                <View style={[styles.dayInner, isHoje && styles.dayInnerHoje]}>
                  <Text variant="sm" weight="semiBold">
                    {dia}
                  </Text>
                  {!!cor && <View style={[styles.eventDot, { backgroundColor: cor }]} />}
                </View>
              </Pressable>
            );
          })}
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          LEGENDA
        </Text>
        <View style={styles.legenda}>
          {TIPOS.map((tipo) => (
            <View key={tipo} style={styles.legendaItem}>
              <View style={[styles.legendaDot, { backgroundColor: TIPO_COMPROMISSO_COR[tipo] }]} />
              <Text variant="xs" weight="semiBold">
                {tipo}
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
  chipsRow: {
    marginTop: theme.spacing.md,
  },
  chip: {
    paddingVertical: theme.chipPadding.vertical,
    paddingHorizontal: theme.chipPadding.horizontal,
    borderRadius: theme.radius.chip,
    backgroundColor: 'rgba(43,41,36,0.06)',
    marginRight: theme.spacing.sm,
  },
  chipSelected: {
    backgroundColor: theme.colors.surfaceDark,
  },
  mesLabel: {
    marginTop: theme.spacing.lg,
  },
  grid: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  weekdayCell: {
    width: `${100 / 7}%`,
    textAlign: 'center',
    marginBottom: theme.spacing.sm,
  },
  dayCell: {
    width: `${100 / 7}%`,
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayInner: {
    width: 32,
    height: 32,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayInnerHoje: {
    backgroundColor: 'rgba(201,161,90,0.16)',
  },
  eventDot: {
    position: 'absolute',
    bottom: 3,
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  sectionLabel: {
    marginTop: theme.spacing.xl,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  legenda: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  legendaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendaDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
});
