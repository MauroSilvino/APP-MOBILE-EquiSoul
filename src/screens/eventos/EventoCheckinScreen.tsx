import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, CheckIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useEventsStore } from '../../store/useEventsStore';

type Props = NativeStackScreenProps<RootStackParamList, 'EventoCheckin'>;

const QR_SEED = [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1];

export function EventoCheckinScreen({ navigation, route }: Props) {
  const evento = useEventsStore((state) => state.eventos.find((item) => item.id === route.params.eventId));
  const checkinFeito = useEventsStore((state) => !!state.checkinFeitoMap[route.params.eventId]);
  const fazerCheckin = useEventsStore((state) => state.fazerCheckin);

  if (!evento) return null;

  const iconColor = checkinFeito ? theme.colors.accent.moss : 'rgba(43,41,36,0.25)';

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Check-in
        </Text>
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
          {evento.titulo} · {evento.cidade}
        </Text>

        <View style={styles.qrGrid}>
          {QR_SEED.map((v, i) => (
            <View key={i} style={[styles.qrCell, v ? styles.qrCellOn : styles.qrCellOff]} />
          ))}
        </View>

        <Pressable
          style={[styles.checkinButton, checkinFeito && styles.checkinButtonFeito]}
          onPress={() => fazerCheckin(evento.id)}
        >
          <Text variant="lg" weight="extraBold">
            {checkinFeito ? 'Check-in realizado ✓' : 'Fazer check-in'}
          </Text>
        </Pressable>

        <View style={styles.itemsList}>
          <View style={styles.item}>
            <CheckIcon size={18} color={iconColor} strokeWidth={2} />
            <Text variant="sm" weight="semiBold">
              Selo de participação
            </Text>
          </View>
          <View style={styles.item}>
            <CheckIcon size={18} color={iconColor} strokeWidth={2} />
            <Pressable disabled={!checkinFeito} onPress={() => navigation.navigate('AlbumColaborativo', { eventId: evento.id })}>
              <Text variant="sm" weight="semiBold" style={checkinFeito ? styles.linkAtivo : undefined}>
                Álbum colaborativo liberado
              </Text>
            </Pressable>
          </View>
          <View style={styles.item}>
            <CheckIcon size={18} color={iconColor} strokeWidth={2} />
            <Text variant="sm" weight="semiBold">
              Chat do evento liberado
            </Text>
          </View>
          {evento.temCertificado && (
            <View style={styles.item}>
              <CheckIcon size={18} color={iconColor} strokeWidth={2} />
              <Pressable
                disabled={!checkinFeito}
                onPress={() => checkinFeito && navigation.navigate('EventoCertificado', { eventId: evento.id })}
              >
                <Text variant="sm" weight="semiBold" style={checkinFeito ? styles.linkAtivo : undefined}>
                  Certificado disponível
                </Text>
              </Pressable>
            </View>
          )}
        </View>

        {checkinFeito && (
          <View style={styles.actionsRow}>
            <Pressable style={styles.outlineButton} onPress={() => navigation.navigate('AlbumColaborativo', { eventId: evento.id })}>
              <Text variant="xs" weight="bold">
                Álbum
              </Text>
            </Pressable>
            <Pressable style={styles.outlineButton} onPress={() => navigation.navigate('EventoNetworking', { eventId: evento.id })}>
              <Text variant="xs" weight="bold">
                Networking
              </Text>
            </Pressable>
            <Pressable style={styles.outlineButton} onPress={() => navigation.navigate('RankingEvento', { eventId: evento.id })}>
              <Text variant="xs" weight="bold">
                Ranking
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
    alignItems: 'center',
  },
  subtitle: {
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  qrGrid: {
    marginTop: theme.spacing.xl,
    width: 130,
    height: 130,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 3,
  },
  qrCell: {
    width: '18%',
    height: '18%',
  },
  qrCellOn: {
    backgroundColor: theme.colors.surfaceDark,
  },
  qrCellOff: {
    backgroundColor: 'transparent',
  },
  checkinButton: {
    marginTop: theme.spacing.xl,
    width: '100%',
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkinButtonFeito: {
    backgroundColor: 'rgba(107,115,83,0.2)',
  },
  itemsList: {
    marginTop: theme.spacing.xl,
    width: '100%',
    gap: theme.spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  linkAtivo: {
    textDecorationLine: 'underline',
  },
  actionsRow: {
    marginTop: theme.spacing.lg,
    width: '100%',
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  outlineButton: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
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
