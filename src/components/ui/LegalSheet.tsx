import { PropsWithChildren } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { theme } from '../../theme';
import { Button } from './Button';
import { Text } from './Text';

interface LegalSheetProps {
  visible: boolean;
  title: string;
  onClose: () => void;
}

export function LegalSheet({ visible, title, onClose, children }: PropsWithChildren<LegalSheetProps>) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.handle} />
          <Text variant="xl" weight="extraBold">
            {title}
          </Text>
          <ScrollView style={styles.body}>
            <Text variant="sm" weight="medium" color="secondary">
              {children}
            </Text>
          </ScrollView>
          <Button variant="primary" onPress={onClose} style={styles.close}>
            Fechar
          </Button>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(43,41,36,0.55)',
    justifyContent: 'flex-end',
  },
  sheet: {
    maxHeight: '70%',
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: theme.radius.cardLarge,
    borderTopRightRadius: theme.radius.cardLarge,
    padding: theme.spacing.xl,
  },
  handle: {
    width: 36,
    height: 3,
    borderRadius: 2,
    backgroundColor: 'rgba(43,41,36,0.15)',
    alignSelf: 'center',
    marginBottom: theme.spacing.lg,
  },
  body: {
    marginTop: theme.spacing.md,
  },
  close: {
    marginTop: theme.spacing.lg,
    height: 48,
    borderRadius: 24,
  },
});
