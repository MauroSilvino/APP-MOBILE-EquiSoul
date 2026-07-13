import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useHorseStore } from '../../store/useHorseStore';
import { useHealthStore } from '../../store/useHealthStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Alimentacao'>;

export function AlimentacaoScreen({ navigation, route }: Props) {
  const horses = useHorseStore((state) => state.horses);
  const horse = horses.find((h) => h.id === route.params.id) ?? horses[0];
  const records = useHealthStore((state) => (horse ? state.getRecords(horse.id) : null));

  if (!horse) {
    return (
      <Screen>
        <Text variant="md" weight="bold">
          Cavalo não encontrado.
        </Text>
      </Screen>
    );
  }

  const refeicoes = records?.refeicoes ?? [];
  const suplementos = records?.suplementos ?? [];

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Alimentação
        </Text>

        <View style={styles.planoCard}>
          <ImagePlaceholder caption={`foto · refeição de ${horse.nome}`} style={styles.planoHero} />
          <View style={styles.planoBody}>
            <Text variant="md" weight="bold">
              Plano alimentar atual
            </Text>
            {refeicoes.length === 0 ? (
              <Text variant="sm" weight="medium" color="secondary" style={styles.planoEmpty}>
                Nenhuma refeição cadastrada ainda.
              </Text>
            ) : (
              <View style={styles.refeicoesList}>
                {refeicoes.map((refeicao) => (
                  <View key={refeicao.nome} style={styles.refeicaoRow}>
                    <Text variant="sm" weight="semiBold">
                      {refeicao.nome}
                    </Text>
                    <Text variant="sm" weight="semiBold" color="secondary">
                      {refeicao.horario}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        </View>

        <Text variant="sm" weight="bold" style={styles.sectionTitle}>
          SUPLEMENTOS
        </Text>
        {suplementos.length === 0 ? (
          <Text variant="sm" weight="medium" color="secondary" style={styles.suplementosEmpty}>
            Nenhum suplemento registrado ainda.
          </Text>
        ) : (
          <View style={styles.suplementosRow}>
            {suplementos.map((suplemento) => (
              <View key={suplemento} style={styles.suplementoChip}>
                <Text variant="sm" weight="bold" color={theme.colors.accent.moss}>
                  {suplemento}
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
  planoCard: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.cardLarge,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 2,
  },
  planoHero: {
    height: 110,
  },
  planoBody: {
    padding: theme.cardPadding.min,
  },
  planoEmpty: {
    marginTop: theme.spacing.sm,
  },
  refeicoesList: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  refeicaoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sectionTitle: {
    marginTop: theme.spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  suplementosEmpty: {
    marginTop: theme.spacing.sm,
  },
  suplementosRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  suplementoChip: {
    borderRadius: 14,
    backgroundColor: 'rgba(107,115,83,0.12)',
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: 14,
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
