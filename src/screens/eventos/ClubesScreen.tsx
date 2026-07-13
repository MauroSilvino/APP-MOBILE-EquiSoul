import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useEventsStore } from '../../store/useEventsStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Clubes'>;

const CLUBES = ['Clube de Salto', 'Clube de Trilhas', 'Clube Mangalarga', 'Clube Infantil', 'Clube Feminino', 'Clube de Fotografia'];

export function ClubesScreen({ navigation }: Props) {
  const clubesMembro = useEventsStore((state) => state.clubesMembro);
  const toggleClube = useEventsStore((state) => state.toggleClube);

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Clubes
        </Text>
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
          Comunidades permanentes com feed, agenda e conteúdo exclusivo.
        </Text>

        <View style={styles.grid}>
          {CLUBES.map((nome) => {
            const membro = clubesMembro.includes(nome);
            return (
              <Pressable key={nome} style={styles.card} onPress={() => toggleClube(nome)}>
                <View style={styles.cardPhoto} />
                <View style={styles.cardBody}>
                  <Text variant="sm" weight="bold">
                    {nome}
                  </Text>
                  <View style={[styles.tag, membro && styles.tagMembro]}>
                    <Text variant="xs" weight="bold" color={membro ? theme.colors.accent.moss : theme.colors.accent.leather}>
                      {membro ? 'Membro ✓' : 'Entrar'}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>

        <Pressable style={styles.comunidadesButton} onPress={() => navigation.navigate('ComunidadesLocais')}>
          <Text variant="sm" weight="bold">
            Ver comunidades locais
          </Text>
        </Pressable>
      </ScrollView>

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
        <BackIcon size={16} />
      </Pressable>

      <BottomTabBar active="Comunidade" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: 60,
    paddingBottom: 130,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
    lineHeight: 20,
  },
  grid: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.md,
  },
  card: {
    width: '47%',
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  cardPhoto: {
    height: 90,
    backgroundColor: theme.colors.placeholder.background,
  },
  cardBody: {
    padding: 12,
  },
  tag: {
    marginTop: 6,
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(201,161,90,0.18)',
  },
  tagMembro: {
    backgroundColor: 'rgba(107,115,83,0.15)',
  },
  comunidadesButton: {
    marginTop: theme.spacing.lg,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
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
    elevation: 4,
  },
});
