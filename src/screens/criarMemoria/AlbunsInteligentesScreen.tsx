import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { Toast, useToast } from '../../components/ui/Toast';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMemoriesStore } from '../../store/useMemoriesStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AlbunsInteligentes'>;

interface AlbumCard {
  nome: string;
  tipo?: string;
  contagem: number;
}

export function AlbunsInteligentesScreen({ navigation }: Props) {
  const memorias = useMemoriesStore((state) => state.memorias);
  const customAlbuns = useMemoriesStore((state) => state.customAlbuns);
  const criarAlbum = useMemoriesStore((state) => state.criarAlbum);
  const { message, show } = useToast();

  const [novoAlbumAberto, setNovoAlbumAberto] = useState(false);
  const [novoAlbumNome, setNovoAlbumNome] = useState('');

  const albuns: AlbumCard[] = useMemo(() => {
    const porTipo = new Map<string, number>();
    memorias.forEach((memoria) => porTipo.set(memoria.tipo, (porTipo.get(memoria.tipo) ?? 0) + 1));
    const smart = Array.from(porTipo.entries()).map(([tipo, contagem]) => ({ nome: tipo, tipo, contagem }));
    const custom = customAlbuns.map((nome) => ({ nome, contagem: 0 }));
    return [...smart, ...custom];
  }, [memorias, customAlbuns]);

  function confirmarAlbum() {
    const nome = novoAlbumNome.trim() || 'Álbum sem nome';
    criarAlbum(nome);
    setNovoAlbumNome('');
    setNovoAlbumAberto(false);
    show(`Álbum "${nome}" criado!`);
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.back} onPress={() => navigation.goBack()}>
          <BackIcon />
        </Pressable>

        <Text variant="xxl" weight="extraBold" style={styles.title}>
          Álbuns inteligentes
        </Text>
        <Text variant="md" weight="medium" color="secondary" style={styles.subtitle}>
          Criados automaticamente pela IA a partir das suas memórias.
        </Text>

        <View style={styles.grid}>
          {albuns.map((album) => (
            <Pressable
              key={album.nome}
              style={styles.card}
              onPress={() => navigation.navigate('AlbumDetalhe', { nome: album.nome, tipo: album.tipo })}
            >
              <View style={styles.cardThumb}>
                <Text variant="xs" weight="semiBold" color={theme.colors.accent.leather} style={styles.cardThumbLabel}>
                  álbum
                </Text>
              </View>
              <View style={styles.cardFooter}>
                <Text variant="sm" weight="bold">
                  {album.nome}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        {novoAlbumAberto ? (
          <View style={styles.novoAlbumRow}>
            <TextField
              style={styles.novoAlbumInput}
              value={novoAlbumNome}
              onChangeText={setNovoAlbumNome}
              placeholder="Nome do álbum"
            />
            <Pressable style={styles.novoAlbumButton} onPress={confirmarAlbum}>
              <Text variant="sm" weight="extraBold">
                Criar
              </Text>
            </Pressable>
          </View>
        ) : (
          <Pressable style={styles.novoAlbumToggle} onPress={() => setNovoAlbumAberto(true)}>
            <Text variant="sm" weight="bold" color={theme.colors.accent.leather}>
              + Criar álbum personalizado
            </Text>
          </Pressable>
        )}
      </ScrollView>

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
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xxl,
  },
  back: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 2,
  },
  title: {
    marginTop: theme.spacing.lg,
  },
  subtitle: {
    marginTop: theme.spacing.xs,
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
    overflow: 'hidden',
    backgroundColor: theme.colors.placeholder.background,
  },
  cardThumb: {
    height: 110,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardThumbLabel: {
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  cardFooter: {
    padding: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.background,
  },
  novoAlbumRow: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  novoAlbumInput: {
    flex: 1,
    height: 44,
  },
  novoAlbumButton: {
    height: 44,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: 14,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  novoAlbumToggle: {
    marginTop: theme.spacing.lg,
    height: theme.buttonHeight.min + 4,
    borderRadius: (theme.buttonHeight.min + 4) / 2,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: 'rgba(43,41,36,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
