import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { Toast, useToast } from '../../components/ui/Toast';
import { BackIcon, DocumentIcon, PlusIcon, SearchIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useHorseStore } from '../../store/useHorseStore';
import { useHealthStore } from '../../store/useHealthStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Documentos'>;

export function DocumentosScreen({ navigation, route }: Props) {
  const horses = useHorseStore((state) => state.horses);
  const horse = horses.find((h) => h.id === route.params.id) ?? horses[0];
  const records = useHealthStore((state) => (horse ? state.getRecords(horse.id) : null));
  const addDocumento = useHealthStore((state) => state.addDocumento);
  const { message, show } = useToast();

  const [aberto, setAberto] = useState(false);
  const [nome, setNome] = useState('');
  const [pasta, setPasta] = useState('');
  const [busca, setBusca] = useState('');

  const documentos = records?.documentos ?? [];

  const documentosFiltrados = useMemo(() => {
    if (!busca.trim()) return documentos;
    const termo = busca.trim().toLowerCase();
    return documentos.filter((doc) => doc.nome.toLowerCase().includes(termo));
  }, [documentos, busca]);

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
    if (!nome.trim()) return;
    addDocumento(horse!.id, {
      nome: nome.trim(),
      pasta: pasta.trim() || 'Geral',
    });
    setNome('');
    setPasta('');
    setAberto(false);
    show('Documento salvo!');
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="xxl" weight="extraBold">
            Documentos
          </Text>
          <Pressable style={styles.addButton} onPress={() => setAberto((current) => !current)}>
            <PlusIcon size={16} strokeWidth={2.4} />
          </Pressable>
        </View>

        {aberto && (
          <View style={styles.form}>
            <TextField placeholder="Nome do documento" value={nome} onChangeText={setNome} />
            <TextField
              placeholder="Pasta (ex: Exames, Receitas)"
              value={pasta}
              onChangeText={setPasta}
              style={styles.formField}
            />
            <View style={styles.attachBox}>
              <Text variant="xs" weight="bold" color="tertiary" style={styles.attachLabel}>
                arraste um arquivo aqui
              </Text>
            </View>
            <Pressable style={styles.salvarButton} onPress={handleSalvar}>
              <Text variant="sm" weight="extraBold">
                Salvar documento
              </Text>
            </Pressable>
          </View>
        )}

        <View style={styles.searchBox}>
          <SearchIcon size={16} color={theme.colors.text.secondary} />
          <TextField
            placeholder="Pesquisar documentos"
            value={busca}
            onChangeText={setBusca}
            style={styles.searchInput}
          />
        </View>

        {documentos.length === 0 ? (
          <Text variant="sm" weight="medium" color="secondary" style={styles.empty}>
            Nenhum documento ainda.
          </Text>
        ) : documentosFiltrados.length === 0 ? (
          <Text variant="sm" weight="medium" color="secondary" style={styles.empty}>
            Nenhum documento encontrado para "{busca}".
          </Text>
        ) : (
          <View style={styles.grid}>
            {documentosFiltrados.map((doc) => (
              <View key={doc.id} style={styles.card}>
                <DocumentIcon size={26} />
                <Text variant="sm" weight="bold" style={styles.cardNome}>
                  {doc.nome}
                </Text>
                <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.cardPasta}>
                  {doc.pasta.toUpperCase()}
                </Text>
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
  searchBox: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(43,41,36,0.05)',
    paddingHorizontal: theme.spacing.md,
  },
  searchInput: {
    flex: 1,
    height: 44,
    borderWidth: 0,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
  },
  empty: {
    marginTop: theme.spacing.xxl,
    textAlign: 'center',
  },
  grid: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  card: {
    width: '47%',
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
  cardNome: {
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  cardPasta: {
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
