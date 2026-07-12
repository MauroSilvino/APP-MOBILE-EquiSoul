import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ProgressBar } from '../../components/ui/ProgressBar';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TypeBadgeIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMemoriesStore } from '../../store/useMemoriesStore';

type Props = NativeStackScreenProps<RootStackParamList, 'TipoMemoria'>;

const TIPOS = [
  'Treino',
  'Trilha',
  'Competição',
  'Momento especial',
  'Passeio',
  'Banho',
  'Sessão de fotos',
  'Conquista',
];

export function TipoMemoriaScreen({ navigation }: Props) {
  const tipo = useMemoriesStore((state) => state.criarMemoriaDraft.tipo);
  const setCriarMemoriaDraft = useMemoriesStore((state) => state.setCriarMemoriaDraft);

  function selecionar(label: string) {
    setCriarMemoriaDraft({ tipo: label });
    navigation.navigate('CapturaMidia');
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <ProgressBar step={1} total={7} />
        <Text variant="xxl" weight="extraBold">
          Nova memória
        </Text>
        <Text variant="md" weight="medium" color="secondary" style={styles.subtitle}>
          O que vocês viveram hoje?
        </Text>

        <View style={styles.grid}>
          {TIPOS.map((label) => {
            const selected = tipo === label;
            return (
              <Pressable
                key={label}
                style={[styles.card, selected && styles.cardSelected]}
                onPress={() => selecionar(label)}
              >
                <TypeBadgeIcon color={selected ? theme.colors.accent.gold : theme.colors.accent.olive} />
                <Text variant="md" weight="extraBold" color={selected ? 'inverse' : 'primary'}>
                  {label}
                </Text>
              </Pressable>
            );
          })}
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
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xxl,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
  },
  grid: {
    marginTop: theme.spacing.xl,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  card: {
    width: '47%',
    borderRadius: theme.radius.cardLarge,
    padding: theme.spacing.lg,
    backgroundColor: 'rgba(43,41,36,0.05)',
    gap: theme.spacing.sm,
  },
  cardSelected: {
    backgroundColor: theme.colors.surfaceDark,
  },
});
