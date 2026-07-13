import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useEventsStore } from '../../store/useEventsStore';
import { useUserStore } from '../../store/useUserStore';

type Props = NativeStackScreenProps<RootStackParamList, 'EventoCertificado'>;

const QR_SEED = [1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 1];

export function EventoCertificadoScreen({ navigation, route }: Props) {
  const evento = useEventsStore((state) => state.eventos.find((item) => item.id === route.params.eventId));
  const nomeUsuario = useUserStore((state) => state.profile.nome || 'Você');
  const { message, show } = useToast();

  if (!evento) return null;

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="lg" weight="extraBold" color="inverse">
          Certificado
        </Text>

        <View style={styles.card}>
          <Text variant="xs" weight="semiBold" color={theme.colors.accent.leather} style={styles.eyebrow}>
            EQUISOUL CERTIFICA
          </Text>
          <Text variant="lg" weight="extraBold" style={styles.titulo}>
            {evento.titulo}
          </Text>
          <Text variant="sm" weight="semiBold" color="secondary" style={styles.info}>
            Concluído em {evento.data} · {nomeUsuario}
          </Text>

          <View style={styles.qrGrid}>
            {QR_SEED.map((v, i) => (
              <View key={i} style={[styles.qrCell, v ? styles.qrCellOn : styles.qrCellOff]} />
            ))}
          </View>
          <Text variant="xs" weight="semiBold" color="tertiary" style={styles.verificar}>
            equisoul.app/verificar
          </Text>
        </View>

        <View style={styles.actionsRow}>
          <Pressable style={styles.primaryButton} onPress={() => show('Certificado adicionado ao perfil')}>
            <Text variant="sm" weight="extraBold">
              Adicionar ao perfil
            </Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={() => show('Link do certificado copiado')}>
            <Text variant="sm" weight="bold" color="inverse">
              Compartilhar
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
        <BackIcon size={16} />
      </Pressable>

      <BottomTabBar active="Comunidade" />
      <Toast message={message} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.surfaceDark,
  },
  content: {
    paddingHorizontal: 28,
    paddingTop: 70,
    paddingBottom: 130,
    alignItems: 'center',
  },
  card: {
    marginTop: theme.spacing.xl,
    width: '100%',
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: theme.colors.background,
    padding: 22,
    alignItems: 'center',
  },
  eyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 0.6,
  },
  titulo: {
    marginTop: 14,
    textAlign: 'center',
  },
  info: {
    marginTop: theme.spacing.sm,
    textAlign: 'center',
  },
  qrGrid: {
    marginTop: theme.spacing.lg,
    width: 70,
    height: 70,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 2,
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
  verificar: {
    marginTop: theme.spacing.sm,
    fontFamily: 'monospace',
  },
  actionsRow: {
    marginTop: theme.spacing.xl,
    width: '100%',
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  primaryButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(251,249,244,0.25)',
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
