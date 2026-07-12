import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { CommunityTabs } from '../../components/comunidade/CommunityTabs';
import { Chip } from '../../components/ui/Chip';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useCommunityStore } from '../../store/useCommunityStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Eventos'>;

const MODOS = ['Calendário', 'Mapa', 'Lista'];

export function EventosScreen({ navigation }: Props) {
  const eventos = useCommunityStore((state) => state.eventos);
  const [modo, setModo] = useState('Lista');

  const modoLabel = modo === 'Calendário' ? 'vista calendário · julho' : 'mapa com pins dos eventos';

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Comunidade
        </Text>

        <View style={styles.tabsSpacing}>
          <CommunityTabs active="Eventos" />
        </View>

        <View style={styles.modoRow}>
          {MODOS.map((label) => (
            <Chip key={label} label={label} selected={modo === label} onPress={() => setModo(label)} />
          ))}
        </View>

        {modo !== 'Lista' && (
          <ImagePlaceholder caption={modoLabel} style={styles.modoPlaceholder} />
        )}

        {eventos.length === 0 ? (
          <View style={styles.empty}>
            <Text variant="lg" weight="bold">
              Nenhum evento por perto
            </Text>
            <Text variant="sm" weight="medium" color="secondary" style={styles.emptyText}>
              Volte em breve — novos encontros aparecem toda semana.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {eventos.map((evento) => (
              <Pressable
                key={evento.id}
                style={styles.card}
                onPress={() => navigation.navigate('EventoDetalhe', { id: evento.id })}
              >
                <ImagePlaceholder caption={evento.tipo} style={styles.cardPhoto} />
                <View style={styles.cardBody}>
                  <Text variant="md" weight="bold">
                    {evento.titulo}
                  </Text>
                  <Text variant="sm" weight="medium" color="secondary" style={styles.cardInfo}>
                    {evento.data} · {evento.cidade} · {evento.participantes} participantes
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>

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
    paddingTop: theme.spacing.xxl,
    paddingBottom: 130,
  },
  tabsSpacing: {
    marginTop: theme.spacing.lg,
  },
  modoRow: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  modoPlaceholder: {
    marginTop: theme.spacing.lg,
    height: 150,
    borderRadius: theme.radius.cardLarge,
  },
  empty: {
    marginTop: 50,
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  emptyText: {
    textAlign: 'center',
  },
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  card: {
    borderRadius: theme.radius.cardLarge,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  cardPhoto: {
    height: 120,
  },
  cardBody: {
    padding: theme.spacing.md,
  },
  cardInfo: {
    marginTop: 4,
  },
});
