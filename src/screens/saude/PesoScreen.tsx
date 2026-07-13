import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { LineChart } from '../../components/ui/LineChart';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { Toast, useToast } from '../../components/ui/Toast';
import { BackIcon, PlusIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useHorseStore } from '../../store/useHorseStore';
import { useHealthStore } from '../../store/useHealthStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Peso'>;

const MES_ATUAL = new Date().toLocaleDateString('pt-BR', { month: 'short' }).replace('.', '');

export function PesoScreen({ navigation, route }: Props) {
  const horses = useHorseStore((state) => state.horses);
  const horse = horses.find((h) => h.id === route.params.id) ?? horses[0];
  const records = useHealthStore((state) => (horse ? state.getRecords(horse.id) : null));
  const addPeso = useHealthStore((state) => state.addPeso);
  const { message, show } = useToast();

  const [aberto, setAberto] = useState(false);
  const [valor, setValor] = useState('');

  const pesos = records?.pesos ?? [];

  const { min, max } = useMemo(() => {
    if (pesos.length === 0) return { min: 0, max: 100 };
    const valores = pesos.map((p) => p.valorKg);
    const dataMin = Math.min(...valores);
    const dataMax = Math.max(...valores);
    return { min: Math.floor((dataMin - 20) / 10) * 10, max: Math.ceil((dataMax + 20) / 10) * 10 };
  }, [pesos]);

  if (!horse) {
    return (
      <Screen>
        <Text variant="md" weight="bold">
          Cavalo não encontrado.
        </Text>
      </Screen>
    );
  }

  function handleSalvar() {
    const numero = Number(valor.replace(',', '.'));
    if (!numero || Number.isNaN(numero)) return;
    addPeso(horse!.id, MES_ATUAL, numero);
    setValor('');
    setAberto(false);
    show('Peso registrado!');
  }

  const pesoAtual = pesos[pesos.length - 1];

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="xxl" weight="extraBold">
            Peso
          </Text>
          <Pressable style={styles.addButton} onPress={() => setAberto((current) => !current)}>
            <PlusIcon size={16} strokeWidth={2.4} />
          </Pressable>
        </View>

        {aberto && (
          <View style={styles.form}>
            <TextField
              placeholder="Peso em kg (ex: 480)"
              value={valor}
              onChangeText={setValor}
              keyboardType="numeric"
            />
            <Pressable style={styles.salvarButton} onPress={handleSalvar}>
              <Text variant="sm" weight="extraBold">
                Salvar peso
              </Text>
            </Pressable>
          </View>
        )}

        {pesos.length === 0 ? (
          <Text variant="sm" weight="medium" color="secondary" style={styles.empty}>
            Nenhum registro de peso ainda.
          </Text>
        ) : (
          <>
            <View style={styles.chartCard}>
              <LineChart
                data={pesos.map((p) => ({ label: p.mes, value: p.valorKg }))}
                min={min}
                max={max}
                bandLabel={`Faixa de peso saudável para ${horse.nome}`}
              />
            </View>

            <View style={styles.statsRow}>
              <View style={styles.statCard}>
                <Text variant="xl" weight="extraBold">
                  {pesoAtual.valorKg} kg
                </Text>
                <Text variant="xs" weight="bold" color="secondary" style={styles.statLabel}>
                  Peso atual
                </Text>
              </View>
            </View>

            <Text variant="sm" weight="medium" color="secondary" style={styles.trendText}>
              O peso de {horse.nome} está sendo acompanhado ao longo do tempo.
            </Text>
          </>
        )}
      </ScrollView>

      <BottomTabBar active="Perfis" />

      <Pressable style={styles.backButton} onPress={() => navigation.navigate('SaudeCavalo', { id: horse.id })} hitSlop={8}>
        <BackIcon />
      </Pressable>
      <Toast message={message} />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    marginTop: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    gap: theme.spacing.sm,
  },
  salvarButton: {
    marginTop: theme.spacing.xs,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    marginTop: theme.spacing.xxl,
    textAlign: 'center',
  },
  chartCard: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.cardLarge,
    backgroundColor: '#fff',
    padding: theme.cardPadding.max,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 2,
  },
  statsRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  statCard: {
    flex: 1,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  statLabel: {
    marginTop: 2,
  },
  trendText: {
    marginTop: theme.spacing.md,
    lineHeight: 20,
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
