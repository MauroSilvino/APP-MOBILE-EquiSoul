import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { AiIcon, BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'InsightsInteligentes'>;

const INSIGHTS = [
  'Os treinos registrados aos sábados costumam gerar mais fotos e avaliações positivas.',
  'Vocês participaram de mais eventos este semestre do que no anterior.',
  'Nos últimos meses, os passeios têm sido registrados com maior frequência do que os treinos.',
];

export function InsightsInteligentesScreen({ navigation }: Props) {
  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable style={styles.backInline} onPress={() => navigation.goBack()} hitSlop={8}>
            <BackIcon size={16} />
          </Pressable>
          <Text variant="xxl" weight="extraBold">
            Insights
          </Text>
        </View>
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
          Observações baseadas nos seus registros.
        </Text>

        <View style={styles.lista}>
          {INSIGHTS.map((texto, index) => (
            <View key={index} style={styles.card}>
              <AiIcon color={theme.colors.accent.gold} />
              <Text variant="sm" weight="medium" color="inverse" style={styles.texto}>
                {texto}
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
  lista: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  card: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    borderRadius: theme.radius.cardLarge,
    backgroundColor: theme.colors.surfaceDark,
    padding: theme.cardPadding.min,
  },
  texto: {
    flex: 1,
    lineHeight: 22,
  },
});
