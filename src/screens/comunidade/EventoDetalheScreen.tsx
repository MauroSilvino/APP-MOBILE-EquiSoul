import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useCommunityStore } from '../../store/useCommunityStore';

type Props = NativeStackScreenProps<RootStackParamList, 'EventoDetalhe'>;

export function EventoDetalheScreen({ navigation, route }: Props) {
  const eventos = useCommunityStore((state) => state.eventos);
  const toggleParticipar = useCommunityStore((state) => state.toggleParticipar);
  const { message, show } = useToast();

  const evento = eventos.find((item) => item.id === route.params.id) ?? eventos[0];

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView>
        <Pressable style={styles.backButton} onPress={() => navigation.navigate('Eventos')} hitSlop={8}>
          <BackIcon />
        </Pressable>

        <ImagePlaceholder caption={`foto · ${evento.titulo.toLowerCase()}`} style={styles.photo} />

        <View style={styles.body}>
          <Text variant="xl" weight="extraBold">
            {evento.titulo}
          </Text>
          <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
            {evento.data} · {evento.cidade}
          </Text>

          <View style={styles.statsRow}>
            <View>
              <Text variant="lg" weight="extraBold">
                {evento.participantes}
              </Text>
              <Text variant="xs" weight="bold" color="secondary" style={styles.statLabel}>
                Participantes
              </Text>
            </View>
            <View>
              <Text variant="lg" weight="extraBold">
                {evento.percurso}
              </Text>
              <Text variant="xs" weight="bold" color="secondary" style={styles.statLabel}>
                Percurso
              </Text>
            </View>
          </View>

          <Text variant="sm" weight="medium" color="secondary" style={styles.descricao}>
            {evento.descricao}
          </Text>

          <View style={styles.actionsRow}>
            <Pressable
              style={[styles.participarButton, evento.participando && styles.participarButtonAtivo]}
              onPress={() => toggleParticipar(evento.id)}
            >
              <Text variant="md" weight="extraBold">
                {evento.participando ? 'Participando ✓' : 'Participar'}
              </Text>
            </Pressable>
            <Button variant="secondary" style={styles.shareButton} onPress={() => show('Link do evento copiado')}>
              Compartilhar
            </Button>
          </View>
        </View>
      </ScrollView>

      <Toast message={message} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
    elevation: 4,
  },
  photo: {
    height: 220,
  },
  body: {
    padding: theme.spacing.xl,
    paddingBottom: 40,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
  },
  statsRow: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    gap: theme.spacing.xl,
  },
  statLabel: {
    textTransform: 'uppercase',
    marginTop: 2,
  },
  descricao: {
    marginTop: theme.spacing.lg,
    lineHeight: 22,
  },
  actionsRow: {
    marginTop: theme.spacing.xl,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  participarButton: {
    flex: 1,
    height: theme.buttonHeight.max,
    borderRadius: theme.buttonHeight.max / 2,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  participarButtonAtivo: {
    backgroundColor: 'rgba(107,115,83,0.2)',
  },
  shareButton: {
    flex: 1,
  },
});
