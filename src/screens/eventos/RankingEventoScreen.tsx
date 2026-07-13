import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Chip } from '../../components/ui/Chip';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, ClockIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useEventsStore } from '../../store/useEventsStore';

type Props = NativeStackScreenProps<RootStackParamList, 'RankingEvento'>;

const CATEGORIAS = ['Participação', 'Fotografia', 'Espírito esportivo', 'Contribuição'];
const RANKING = [
  { pos: '1º', nome: 'Ana Ferraz', pontos: '320 pts' },
  { pos: '2º', nome: 'Carlos Melo', pontos: '298 pts' },
  { pos: '3º', nome: 'Helena Ribeiro', pontos: '275 pts' },
  { pos: '4º', nome: 'Você', pontos: '240 pts' },
];

export function RankingEventoScreen({ navigation, route }: Props) {
  const evento = useEventsStore((state) => state.eventos.find((item) => item.id === route.params.eventId));
  const [categoria, setCategoria] = useState('Participação');

  if (!evento) return null;

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Ranking do evento
        </Text>
        <View style={styles.statusRow}>
          <View style={[styles.statusBadge, evento.encerrado ? styles.statusBadgeEncerrado : styles.statusBadgeFuturo]}>
            <Text variant="xs" weight="bold" color={evento.encerrado ? theme.colors.accent.moss : theme.colors.accent.leather}>
              {evento.encerrado ? 'Evento encerrado' : 'Evento futuro'}
            </Text>
          </View>
          <Text variant="sm" weight="medium" color="secondary">
            {evento.titulo}
          </Text>
        </View>
        <Text variant="sm" weight="medium" color="secondary" style={styles.aviso}>
          Nunca baseado apenas em desempenho esportivo.
        </Text>

        {evento.encerrado ? (
          <>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsRow}>
              {CATEGORIAS.map((label) => (
                <Chip key={label} label={label} selected={categoria === label} onPress={() => setCategoria(label)} />
              ))}
            </ScrollView>
            <View style={styles.list}>
              {RANKING.map((r) => (
                <View key={r.pos} style={styles.card}>
                  <Text variant="md" weight="extraBold" color={theme.colors.accent.leather} style={styles.pos}>
                    {r.pos}
                  </Text>
                  <View style={styles.avatar} />
                  <Text variant="sm" weight="bold" style={styles.nome}>
                    {r.nome}
                  </Text>
                  <Text variant="sm" weight="bold" color="secondary">
                    {r.pontos}
                  </Text>
                </View>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.empty}>
            <ClockIcon size={30} color="#a39c8a" strokeWidth={1.6} />
            <Text variant="md" weight="bold">
              Ranking disponível após o evento
            </Text>
            <Text variant="sm" weight="medium" color="secondary" style={styles.emptyText}>
              Volte em {evento.data} para ver o resultado.
            </Text>
          </View>
        )}
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
  statusRow: {
    marginTop: 6,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  statusBadge: {
    paddingVertical: 5,
    paddingHorizontal: 11,
    borderRadius: 12,
  },
  statusBadgeEncerrado: {
    backgroundColor: 'rgba(107,115,83,0.15)',
  },
  statusBadgeFuturo: {
    backgroundColor: 'rgba(201,161,90,0.18)',
  },
  aviso: {
    marginTop: theme.spacing.sm,
    lineHeight: 20,
  },
  chipsRow: {
    marginTop: theme.spacing.md,
  },
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  pos: {
    width: 20,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.colors.placeholder.background,
  },
  nome: {
    flex: 1,
  },
  empty: {
    marginTop: 40,
    alignItems: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: 10,
  },
  emptyText: {
    textAlign: 'center',
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
