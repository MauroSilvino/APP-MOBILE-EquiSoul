import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { Toast, useToast } from '../../components/ui/Toast';
import { BackIcon, ParasiteIcon, PlusIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useHorseStore } from '../../store/useHorseStore';
import { useHealthStore } from '../../store/useHealthStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Vermifugacao'>;

export function VermifugacaoScreen({ navigation, route }: Props) {
  const horses = useHorseStore((state) => state.horses);
  const horse = horses.find((h) => h.id === route.params.id) ?? horses[0];
  const records = useHealthStore((state) => (horse ? state.getRecords(horse.id) : null));
  const addVermifugacao = useHealthStore((state) => state.addVermifugacao);
  const { message, show } = useToast();

  const [aberto, setAberto] = useState(false);
  const [produto, setProduto] = useState('');
  const [data, setData] = useState('');
  const [veterinario, setVeterinario] = useState('');
  const [obs, setObs] = useState('');

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
    if (!produto.trim() || !data.trim()) return;
    addVermifugacao(horse!.id, {
      produto: produto.trim(),
      data: data.trim(),
      veterinario: veterinario.trim() || 'Não informado',
      obs: obs.trim(),
    });
    setProduto('');
    setData('');
    setVeterinario('');
    setObs('');
    setAberto(false);
    show('Vermifugação registrada!');
  }

  const vermifugacoes = records?.vermifugacoes ?? [];

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="xxl" weight="extraBold">
            Vermifugação
          </Text>
          <Pressable style={styles.addButton} onPress={() => setAberto((current) => !current)}>
            <PlusIcon size={16} strokeWidth={2.4} />
          </Pressable>
        </View>

        {aberto && (
          <View style={styles.form}>
            <TextField placeholder="Produto" value={produto} onChangeText={setProduto} />
            <TextField placeholder="Data (ex: 5 jun 2026)" value={data} onChangeText={setData} style={styles.formField} />
            <TextField placeholder="Veterinário" value={veterinario} onChangeText={setVeterinario} style={styles.formField} />
            <TextField placeholder="Observações" value={obs} onChangeText={setObs} style={styles.formField} />
            <Pressable style={styles.salvarButton} onPress={handleSalvar}>
              <Text variant="sm" weight="extraBold">
                Salvar registro
              </Text>
            </Pressable>
          </View>
        )}

        {vermifugacoes.length === 0 ? (
          <Text variant="sm" weight="medium" color="secondary" style={styles.empty}>
            Nenhum registro de vermifugação ainda.
          </Text>
        ) : (
          <View style={styles.list}>
            {vermifugacoes.map((item) => (
              <View key={item.id} style={styles.card}>
                <View style={styles.cardIcon}>
                  <ParasiteIcon />
                </View>
                <View style={styles.cardBody}>
                  <Text variant="md" weight="bold">
                    {item.produto}
                  </Text>
                  <Text variant="xs" weight="medium" color="secondary" style={styles.cardSubtitle}>
                    {item.data} · {item.veterinario}
                  </Text>
                  {!!item.obs && (
                    <Text variant="xs" weight="medium" color="secondary" style={styles.cardObs}>
                      {item.obs}
                    </Text>
                  )}
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
    backgroundColor: 'rgba(107,115,83,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    flex: 1,
  },
  cardSubtitle: {
    marginTop: 4,
  },
  cardObs: {
    marginTop: 6,
    lineHeight: 18,
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
