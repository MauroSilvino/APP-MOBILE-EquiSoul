import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useEventsStore } from '../../store/useEventsStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Experiencias'>;

const EXPERIENCIAS = [
  { nome: 'Passeio ao nascer do sol', preco: 'R$ 120' },
  { nome: 'Turismo rural', preco: 'R$ 280' },
  { nome: 'Sessão de fotografia equestre', preco: 'R$ 350' },
  { nome: 'Camping a cavalo', preco: 'R$ 420' },
];

export function ExperienciasScreen({ navigation }: Props) {
  const experienciasReservadas = useEventsStore((state) => state.experienciasReservadas);
  const toggleExperiencia = useEventsStore((state) => state.toggleExperiencia);

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Experiências
        </Text>
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
          Vivências equestres para além dos treinos.
        </Text>

        <View style={styles.list}>
          {EXPERIENCIAS.map((e) => {
            const reservado = experienciasReservadas.includes(e.nome);
            return (
              <View key={e.nome} style={styles.card}>
                <ImagePlaceholder caption={e.nome} style={styles.cardPhoto} />
                <View style={styles.cardFooter}>
                  <View>
                    <Text variant="md" weight="bold">
                      {e.nome}
                    </Text>
                    <Text variant="sm" weight="bold" color={theme.colors.accent.leather} style={styles.preco}>
                      {e.preco}
                    </Text>
                  </View>
                  <Pressable
                    style={[styles.actionButton, reservado && styles.actionButtonReservado]}
                    onPress={() => toggleExperiencia(e.nome)}
                  >
                    <Text variant="xs" weight="bold" color={reservado ? theme.colors.accent.moss : 'primary'}>
                      {reservado ? 'Reservado ✓' : 'Reservar'}
                    </Text>
                  </Pressable>
                </View>
              </View>
            );
          })}
        </View>
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
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 2,
  },
  cardPhoto: {
    height: 130,
  },
  cardFooter: {
    padding: theme.cardPadding.min,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  preco: {
    marginTop: 2,
  },
  actionButton: {
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: theme.colors.accent.gold,
  },
  actionButtonReservado: {
    backgroundColor: 'rgba(107,115,83,0.15)',
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
