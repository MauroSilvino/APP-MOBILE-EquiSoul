import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useHorseStore } from '../../store/useHorseStore';
import { Medicamento, useHealthStore } from '../../store/useHealthStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Medicamentos'>;

const STATUS_STYLE: Record<Medicamento['status'], { bg: string; color: string; label: string }> = {
  ativo: { bg: 'rgba(107,115,83,0.16)', color: theme.colors.accent.moss, label: 'Ativo' },
  concluido: { bg: 'rgba(43,41,36,0.08)', color: theme.colors.text.secondary, label: 'Concluído' },
  suspenso: { bg: 'rgba(184,92,76,0.14)', color: theme.colors.error, label: 'Suspenso' },
};

export function MedicamentosScreen({ navigation, route }: Props) {
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

  const medicamentos = records?.medicamentos ?? [];

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Medicamentos
        </Text>

        {medicamentos.length === 0 ? (
          <Text variant="sm" weight="medium" color="secondary" style={styles.empty}>
            Nenhum medicamento registrado ainda.
          </Text>
        ) : (
          <View style={styles.list}>
            {medicamentos.map((medicamento) => {
              const statusStyle = STATUS_STYLE[medicamento.status];
              return (
                <View key={medicamento.id} style={styles.card}>
                  <View style={styles.cardHeader}>
                    <Text variant="md" weight="bold">
                      {medicamento.nome}
                    </Text>
                    <View style={[styles.badge, { backgroundColor: statusStyle.bg }]}>
                      <Text variant="xs" weight="bold" color={statusStyle.color} style={styles.badgeText}>
                        {statusStyle.label}
                      </Text>
                    </View>
                  </View>
                  <Text variant="xs" weight="medium" color="secondary" style={styles.cardSubtitle}>
                    {medicamento.motivo}
                  </Text>
                  <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.cardPeriodo}>
                    {medicamento.periodo} · prescrito por {medicamento.prescritor}
                  </Text>
                </View>
              );
            })}
          </View>
        )}

        <View style={styles.infoBanner}>
          <Text variant="xs" weight="medium" color="secondary" style={styles.infoText}>
            Este espaço apenas organiza registros — dosagens e prescrições são sempre definidas pelo seu veterinário.
          </Text>
        </View>
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
    padding: theme.cardPadding.min,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  badge: {
    borderRadius: 11,
    paddingVertical: 5,
    paddingHorizontal: 11,
  },
  badgeText: {
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  cardSubtitle: {
    marginTop: 4,
  },
  cardPeriodo: {
    marginTop: 6,
  },
  infoBanner: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(201,161,90,0.12)',
    padding: theme.cardPadding.min,
  },
  infoText: {
    lineHeight: 18,
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
