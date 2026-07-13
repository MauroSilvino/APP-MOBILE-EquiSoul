import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'LinhaTempoAnalitica'>;

const MESES = [
  { mes: 'Janeiro', destaque: 'Primeira competição' },
  { mes: 'Março', destaque: 'Maior sequência de registros' },
  { mes: 'Junho', destaque: 'Primeira trilha' },
  { mes: 'Outubro', destaque: 'Melhor mês' },
];

export function LinhaTempoAnaliticaScreen({ navigation }: Props) {
  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable style={styles.backInline} onPress={() => navigation.goBack()} hitSlop={8}>
            <BackIcon size={16} />
          </Pressable>
          <Text variant="xxl" weight="extraBold">
            Linha do tempo
          </Text>
        </View>
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
          Cada mês é um capítulo da sua jornada.
        </Text>

        <View style={styles.timeline}>
          {MESES.map((item, index) => (
            <View key={item.mes} style={styles.row}>
              <View style={styles.dotColumn}>
                <View style={styles.dot} />
                {index < MESES.length - 1 && <View style={styles.line} />}
              </View>
              <View style={styles.textColumn}>
                <Text variant="md" weight="extraBold">
                  {item.mes}
                </Text>
                <Text variant="sm" weight="medium" color="secondary" style={styles.destaque}>
                  {item.destaque}
                </Text>
              </View>
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
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xxl,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  backInline: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  subtitle: {
    marginTop: 6,
  },
  timeline: {
    marginTop: theme.spacing.lg,
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  dotColumn: {
    alignItems: 'center',
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: theme.colors.accent.gold,
  },
  line: {
    width: 2,
    flex: 1,
    backgroundColor: 'rgba(43,41,36,0.12)',
    marginVertical: 2,
  },
  textColumn: {
    flex: 1,
    paddingBottom: 22,
  },
  destaque: {
    marginTop: 2,
  },
});
