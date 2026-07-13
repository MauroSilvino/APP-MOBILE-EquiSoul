import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Chip } from '../../components/ui/Chip';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useHorseStore } from '../../store/useHorseStore';

type Props = NativeStackScreenProps<RootStackParamList, 'TimelineCavalo'>;

const FILTROS = ['Ano', 'Tipo', 'Local'];

export function TimelineCavaloScreen({ navigation, route }: Props) {
  const horses = useHorseStore((state) => state.horses);
  const horse = horses.find((h) => h.id === route.params.id) ?? horses[0];
  const [filtro, setFiltro] = useState('Ano');

  if (!horse) {
    return (
      <Screen>
        <Text variant="md" weight="bold">
          Cavalo não encontrado.
        </Text>
      </Screen>
    );
  }

  const items: { date: string; title: string }[] = [];
  if (horse.nascimento) items.push({ date: horse.nascimento, title: `Nascimento de ${horse.nome}` });
  if (horse.relationship?.tempoJuntos) {
    items.push({ date: 'Hoje', title: `Vocês estão juntos há ${horse.relationship.tempoJuntos}` });
  }
  if (horse.curiosidade) items.push({ date: 'Hoje', title: horse.curiosidade });

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Linha do tempo · {horse.nome}
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filtros}>
            {FILTROS.map((label) => (
              <Chip key={label} label={label} selected={filtro === label} onPress={() => setFiltro(label)} />
            ))}
          </View>
        </ScrollView>

        {items.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text variant="md" weight="bold">
              Ainda não há registros
            </Text>
            <Text variant="sm" weight="medium" color="secondary" style={styles.emptySubtitle}>
              Comece a linha do tempo de {horse.nome} registrando a primeira memória.
            </Text>
            <Pressable style={styles.emptyButton} onPress={() => navigation.navigate('NovoRegistro')}>
              <Text variant="sm" weight="extraBold">
                Registrar memória
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.timeline}>
            <View style={styles.timelineLine} />
            {items.map((item, index) => (
              <View key={index} style={styles.timelineItem}>
                <View style={styles.timelineDot} />
                <Text variant="xs" weight="semiBold" color={theme.colors.accent.leather} style={styles.timelineDate}>
                  {item.date}
                </Text>
                <View style={styles.timelineCard}>
                  <View style={styles.timelineThumb} />
                  <Text variant="md" weight="bold">
                    {item.title}
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>

      <BottomTabBar active="Perfis" />

      <Pressable style={styles.backButton} onPress={() => navigation.navigate('PerfilCavalo', { id: horse.id })} hitSlop={8}>
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
    paddingBottom: 150,
  },
  filtros: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  emptyCard: {
    marginTop: theme.spacing.xxl,
    borderRadius: theme.radius.cardLarge,
    backgroundColor: 'rgba(43,41,36,0.04)',
    padding: theme.spacing.xxl,
    alignItems: 'center',
  },
  emptySubtitle: {
    marginTop: 4,
    textAlign: 'center',
  },
  emptyButton: {
    marginTop: theme.spacing.md,
    height: 44,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: 22,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeline: {
    marginTop: theme.spacing.xl,
    paddingLeft: theme.spacing.lg,
  },
  timelineLine: {
    position: 'absolute',
    left: 5,
    top: 6,
    bottom: 6,
    width: 1.5,
    backgroundColor: 'rgba(43,41,36,0.12)',
  },
  timelineItem: {
    marginBottom: theme.spacing.lg,
  },
  timelineDot: {
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
  timelineDate: {
    marginBottom: theme.spacing.sm,
  },
  timelineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  timelineThumb: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: theme.colors.placeholder.background,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 4,
  },
});
