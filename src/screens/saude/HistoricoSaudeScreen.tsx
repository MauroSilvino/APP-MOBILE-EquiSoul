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
import { useHorseStore } from '../../store/useHorseStore';
import { useHealthStore } from '../../store/useHealthStore';

type Props = NativeStackScreenProps<RootStackParamList, 'HistoricoSaude'>;

interface TimelineItem {
  id: string;
  titulo: string;
  data: string;
  tipo: string;
}

export function HistoricoSaudeScreen({ navigation, route }: Props) {
  const horses = useHorseStore((state) => state.horses);
  const horse = horses.find((h) => h.id === route.params.id) ?? horses[0];
  const records = useHealthStore((state) => (horse ? state.getRecords(horse.id) : null));
  const [filtro, setFiltro] = useState('Todos');

  const itens: TimelineItem[] = useMemo(() => {
    if (!records) return [];
    return [
      ...records.vacinas.map((v) => ({ id: v.id, titulo: `Vacina · ${v.nome}`, data: v.data, tipo: 'Vacinas' })),
      ...records.vermifugacoes.map((v) => ({
        id: v.id,
        titulo: `Vermifugação · ${v.produto}`,
        data: v.data,
        tipo: 'Vermifugação',
      })),
      ...records.ferrageamentos.map((f) => ({
        id: f.id,
        titulo: `Ferrageamento · ${f.ferrador}`,
        data: f.data,
        tipo: 'Ferrageamento',
      })),
      ...records.odontologia.map((o) => ({
        id: o.id,
        titulo: `Odontologia · ${o.procedimento}`,
        data: o.data,
        tipo: 'Odontologia',
      })),
      ...records.pesos.map((p) => ({ id: p.id, titulo: `Peso registrado · ${p.valorKg}kg`, data: p.mes, tipo: 'Peso' })),
    ];
  }, [records]);

  const tipos = useMemo(() => ['Todos', ...Array.from(new Set(itens.map((item) => item.tipo)))], [itens]);
  const itensFiltrados = filtro === 'Todos' ? itens : itens.filter((item) => item.tipo === filtro);

  if (!horse) {
    return (
      <Screen>
        <Text variant="md" weight="bold">
          Cavalo não encontrado.
        </Text>
      </Screen>
    );
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Histórico
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtros}>
          <View style={styles.filtrosInner}>
            {tipos.map((label) => (
              <Chip key={label} label={label} selected={filtro === label} onPress={() => setFiltro(label)} />
            ))}
          </View>
        </ScrollView>

        {itensFiltrados.length === 0 ? (
          <Text variant="sm" weight="semiBold" color="secondary" style={styles.empty}>
            Nenhum registro para este filtro ainda.
          </Text>
        ) : (
          <View style={styles.timeline}>
            {itensFiltrados.map((item, index) => (
              <View key={item.id} style={styles.timelineRow}>
                <View style={styles.timelineMarkerColumn}>
                  <View style={styles.timelineDot} />
                  {index < itensFiltrados.length - 1 && <View style={styles.timelineLine} />}
                </View>
                <View style={styles.timelineText}>
                  <Text variant="sm" weight="bold">
                    {item.titulo}
                  </Text>
                  <Text variant="xs" weight="medium" color="secondary" style={styles.timelineSubtitle}>
                    {item.data} · {item.tipo}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <BottomTabBar active="Perfis" />

      <Pressable style={styles.backButton} onPress={() => navigation.navigate('SaudeCavalo', { id: horse.id })} hitSlop={8}>
        <BackIcon />
      </Pressable>
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
  filtros: {
    marginTop: theme.spacing.lg,
  },
  filtrosInner: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  empty: {
    marginTop: theme.spacing.xxl,
    textAlign: 'center',
  },
  timeline: {
    marginTop: theme.spacing.lg,
  },
  timelineRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  timelineMarkerColumn: {
    alignItems: 'center',
    width: 12,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.accent.gold,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: 'rgba(43,41,36,0.12)',
    marginVertical: 2,
  },
  timelineText: {
    flex: 1,
    paddingBottom: theme.spacing.lg,
  },
  timelineSubtitle: {
    marginTop: 2,
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
});
