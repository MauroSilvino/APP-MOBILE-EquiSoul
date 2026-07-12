import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { CloseIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMemoriesStore } from '../../store/useMemoriesStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Marcacao'>;

const MARCACAO_CATEGORIAS = ['Pessoas', 'Instrutores', 'Haras', 'Eventos', 'Outros cavalos', 'Amigos', 'Produtos', 'Equipamentos'];

const ENTIDADE_MAP: Record<string, string[]> = {
  Pessoas: ['Ana Ferraz', 'Carlos Melo', 'Julia Prado'],
  Instrutores: ['Prof. Ricardo'],
  Haras: ['Haras Bela Vista'],
  Eventos: ['Copa Adestramento SP'],
  'Outros cavalos': ['Trovão', 'Estrela'],
  Amigos: ['Marina Costa'],
  Produtos: ['Sela nova'],
  Equipamentos: ['Proteção de casco'],
};

export function MarcacaoScreen({ navigation }: Props) {
  const marcacoes = useMemoriesStore((state) => state.criarMemoriaDraft.marcacoes);
  const setCriarMemoriaDraft = useMemoriesStore((state) => state.setCriarMemoriaDraft);
  const [categoriaAberta, setCategoriaAberta] = useState<string | null>(null);

  function toggleCategoria(categoria: string) {
    setCategoriaAberta((atual) => (atual === categoria ? null : categoria));
  }

  function toggleEntidade(categoria: string, nome: string) {
    const existe = marcacoes.some((marcacao) => marcacao.categoria === categoria && marcacao.nome === nome);
    setCriarMemoriaDraft({
      marcacoes: existe
        ? marcacoes.filter((marcacao) => !(marcacao.categoria === categoria && marcacao.nome === nome))
        : [...marcacoes, { categoria, nome }],
    });
  }

  function removerMarcacao(categoria: string, nome: string) {
    setCriarMemoriaDraft({
      marcacoes: marcacoes.filter((marcacao) => !(marcacao.categoria === categoria && marcacao.nome === nome)),
    });
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <ProgressBar step={5} total={7} />
        <Text variant="xxl" weight="extraBold">
          Marcar
        </Text>
        <Text variant="md" weight="medium" color="secondary" style={styles.subtitle}>
          Quem ou o que fez parte desse momento?
        </Text>

        <View style={styles.chips}>
          {MARCACAO_CATEGORIAS.map((categoria) => {
            const selected = categoriaAberta === categoria;
            return (
              <Pressable
                key={categoria}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => toggleCategoria(categoria)}
              >
                <Text variant="sm" weight="bold" color={selected ? theme.colors.accent.gold : 'primary'}>
                  {categoria}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {!!categoriaAberta && (
          <View style={styles.entidadeBox}>
            {(ENTIDADE_MAP[categoriaAberta] ?? []).map((nome) => {
              const selected = marcacoes.some(
                (marcacao) => marcacao.categoria === categoriaAberta && marcacao.nome === nome
              );
              return (
                <Pressable
                  key={nome}
                  style={[styles.entidadeChip, selected && styles.entidadeChipSelected]}
                  onPress={() => toggleEntidade(categoriaAberta, nome)}
                >
                  <Text variant="sm" weight="bold" color={selected ? theme.colors.accent.gold : 'primary'}>
                    {nome}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        )}

        {marcacoes.length > 0 && (
          <>
            <Text variant="xs" weight="bold" style={styles.sectionLabel}>
              MARCADOS
            </Text>
            <View style={styles.chips}>
              {marcacoes.map((marcacao) => (
                <View key={`${marcacao.categoria}-${marcacao.nome}`} style={styles.pill}>
                  <Text variant="sm" weight="bold" color="inverse">
                    {marcacao.nome}
                  </Text>
                  <Pressable
                    style={styles.pillRemove}
                    onPress={() => removerMarcacao(marcacao.categoria, marcacao.nome)}
                  >
                    <CloseIcon size={8} />
                  </Pressable>
                </View>
              ))}
            </View>
          </>
        )}

        <Pressable style={styles.continueButton} onPress={() => navigation.navigate('Privacidade')}>
          <Text variant="lg" weight="extraBold">
            Continuar
          </Text>
        </Pressable>
      </ScrollView>
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
  subtitle: {
    marginTop: theme.spacing.sm,
  },
  chips: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.radius.chip + 1,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  chipSelected: {
    backgroundColor: theme.colors.surfaceDark,
  },
  entidadeBox: {
    marginTop: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(43,41,36,0.04)',
    padding: theme.cardPadding.min,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  entidadeChip: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 16,
    backgroundColor: '#fff',
  },
  entidadeChipSelected: {
    backgroundColor: theme.colors.surfaceDark,
  },
  sectionLabel: {
    marginTop: theme.spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
    paddingVertical: 7,
    paddingLeft: theme.spacing.lg,
    paddingRight: theme.spacing.sm,
    borderRadius: 16,
    backgroundColor: theme.colors.surfaceDark,
  },
  pillRemove: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(251,249,244,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  continueButton: {
    marginTop: theme.spacing.xl,
    height: theme.buttonHeight.max,
    borderRadius: theme.buttonHeight.max / 2,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
