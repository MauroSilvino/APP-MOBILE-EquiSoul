import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { theme } from '../../theme';
import { Text } from '../ui/Text';
import { ADMIN_MODULES, AdminModuleRoute } from './adminModules';

interface AdminDrawerProps {
  visible: boolean;
  activeRoute: AdminModuleRoute;
  onClose: () => void;
  onNavigate: (route: AdminModuleRoute) => void;
}

export function AdminDrawer({ visible, activeRoute, onClose, onNavigate }: AdminDrawerProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.panel} onPress={(e) => e.stopPropagation()}>
          <ScrollView contentContainerStyle={styles.list}>
            <Text variant="md" weight="extraBold" style={styles.heading}>
              Módulos
            </Text>
            {ADMIN_MODULES.map((m) => {
              const active = m.route === activeRoute;
              return (
                <Pressable
                  key={m.route}
                  style={[styles.row, active && styles.rowActive]}
                  onPress={() => onNavigate(m.route)}
                >
                  <Text variant="sm" weight="bold" color={active ? theme.colors.accent.leather : 'primary'}>
                    {m.label}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(43,41,36,0.35)',
    flexDirection: 'row',
  },
  panel: {
    width: 250,
    backgroundColor: theme.colors.background,
  },
  list: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: 60,
    paddingBottom: theme.spacing.xl,
  },
  heading: {
    paddingHorizontal: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(43,41,36,0.08)',
  },
  row: {
    marginTop: 2,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 10,
    borderRadius: 10,
  },
  rowActive: {
    backgroundColor: 'rgba(201,161,90,0.16)',
  },
});
