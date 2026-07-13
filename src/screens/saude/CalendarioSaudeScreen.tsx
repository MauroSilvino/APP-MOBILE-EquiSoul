import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useHorseStore } from '../../store/useHorseStore';
import { useHealthStore } from '../../store/useHealthStore';

type Props = NativeStackScreenProps<RootStackParamList, 'CalendarioSaude'>;

const WEEKDAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MESES = [
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
const MES_ABREV: Record<string, number> = {
  jan: 0,
  fev: 1,
  mar: 2,
  abr: 3,
  mai: 4,
  jun: 5,
  jul: 6,
  ago: 7,
  set: 8,
  out: 9,
  nov: 10,
  dez: 11,
};

function parseDataPt(texto: string): Date | null {
  const match = texto.trim().toLowerCase().match(/^(\d{1,2})\s+([a-zç]{3})\w*\s+(\d{4})$/);
  if (!match) return null;
  const dia = Number(match[1]);
  const mes = MES_ABREV[match[2]];
  const ano = Number(match[3]);
  if (mes === undefined) return null;
  return new Date(ano, mes, dia);
}

interface Evento {
  label: string;
  cor: string;
}

const LEGENDA = [
  { label: 'Vacinas', cor: theme.colors.accent.gold },
  { label: 'Vermifugação', cor: theme.colors.accent.olive },
  { label: 'Ferrageamento', cor: theme.colors.accent.leather },
  { label: 'Odontologia', cor: theme.colors.accent.moss },
  { label: 'Exames', cor: theme.colors.error },
];

export function CalendarioSaudeScreen({ navigation, route }: Props) {
  const horses = useHorseStore((state) => state.horses);
  const horse = horses.find((h) => h.id === route.params.id) ?? horses[0];
  const records = useHealthStore((state) => (horse ? state.getRecords(horse.id) : null));
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const hoje = new Date();
  const ano = hoje.getFullYear();
  const mes = hoje.getMonth();

  const eventosPorDia = useMemo(() => {
    const map = new Map<number, Evento[]>();
    if (!records) return map;

    function registrar(dataTexto: string | undefined, label: string, cor: string) {
      if (!dataTexto) return;
      const data = parseDataPt(dataTexto);
      if (!data || data.getFullYear() !== ano || data.getMonth() !== mes) return;
      const dia = data.getDate();
      const lista = map.get(dia) ?? [];
      lista.push({ label, cor: cor });
      map.set(dia, lista);
    }

    records.vacinas.forEach((v) => registrar(v.data, `Vacina · ${v.nome}`, theme.colors.accent.gold));
    records.vermifugacoes.forEach((v) =>
      registrar(v.data, `Vermifugação · ${v.produto}`, theme.colors.accent.olive),
    );
    records.ferrageamentos.forEach((f) =>
      registrar(f.data, `Ferrageamento · ${f.tipo}`, theme.colors.accent.leather),
    );
    records.odontologia.forEach((o) =>
      registrar(o.data, `Odontologia · ${o.procedimento}`, theme.colors.accent.moss),
    );
    records.exames.forEach((e) => registrar(e.data, `Exame · ${e.nome}`, theme.colors.error));

    return map;
  }, [records, ano, mes]);

  if (!horse) {
    return (
      <Screen>
        <Text variant="md" weight="bold">
          Cavalo não encontrado.
        </Text>
      </Screen>
    );
  }

  const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
  const diasNoMes = new Date(ano, mes + 1, 0).getDate();
  const celulas: (number | null)[] = [
    ...Array(primeiroDiaSemana).fill(null),
    ...Array.from({ length: diasNoMes }, (_, index) => index + 1),
  ];

  const eventosDoDiaSelecionado = selectedDay ? eventosPorDia.get(selectedDay) ?? [] : [];

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Calendário
        </Text>
        <Text variant="md" weight="bold" style={styles.mesLabel}>
          {MESES[mes]} {ano}
        </Text>

        <View style={styles.grid}>
          {WEEKDAYS.map((dia) => (
            <Text key={dia} variant="xs" weight="bold" color="tertiary" style={styles.weekdayCell}>
              {dia}
            </Text>
          ))}
          {celulas.map((dia, index) => {
            if (dia === null) return <View key={`blank-${index}`} style={styles.dayCell} />;
            const eventos = eventosPorDia.get(dia) ?? [];
            const isHoje = dia === hoje.getDate();
            return (
              <Pressable key={dia} style={styles.dayCell} onPress={() => setSelectedDay(dia)}>
                <View style={[styles.dayInner, isHoje && styles.dayInnerHoje]}>
                  <Text variant="sm" weight="semiBold">
                    {dia}
                  </Text>
                  {eventos.length > 0 && (
                    <View style={[styles.eventDot, { backgroundColor: eventos[0].cor }]} />
                  )}
                </View>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.legenda}>
          {LEGENDA.map((item) => (
            <View key={item.label} style={styles.legendaRow}>
              <View style={[styles.legendaDot, { backgroundColor: item.cor }]} />
              <Text variant="sm" weight="semiBold">
                {item.label}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <BottomTabBar active="Perfis" />

      <Pressable style={styles.backButton} onPress={() => navigation.navigate('SaudeCavalo', { id: horse.id })} hitSlop={8}>
        <BackIcon />
      </Pressable>

      <Modal visible={selectedDay !== null} transparent animationType="fade" onRequestClose={() => setSelectedDay(null)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setSelectedDay(null)} />
        <View style={styles.sheet}>
          <View style={styles.sheetHandle} />
          <Text variant="lg" weight="extraBold">
            {selectedDay} de {MESES[mes]}
          </Text>
          {eventosDoDiaSelecionado.length === 0 ? (
            <Text variant="sm" weight="medium" color="secondary" style={styles.sheetEmpty}>
              Nenhum evento neste dia.
            </Text>
          ) : (
            <View style={styles.sheetList}>
              {eventosDoDiaSelecionado.map((evento, index) => (
                <View key={index} style={styles.sheetEvent}>
                  <View style={[styles.legendaDot, { backgroundColor: evento.cor }]} />
                  <Text variant="sm" weight="semiBold">
                    {evento.label}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: 70,
    paddingBottom: 130,
  },
  mesLabel: {
    marginTop: theme.spacing.md,
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
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayInner: {
    width: 34,
    height: 34,
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
  legenda: {
    marginTop: theme.spacing.xl,
    gap: theme.spacing.sm,
  },
  legendaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  legendaDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
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
    elevation: 3,
  },
  modalBackdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(43,41,36,0.4)',
  },
  sheet: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: theme.cardPadding.max,
    paddingBottom: 28,
  },
  sheetHandle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(43,41,36,0.15)',
    alignSelf: 'center',
    marginBottom: theme.spacing.md,
  },
  sheetEmpty: {
    marginTop: theme.spacing.md,
  },
  sheetList: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  sheetEvent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderRadius: 14,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
});
