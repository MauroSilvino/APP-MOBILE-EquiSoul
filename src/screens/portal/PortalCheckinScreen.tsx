import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { Text } from '../../components/ui/Text';
import { QrCodeIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePortalStore } from '../../store/usePortalStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalCheckin'>;

export function PortalCheckinScreen({ navigation }: Props) {
  const participantes = usePortalStore((s) => s.participantes);
  const checkinParticipante = usePortalStore((s) => s.checkinParticipante);
  const [manualOpen, setManualOpen] = useState(false);
  const pendentes = participantes.filter((p) => p.status !== 'Check-in');

  return (
    <PortalScreen
      title="Check-in"
      activeModule="PortalOrganizadorDashboard"
      onBack={() => navigation.goBack()}
      onNavigateModule={(route) => navigation.navigate(route)}
    >
      <View style={styles.qrBox}>
        <QrCodeIcon size={90} />
      </View>
      <Text variant="sm" weight="semiBold" color="secondary" style={styles.hint}>
        Escaneie o QR Code do participante
      </Text>

      <View style={styles.statsRow}>
        <View style={styles.stat}>
          <Text variant="lg" weight="extraBold">
            184
          </Text>
          <Text variant="xs" weight="semiBold" color="secondary">
            check-ins
          </Text>
        </View>
        <View style={styles.stat}>
          <Text variant="lg" weight="extraBold">
            56
          </Text>
          <Text variant="xs" weight="semiBold" color="secondary">
            pendentes
          </Text>
        </View>
      </View>

      <Pressable style={styles.manualButton} onPress={() => setManualOpen(true)}>
        <Text variant="sm" weight="bold">
          Check-in manual
        </Text>
      </Pressable>

      <Modal visible={manualOpen} animationType="slide" onRequestClose={() => setManualOpen(false)}>
        <View style={styles.modalScreen}>
          <View style={styles.modalHeader}>
            <Text variant="lg" weight="extraBold">
              Check-in manual
            </Text>
            <Pressable onPress={() => setManualOpen(false)}>
              <Text variant="sm" weight="bold" color={theme.colors.accent.leather}>
                Fechar
              </Text>
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={styles.modalList}>
            {pendentes.map((p) => (
              <Pressable key={p.id} style={styles.modalRow} onPress={() => checkinParticipante(p.id)}>
                <View>
                  <Text variant="xs" weight="bold">
                    {p.nome}
                  </Text>
                  <Text variant="xs" weight="medium" color="secondary" style={styles.modalRowSubtitle}>
                    {p.categoria}
                  </Text>
                </View>
                <Text variant="xs" weight="bold" color={theme.colors.accent.leather}>
                  Fazer check-in
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </PortalScreen>
  );
}

const styles = StyleSheet.create({
  qrBox: {
    marginTop: theme.spacing.lg,
    alignSelf: 'center',
    width: 220,
    height: 220,
    borderRadius: 24,
    backgroundColor: theme.colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  hint: {
    marginTop: theme.spacing.md,
    textAlign: 'center',
  },
  statsRow: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  manualButton: {
    marginTop: theme.spacing.lg,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalScreen: {
    flex: 1,
    backgroundColor: theme.colors.background,
    paddingTop: 60,
    paddingHorizontal: theme.spacing.md,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalList: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.xs,
    paddingBottom: 40,
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    backgroundColor: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 1,
  },
  modalRowSubtitle: {
    marginTop: 1,
  },
});
