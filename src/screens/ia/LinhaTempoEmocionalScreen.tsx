import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'LinhaTempoEmocional'>;

const ITEMS = [
  { mes: 'Janeiro', titulo: 'Conhecimento' },
  { mes: 'Março', titulo: 'Primeiras trilhas' },
  { mes: 'Junho', titulo: 'Primeira competição' },
  { mes: 'Agosto', titulo: 'Superação' },
  { mes: 'Outubro', titulo: 'Maior evolução' },
  { mes: 'Dezembro', titulo: 'Retrospectiva' },
];

export function LinhaTempoEmocionalScreen({ navigation }: Props) {
  return (
    <Screen padded={false} style={styles.screen}>
      <Pressable style={styles.backButton} onPress={() => navigation.navigate('InteligenciaArtificial')} hitSlop={8}>
        <BackIcon />
      </Pressable>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xl" weight="extraBold">
          Linha do tempo emocional
        </Text>
        <Text variant="md" weight="medium" color="secondary" style={styles.subtitle}>
          A narrativa contínua da parceria de vocês.
        </Text>

        <View style={styles.timeline}>
          <View style={styles.timelineLine} />
          {ITEMS.map((item) => (
            <View key={item.mes} style={styles.item}>
              <View style={styles.itemDot} />
              <Text variant="xs" weight="extraBold" color={theme.colors.accent.leather}>
                {item.mes}
              </Text>
              <Text variant="md" weight="extraBold" style={styles.itemTitulo}>
                {item.titulo}
              </Text>
            </View>
          ))}
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
    paddingTop: 70,
    paddingBottom: theme.spacing.xxl,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 20,
    zIndex: 2,
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
  subtitle: {
    marginTop: theme.spacing.xs,
    lineHeight: 20,
  },
  timeline: {
    marginTop: theme.spacing.lg,
    paddingLeft: theme.spacing.md,
  },
  timelineLine: {
    position: 'absolute',
    left: 5,
    top: 6,
    bottom: 6,
    width: 1.5,
    backgroundColor: 'rgba(43,41,36,0.12)',
  },
  item: {
    marginBottom: theme.spacing.lg,
  },
  itemDot: {
    position: 'absolute',
    left: -20,
    top: 6,
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: theme.colors.accent.gold,
    borderWidth: 2,
    borderColor: theme.colors.background,
  },
  itemTitulo: {
    marginTop: 4,
  },
});
