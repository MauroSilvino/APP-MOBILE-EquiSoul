import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { Toast, useToast } from '../../components/ui/Toast';
import { BackIcon, PlusIcon, VaccineIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useHorseStore } from '../../store/useHorseStore';
import { useHealthStore } from '../../store/useHealthStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Vacinas'>;

export function VacinasScreen({ navigation, route }: Props) {
  const horses = useHorseStore((state) => state.horses);
  const horse = horses.find((h) => h.id === route.params.id) ?? horses[0];
  const records = useHealthStore((state) => (horse ? state.getRecords(horse.id) : null));
  const addVacina = useHealthStore((state) => state.addVacina);
  const { message, show } = useToast();

  const [aberto, setAberto] = useState(false);
  const [nome, setNome] = useState('');
  const [data, setData] = useState('');
  const [veterinario, setVeterinario] = useState('');
  const [proxima, setProxima] = useState('');

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
    if (!nome.trim() || !data.trim()) return;
    addVacina(horse!.id, {
      nome: nome.trim(),
      data: data.trim(),
      veterinario: veterinario.trim() || 'Não informado',
      proxima: proxima.trim() || 'A definir',
    });
    setNome('');
    setData('');
    setVeterinario('');
    setProxima('');
    setAberto(false);
    show('Vacina registrada!');
  }

  const vacinas = records?.vacinas ?? [];

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="xxl" weight="extraBold">
            Vacinas
          </Text>
          <Pressable style={styles.addButton} onPress={() => setAberto((current) => !current)}>
            <PlusIcon size={16} strokeWidth={2.4} />
          </Pressable>
        </View>

        {aberto && (
          <View style={styles.form}>
            <TextField placeholder="Nome da vacina" value={nome} onChangeText={setNome} />
            <TextField placeholder="Data (ex: 12 mar 2026)" value={data} onChangeText={setData} style={styles.formField} />
            <TextField placeholder="Veterinário" value={veterinario} onChangeText={setVeterinario} style={styles.formField} />
            <TextField
              placeholder="Próxima previsão (ex: mar 2027)"
              value={proxima}
              onChangeText={setProxima}
              style={styles.formField}
            />
            <Pressable style={styles.salvarButton} onPress={handleSalvar}>
              <Text variant="sm" weight="extraBold">
                Salvar vacina
              </Text>
            </Pressable>
          </View>
        )}

        {vacinas.length === 0 ? (
          <Text variant="sm" weight="medium" color="secondary" style={styles.empty}>
            Nenhuma vacina registrada ainda.
          </Text>
        ) : (
          <View style={styles.list}>
            {vacinas.map((vacina) => (
              <View key={vacina.id} style={styles.card}>
                <View style={styles.cardIcon}>
                  <VaccineIcon />
                </View>
                <View style={styles.cardBody}>
                  <Text variant="md" weight="bold">
                    {vacina.nome}
                  </Text>
                  <Text variant="xs" weight="medium" color="secondary" style={styles.cardSubtitle}>
                    {vacina.data} · {vacina.veterinario}
                  </Text>
                  <View style={styles.badge}>
                    <Text variant="xs" weight="bold" color={theme.colors.accent.leather}>
                      Próxima previsão: {vacina.proxima}
                    </Text>
                  </View>
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
  formField: {
    marginTop: 0,
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
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  card: {
    flexDirection: 'row',
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
  cardIcon: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: 'rgba(201,161,90,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    flex: 1,
  },
  cardSubtitle: {
    marginTop: 4,
  },
  badge: {
    marginTop: theme.spacing.sm,
    alignSelf: 'flex-start',
    borderRadius: 12,
    backgroundColor: 'rgba(201,161,90,0.14)',
    paddingVertical: 6,
    paddingHorizontal: 12,
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
