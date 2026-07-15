import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, CheckIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePremiumStore } from '../../store/usePremiumStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PremiumBiblioteca'>;

export function PremiumBibliotecaScreen({ navigation }: Props) {
  const bibliotecaCategorias = usePremiumStore((state) => state.bibliotecaCategorias);
  const bibliotecaCategoriaSelecionada = usePremiumStore((state) => state.bibliotecaCategoriaSelecionada);
  const selecionarBibliotecaCategoria = usePremiumStore((state) => state.selecionarBibliotecaCategoria);
  const bibliotecaList = usePremiumStore((state) => state.bibliotecaList);
  const bibliotecaIniciados = usePremiumStore((state) => state.bibliotecaIniciados);
  const toggleBibliotecaIniciado = usePremiumStore((state) => state.toggleBibliotecaIniciado);

  const listaFiltrada = bibliotecaList.filter((item) => item.categoria === bibliotecaCategoriaSelecionada);

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <BackIcon size={16} />
        </Pressable>

        <Text variant="xxl" weight="extraBold">
          Biblioteca Premium
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
          <View style={styles.chipsInner}>
            {bibliotecaCategorias.map((categoria) => {
              const ativa = categoria === bibliotecaCategoriaSelecionada;
              return (
                <Pressable
                  key={categoria}
                  style={[styles.chip, ativa && styles.chipAtiva]}
                  onPress={() => selecionarBibliotecaCategoria(categoria)}
                >
                  <Text variant="sm" weight="bold" color={ativa ? 'inverse' : 'primary'}>
                    {categoria}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        <View style={styles.list}>
          {listaFiltrada.length === 0 ? (
            <Text variant="sm" weight="semiBold" color="secondary" style={styles.empty}>
              Nenhum conteúdo nessa categoria ainda.
            </Text>
          ) : (
            listaFiltrada.map((item) => {
              const iniciado = !!bibliotecaIniciados[item.id];
              return (
                <Pressable
                  key={item.id}
                  style={styles.row}
                  onPress={() => toggleBibliotecaIniciado(item.id)}
                >
                  <View style={styles.rowThumb} />
                  <View style={styles.rowInfo}>
                    <Text variant="sm" weight="bold">
                      {item.titulo}
                    </Text>
                    <Text variant="xs" weight="semiBold" color={theme.colors.accent.leather} style={styles.status}>
                      {item.statusLabel}
                    </Text>
                  </View>
                  {iniciado && <CheckIcon size={16} color={theme.colors.accent.olive} strokeWidth={2.4} />}
                </Pressable>
              );
            })
          )}
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
    paddingBottom: 40,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  chipsRow: {
    marginTop: theme.spacing.md,
  },
  chipsInner: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  chip: {
    paddingVertical: theme.chipPadding.vertical,
    paddingHorizontal: theme.chipPadding.horizontal,
    borderRadius: theme.radius.chip,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  chipAtiva: {
    backgroundColor: theme.colors.surfaceDark,
  },
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  empty: {
    marginTop: theme.spacing.md,
  },
  row: {
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
  rowThumb: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: theme.colors.placeholder.background,
  },
  rowInfo: {
    flex: 1,
    minWidth: 0,
  },
  status: {
    marginTop: 2,
  },
});
