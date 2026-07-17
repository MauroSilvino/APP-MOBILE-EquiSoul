import { Modal, Pressable, StyleSheet, View } from 'react-native';
import { theme } from '../../theme';
import { Text } from '../ui/Text';
import { PORTAL_MODES, PortalModuleRoute } from './portalModules';

interface PortalDrawerProps {
  visible: boolean;
  activeModule: PortalModuleRoute;
  onClose: () => void;
  onNavigate: (route: PortalModuleRoute) => void;
}

export function PortalDrawer({ visible, activeModule, onClose, onNavigate }: PortalDrawerProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.panel} onPress={(e) => e.stopPropagation()}>
          <Text variant="md" weight="extraBold" style={styles.heading}>
            Modos do portal
          </Text>
          <View style={styles.list}>
            {PORTAL_MODES.map((m) => {
              const active = m.route === activeModule;
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
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(43,41,36,0.35)',
  },
  panel: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 230,
    backgroundColor: theme.colors.background,
    paddingTop: 60,
    paddingHorizontal: theme.spacing.md,
  },
  heading: {
    paddingHorizontal: theme.spacing.sm,
    paddingBottom: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(43,41,36,0.08)',
  },
  list: {
    marginTop: theme.spacing.sm,
    gap: 2,
  },
  row: {
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 12,
    borderRadius: 10,
  },
  rowActive: {
    backgroundColor: 'rgba(201,161,90,0.16)',
  },
});
