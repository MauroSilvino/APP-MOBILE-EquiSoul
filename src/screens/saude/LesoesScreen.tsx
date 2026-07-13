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
import { Lesao, useHealthStore } from '../../store/useHealthStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Lesoes'>;

const SITUACAO_STYLE: Record<Lesao['situacao'], { bg: string; color: string }> = {
  'em recuperação': { bg: 'rgba(201,161,90,0.16)', color: theme.colors.accent.leather },
  'em observação': { bg: 'rgba(107,115,83,0.14)', color: theme.colors.accent.olive },
  curada: { bg: 'rgba(107,115,83,0.16)', color: theme.colors.accent.moss },
};

export function LesoesScreen({ navigation, route }: Props) {
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

  const lesoes = records?.lesoes ?? [];

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Lesões
        </Text>

        {lesoes.length === 0 ? (
          <Text variant="sm" weight="medium" color="secondary" style={styles.empty}>
            Nenhuma lesão registrada ainda.
          </Text>
        ) : (
          <View style={styles.list}>
            {lesoes.map((lesao) => {
              const situacaoStyle = SITUACAO_STYLE[lesao.situacao];
              return (
                <View key={lesao.id} style={styles.card}>
                  <ImagePlaceholder caption="foto · registro da lesão" style={styles.photo} />
                  <View style={styles.cardBody}>
                    <Text variant="md" weight="bold">
                      {lesao.tipo} · {lesao.local}
                    </Text>
                    <Text variant="xs" weight="medium" color="secondary" style={styles.cardSubtitle}>
                      {lesao.data}
                    </Text>
                    <View style={[styles.badge, { backgroundColor: situacaoStyle.bg }]}>
                      <Text variant="xs" weight="bold" color={situacaoStyle.color}>
                        {lesao.situacao}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}
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
  empty: {
    marginTop: theme.spacing.xxl,
    textAlign: 'center',
  },
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  card: {
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  photo: {
    height: 90,
  },
  cardBody: {
    padding: theme.cardPadding.min,
  },
  cardSubtitle: {
    marginTop: 4,
  },
  badge: {
    marginTop: theme.spacing.sm,
    alignSelf: 'flex-start',
    borderRadius: 12,
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
