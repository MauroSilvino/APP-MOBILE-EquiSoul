import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View } from 'react-native';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import { CloseIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { slugifyHorseName, useHorseStore } from '../../store/useHorseStore';

type Props = NativeStackScreenProps<RootStackParamList, 'CompartilharCavalo'>;

const QR_SEED = [
  1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1,
];

export function CompartilharCavaloScreen({ navigation, route }: Props) {
  const horses = useHorseStore((state) => state.horses);
  const horse = horses.find((h) => h.id === route.params.id) ?? horses[0];
  const { message, show } = useToast();

  if (!horse) {
    return (
      <Screen>
        <Text variant="md" weight="bold" color="inverse">
          Cavalo não encontrado.
        </Text>
      </Screen>
    );
  }

  return (
    <View style={styles.screen}>
      <Text variant="xl" weight="extraBold" color="inverse" style={styles.title}>
        Compartilhar perfil
      </Text>

      <View style={styles.card}>
        <ImagePlaceholder caption={`foto · ${horse.nome}`} style={styles.cardPhoto} />
        <View style={styles.cardBody}>
          <Text variant="lg" weight="extraBold">
            {horse.nome}
          </Text>
          <Text variant="xs" weight="semiBold" color="secondary" style={styles.cardSubtitle}>
            {[horse.raca, horse.relationship?.tempoJuntos ? `${horse.relationship.tempoJuntos} com você` : null]
              .filter(Boolean)
              .join(' · ')}
          </Text>
          <View style={styles.qr}>
            {QR_SEED.map((cell, index) => (
              <View key={index} style={[styles.qrCell, cell ? styles.qrCellOn : undefined]} />
            ))}
          </View>
          <Text variant="xs" weight="semiBold" color={theme.colors.text.tertiary} style={styles.qrLabel}>
            equisoul.app/{slugifyHorseName(horse.nome)}
          </Text>
        </View>
      </View>

      <View style={styles.actions}>
        <Pressable style={styles.storyButton} onPress={() => show('Compartilhado no story!')}>
          <Text variant="md" weight="extraBold">
            Compartilhar no story
          </Text>
        </Pressable>
        <View style={styles.actionsRow}>
          <Pressable style={styles.outlineButton} onPress={() => show('Link copiado!')}>
            <Text variant="sm" weight="bold" color="inverse">
              Copiar link
            </Text>
          </Pressable>
          <Pressable style={styles.outlineButton} onPress={() => show('Imagem salva!')}>
            <Text variant="sm" weight="bold" color="inverse">
              Baixar imagem
            </Text>
          </Pressable>
        </View>
      </View>

      <Pressable
        style={styles.closeButton}
        onPress={() => navigation.navigate('PerfilCavalo', { id: horse.id })}
        hitSlop={8}
      >
        <CloseIcon />
      </Pressable>
      <Toast message={message} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.surfaceDark,
    alignItems: 'center',
    paddingTop: 70,
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.xxl,
  },
  title: {
    textAlign: 'center',
  },
  card: {
    marginTop: theme.spacing.xl,
    width: '100%',
    borderRadius: theme.radius.cardLarge,
    overflow: 'hidden',
    backgroundColor: theme.colors.background,
  },
  cardPhoto: {
    height: 180,
  },
  cardBody: {
    padding: theme.spacing.lg,
  },
  cardSubtitle: {
    marginTop: 2,
  },
  qr: {
    marginTop: theme.spacing.md,
    width: 64,
    height: 64,
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  qrCell: {
    width: '20%',
    height: '20%',
    backgroundColor: 'transparent',
  },
  qrCellOn: {
    backgroundColor: theme.colors.surfaceDark,
  },
  qrLabel: {
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  actions: {
    marginTop: theme.spacing.xl,
    width: '100%',
    gap: theme.spacing.md,
  },
  storyButton: {
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionsRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  outlineButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(251,249,244,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(251,249,244,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
