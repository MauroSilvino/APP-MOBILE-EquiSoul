import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { AiIcon, BackIcon, RefreshIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Clima'>;

const PROXIMOS_DIAS = [
  { dia: 'Hoje', temp: '26°C' },
  { dia: 'Amanhã', temp: '21°C' },
  { dia: 'Qua', temp: '23°C' },
  { dia: 'Qui', temp: '24°C' },
  { dia: 'Sex', temp: '25°C' },
];

export function ClimaScreen({ navigation }: Props) {
  const [atualizadoHaMin, setAtualizadoHaMin] = useState(12);

  const label = atualizadoHaMin === 0 ? 'poucos segundos' : `${atualizadoHaMin} min`;

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Pressable style={styles.backInline} onPress={() => navigation.goBack()} hitSlop={8}>
            <BackIcon size={16} />
          </Pressable>
          <Text variant="xxl" weight="extraBold">
            Clima
          </Text>
        </View>

        <Pressable style={styles.atualizarRow} onPress={() => setAtualizadoHaMin(0)}>
          <RefreshIcon />
          <Text variant="xs" weight="semiBold" color={theme.colors.accent.leather}>
            Atualizado há {label}
          </Text>
        </Pressable>

        <View style={styles.climaCard}>
          <Text variant="xxl" weight="extraBold" color="inverse" style={styles.temp}>
            26°C
          </Text>
          <Text variant="sm" weight="semiBold" color="rgba(251,249,244,0.85)">
            Ensolarado · Ribeirão Preto, SP
          </Text>
          <View style={styles.detalhes}>
            <View style={styles.detalheItem}>
              <Text variant="sm" weight="bold" color="inverse">
                14%
              </Text>
              <Text variant="xs" weight="semiBold" color="rgba(251,249,244,0.7)">
                chuva
              </Text>
            </View>
            <View style={styles.detalheItem}>
              <Text variant="sm" weight="bold" color="inverse">
                12 km/h
              </Text>
              <Text variant="xs" weight="semiBold" color="rgba(251,249,244,0.7)">
                vento
              </Text>
            </View>
            <View style={styles.detalheItem}>
              <Text variant="sm" weight="bold" color="inverse">
                06:12
              </Text>
              <Text variant="xs" weight="semiBold" color="rgba(251,249,244,0.7)">
                nascer do sol
              </Text>
            </View>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.diasRow}>
          {PROXIMOS_DIAS.map((item) => (
            <View key={item.dia} style={styles.diaCard}>
              <Text variant="sm" weight="bold">
                {item.dia}
              </Text>
              <Text variant="md" weight="bold" color={theme.colors.accent.leather} style={styles.diaTemp}>
                {item.temp}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.insightBanner}>
          <AiIcon />
          <Text variant="sm" weight="medium" color="secondary" style={styles.insightText}>
            Há previsão de chuva para amanhã. Caso seus planos dependam de pista externa, vale considerar
            uma alternativa.
          </Text>
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
  atualizarRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    alignSelf: 'flex-start',
  },
  climaCard: {
    marginTop: theme.spacing.md,
    borderRadius: theme.radius.cardLarge,
    backgroundColor: theme.colors.accent.leather,
    padding: theme.spacing.xl,
  },
  temp: {
    fontSize: 42,
  },
  detalhes: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detalheItem: {
    alignItems: 'center',
  },
  diasRow: {
    marginTop: theme.spacing.lg,
  },
  diaCard: {
    width: 64,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    paddingVertical: 12,
    alignItems: 'center',
    marginRight: theme.spacing.sm,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  diaTemp: {
    marginTop: 6,
  },
  insightBanner: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(201,161,90,0.12)',
    padding: theme.cardPadding.min,
  },
  insightText: {
    flex: 1,
  },
});
