import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, SaveIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useEventsStore } from '../../store/useEventsStore';

type Props = NativeStackScreenProps<RootStackParamList, 'EventoPagina'>;

const PROGRAMACAO = [
  { hora: '08:00', atividade: 'Credenciamento' },
  { hora: '09:00', atividade: 'Aquecimento' },
  { hora: '10:00', atividade: 'Início das provas' },
  { hora: '12:00', atividade: 'Intervalo' },
  { hora: '18:00', atividade: 'Encerramento' },
];

export function EventoPaginaScreen({ navigation, route }: Props) {
  const evento = useEventsStore((state) => state.eventos.find((item) => item.id === route.params.eventId));
  const eventoStatus = useEventsStore((state) => state.getEventStatus(route.params.eventId));
  const toggleSalvo = useEventsStore((state) => state.toggleSalvo);

  const [showInviteNote, setShowInviteNote] = useState(false);
  const [showChatNote, setShowChatNote] = useState(false);

  if (!evento) return null;

  const jaInscrito = eventoStatus.inscrito;

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView>
        <ImagePlaceholder caption={`foto · ${evento.titulo}`} style={styles.photo} />

        <View style={styles.body}>
          {evento.encerrado && (
            <View style={styles.badge}>
              <Text variant="xs" weight="bold" color="secondary">
                Evento encerrado
              </Text>
            </View>
          )}
          <Text variant="xl" weight="extraBold" style={styles.title}>
            {evento.titulo}
          </Text>
          <Text variant="sm" weight="semiBold" color="secondary" style={styles.subtitle}>
            {evento.data} · {evento.cidade}
          </Text>

          <View style={styles.tagsRow}>
            <View style={styles.tag}>
              <Text variant="xs" weight="semiBold">
                {evento.precoLabel}
              </Text>
            </View>
            <View style={styles.tag}>
              <Text variant="xs" weight="semiBold">
                {evento.vagas}
              </Text>
            </View>
            {!!evento.clima && (
              <View style={styles.tag}>
                <Text variant="xs" weight="semiBold">
                  {evento.clima}
                </Text>
              </View>
            )}
          </View>

          <Text variant="sm" weight="medium" color="secondary" style={styles.desc}>
            {evento.desc}
          </Text>

          {!evento.encerrado && (
            <>
              <Text variant="xs" weight="bold" style={styles.sectionLabel}>
                PROGRAMAÇÃO
              </Text>
              <View style={styles.programacaoList}>
                {PROGRAMACAO.map((item) => (
                  <View key={item.hora} style={styles.programacaoRow}>
                    <Text variant="sm" weight="bold" color={theme.colors.accent.leather} style={styles.programacaoHora}>
                      {item.hora}
                    </Text>
                    <Text variant="sm" weight="semiBold">
                      {item.atividade}
                    </Text>
                  </View>
                ))}
              </View>
            </>
          )}

          <Text variant="xs" weight="bold" style={styles.sectionLabel}>
            PARTICIPANTES
          </Text>
          <View style={styles.avatarsRow}>
            {[0, 1, 2, 3, 4].map((i) => (
              <View key={i} style={styles.avatar} />
            ))}
          </View>

          {evento.encerrado ? (
            <View style={styles.actionsRow}>
              <Pressable
                style={styles.primaryButton}
                onPress={() => navigation.navigate('RankingEvento', { eventId: evento.id })}
              >
                <Text variant="md" weight="extraBold">
                  Ver ranking
                </Text>
              </Pressable>
              <Pressable
                style={styles.secondaryButton}
                onPress={() => navigation.navigate('AlbumColaborativo', { eventId: evento.id })}
              >
                <Text variant="sm" weight="bold">
                  Ver álbum
                </Text>
              </Pressable>
            </View>
          ) : (
            <>
              <View style={styles.actionsRow}>
                <Pressable
                  style={styles.primaryButton}
                  onPress={() =>
                    jaInscrito
                      ? navigation.navigate('EventoCheckin', { eventId: evento.id })
                      : navigation.navigate('EventoInscricao', { eventId: evento.id })
                  }
                >
                  <Text variant="md" weight="extraBold">
                    {jaInscrito ? 'Inscrito ✓ · Ver check-in' : 'Participar'}
                  </Text>
                </Pressable>
                <Pressable style={styles.saveButton} onPress={() => toggleSalvo(evento.id)}>
                  <SaveIcon size={20} filled={eventoStatus.salvo} color={eventoStatus.salvo ? theme.colors.accent.gold : '#2B2924'} />
                </Pressable>
              </View>
              <View style={styles.secondaryRow}>
                <Pressable style={styles.outlineButtonSmall} onPress={() => setShowInviteNote((v) => !v)}>
                  <Text variant="sm" weight="bold">
                    Convidar amigos
                  </Text>
                </Pressable>
                <Pressable style={styles.outlineButtonSmall} onPress={() => setShowChatNote((v) => !v)}>
                  <Text variant="sm" weight="bold">
                    Abrir chat
                  </Text>
                </Pressable>
              </View>
              {showInviteNote && (
                <Text variant="sm" weight="semiBold" color={theme.colors.accent.moss} style={styles.note}>
                  Link de convite copiado ✓
                </Text>
              )}
              {showChatNote && (
                <Text variant="sm" weight="semiBold" color="secondary" style={styles.note}>
                  Chat do evento em breve disponível aqui.
                </Text>
              )}
            </>
          )}
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
  photo: {
    height: 240,
  },
  body: {
    padding: theme.spacing.xl,
    paddingBottom: 130,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(43,41,36,0.08)',
  },
  title: {
    marginTop: theme.spacing.sm,
  },
  subtitle: {
    marginTop: 6,
  },
  tagsRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  tag: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  desc: {
    marginTop: theme.spacing.lg,
    lineHeight: 22,
  },
  sectionLabel: {
    marginTop: theme.spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  programacaoList: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  programacaoRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  programacaoHora: {
    width: 48,
  },
  avatarsRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: theme.colors.placeholder.background,
  },
  actionsRow: {
    marginTop: theme.spacing.xl,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  primaryButton: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    width: 52,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  outlineButtonSmall: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  note: {
    marginTop: theme.spacing.sm,
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
