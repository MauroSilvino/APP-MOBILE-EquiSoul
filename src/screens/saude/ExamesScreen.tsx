import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Screen } from '../../components/ui/Screen';
import { Switch } from '../../components/ui/Switch';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { Toast, useToast } from '../../components/ui/Toast';
import { BackIcon, ExamIcon, PlusIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useHorseStore } from '../../store/useHorseStore';
import { useHealthStore } from '../../store/useHealthStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Exames'>;

export function ExamesScreen({ navigation, route }: Props) {
  const horses = useHorseStore((state) => state.horses);
  const horse = horses.find((h) => h.id === route.params.id) ?? horses[0];
  const records = useHealthStore((state) => (horse ? state.getRecords(horse.id) : null));
  const addExame = useHealthStore((state) => state.addExame);
  const { message, show } = useToast();

  const [aberto, setAberto] = useState(false);
  const [nome, setNome] = useState('');
  const [laboratorio, setLaboratorio] = useState('');
  const [data, setData] = useState('');
  const [isImaging, setIsImaging] = useState(false);

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
    addExame(horse!.id, {
      nome: nome.trim(),
      laboratorio: laboratorio.trim() || 'Não informado',
      data: data.trim(),
      isImaging,
    });
    setNome('');
    setLaboratorio('');
    setData('');
    setIsImaging(false);
    setAberto(false);
    show('Exame registrado!');
  }

  const exames = records?.exames ?? [];

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="xxl" weight="extraBold">
            Exames
          </Text>
          <Pressable style={styles.addButton} onPress={() => setAberto((current) => !current)}>
            <PlusIcon size={16} strokeWidth={2.4} />
          </Pressable>
        </View>

        {aberto && (
          <View style={styles.form}>
            <TextField placeholder="Nome do exame" value={nome} onChangeText={setNome} />
            <TextField
              placeholder="Laboratório"
              value={laboratorio}
              onChangeText={setLaboratorio}
              style={styles.formField}
            />
            <TextField
              placeholder="Data (ex: 12 jul 2026)"
              value={data}
              onChangeText={setData}
              style={styles.formField}
            />
            <View style={styles.toggleRow}>
              <Text variant="sm" weight="bold">
                Exame de imagem
              </Text>
              <Switch value={isImaging} onValueChange={setIsImaging} />
            </View>
            <View style={styles.attachBox}>
              <Text variant="xs" weight="bold" color="tertiary" style={styles.attachLabel}>
                arraste um laudo/documento aqui
              </Text>
            </View>
            <Pressable style={styles.salvarButton} onPress={handleSalvar}>
              <Text variant="sm" weight="extraBold">
                Salvar exame
              </Text>
            </Pressable>
          </View>
        )}

        {exames.length === 0 ? (
          <Text variant="sm" weight="medium" color="secondary" style={styles.empty}>
            Nenhum exame registrado ainda.
          </Text>
        ) : (
          <View style={styles.list}>
            {exames.map((exame) => (
              <View key={exame.id} style={styles.card}>
                <View style={styles.cardIcon}>
                  <ExamIcon />
                </View>
                <View style={styles.cardBody}>
                  <Text variant="md" weight="bold">
                    {exame.nome}
                  </Text>
                  <Text variant="xs" weight="medium" color="secondary" style={styles.cardSubtitle}>
                    {exame.laboratorio} · {exame.data}
                  </Text>
                </View>
                {exame.isImaging && (
                  <View style={styles.badge}>
                    <Text variant="xs" weight="bold" color={theme.colors.accent.moss}>
                      com imagem
                    </Text>
                  </View>
                )}
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
  toggleRow: {
    marginTop: theme.spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  attachBox: {
    height: 70,
    borderRadius: 14,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: 'rgba(43,41,36,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  attachLabel: {
    textTransform: 'uppercase',
    letterSpacing: 0.4,
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
  cardIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: 'rgba(201,161,90,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: {
    flex: 1,
  },
  cardSubtitle: {
    marginTop: 2,
  },
  badge: {
    borderRadius: 10,
    backgroundColor: 'rgba(107,115,83,0.14)',
    paddingVertical: 5,
    paddingHorizontal: 10,
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
