import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { theme } from '../../theme';
import { Text } from './Text';

interface ConfirmModalProps {
  visible: boolean;
  title: string;
  description: string;
  confirmLabel: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function ConfirmModal({
  visible,
  title,
  description,
  confirmLabel,
  danger = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
          <Text variant="lg" weight="extraBold">
            {title}
          </Text>
          <Text variant="sm" weight="medium" color="secondary" style={styles.description}>
            {description}
          </Text>
          <View style={styles.actions}>
            <Pressable
              style={[styles.confirmButton, danger ? styles.confirmDanger : styles.confirmDefault]}
              onPress={onConfirm}
            >
              <Text variant="sm" weight="extraBold" color={danger ? theme.colors.error : 'primary'}>
                {confirmLabel}
              </Text>
            </Pressable>
            <Pressable style={styles.cancelButton} onPress={onCancel}>
              <Text variant="sm" weight="bold">
                Cancelar
              </Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(43,41,36,0.55)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.xl,
  },
  card: {
    width: '100%',
    maxWidth: 300,
    borderRadius: theme.radius.cardLarge,
    backgroundColor: '#fff',
    padding: theme.spacing.xl,
  },
  description: {
    marginTop: theme.spacing.sm,
  },
  actions: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  confirmButton: {
    height: 46,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmDefault: {
    backgroundColor: theme.colors.accent.gold,
  },
  confirmDanger: {
    backgroundColor: 'rgba(184,92,76,0.12)',
  },
  cancelButton: {
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
