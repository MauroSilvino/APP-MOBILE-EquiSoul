import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Chip } from '../../components/ui/Chip';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, TicketIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useEventsStore } from '../../store/useEventsStore';

type Props = NativeStackScreenProps<RootStackParamList, 'MeusEventos'>;

const TABS = ['Inscritos', 'Salvos', 'Passados'] as const;
type Tab = (typeof TABS)[number];

const MENSAGENS_VAZIO: Record<Tab, string> = {
  Inscritos: 'Você ainda não se inscreveu em nenhum evento futuro.',
  Salvos: 'Salve eventos tocando no ícone de fita na página do evento.',
  Passados: 'Seus eventos concluídos vão aparecer aqui.',
};

export function MeusEventosScreen({ navigation }: Props) {
  const eventos = useEventsStore((state) => state.eventos);
  const eventStatus = useEventsStore((state) => state.eventStatus);
  const [tab, setTab] = useState<Tab>('Inscritos');

  const lista = useMemo(() => {
    if (tab === 'Inscritos') return eventos.filter((e) => eventStatus[e.id]?.inscrito && !e.encerrado);
    if (tab === 'Salvos') return eventos.filter((e) => eventStatus[e.id]?.salvo);
    return eventos.filter((e) => e.encerrado);
  }, [eventos, eventStatus, tab]);

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Meus eventos
        </Text>

        <View style={styles.chipsRow}>
          {TABS.map((label) => (
            <Chip key={label} label={label} selected={tab === label} onPress={() => setTab(label)} />
          ))}
        </View>

        <View style={styles.list}>
          {lista.map((evento) => (
            <Pressable
              key={evento.id}
              style={styles.card}
              onPress={() => navigation.navigate('EventoPagina', { eventId: evento.id })}
            >
              <ImagePlaceholder caption={evento.tipo} style={styles.cardPhoto} />
              <View style={styles.cardBody}>
                <Text variant="md" weight="bold">
                  {evento.titulo}
                </Text>
                <Text variant="sm" weight="medium" color="secondary" style={styles.cardInfo}>
                  {evento.data} · {evento.cidade}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>

        {lista.length === 0 && (
          <View style={styles.empty}>
            <TicketIcon size={30} color="#a39c8a" strokeWidth={1.6} />
            <Text variant="md" weight="bold">
              Nenhum evento aqui ainda
            </Text>
            <Text variant="sm" weight="medium" color="secondary" style={styles.emptyText}>
              {MENSAGENS_VAZIO[tab]}
            </Text>
            <Pressable style={styles.ctaButton} onPress={() => navigation.navigate('EventosDescobrir')}>
              <Text variant="xs" weight="bold">
                Descobrir eventos
              </Text>
            </Pressable>
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
  chipsRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.sm,
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
    height: 100,
  },
  cardBody: {
    padding: theme.cardPadding.min,
  },
  cardInfo: {
    marginTop: 4,
  },
  empty: {
    marginTop: 50,
    alignItems: 'center',
    gap: theme.spacing.md,
    paddingHorizontal: 20,
  },
  emptyText: {
    textAlign: 'center',
    maxWidth: 220,
  },
  ctaButton: {
    marginTop: 6,
    paddingVertical: 11,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: theme.colors.accent.gold,
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
