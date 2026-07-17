import { PropsWithChildren, ReactNode, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { theme } from '../../theme';
import { Screen } from '../ui/Screen';
import { Text } from '../ui/Text';
import { BackIcon } from '../ui/icons';
import { AdminHeader } from './AdminHeader';
import { AdminDrawer } from './AdminDrawer';
import { AdminSearchModal } from './AdminSearchModal';
import { AdminModuleRoute } from './adminModules';

interface AdminScreenProps {
  title: string;
  activeRoute: AdminModuleRoute;
  onNavigateModule: (route: AdminModuleRoute) => void;
  onNavigateUsuario: (id: number) => void;
  onNavigateCavalo: (id: number) => void;
  onNavigateChamado: (id: number) => void;
  headerRight?: ReactNode;
  onBack?: () => void;
}

export function AdminScreen({
  title,
  activeRoute,
  onNavigateModule,
  onNavigateUsuario,
  onNavigateCavalo,
  onNavigateChamado,
  headerRight,
  onBack,
  children,
}: PropsWithChildren<AdminScreenProps>) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <AdminHeader onMenu={() => setMenuOpen(true)} onSearch={() => setSearchOpen(true)} />
        <View style={styles.titleRow}>
          {onBack && (
            <Pressable style={styles.backButton} onPress={onBack} hitSlop={8} accessibilityLabel="Voltar">
              <BackIcon size={16} />
            </Pressable>
          )}
          <Text variant="xxl" weight="extraBold" style={styles.title}>
            {title}
          </Text>
          {headerRight}
        </View>
        {children}
      </ScrollView>

      <AdminDrawer
        visible={menuOpen}
        activeRoute={activeRoute}
        onClose={() => setMenuOpen(false)}
        onNavigate={(route) => {
          setMenuOpen(false);
          onNavigateModule(route);
        }}
      />
      <AdminSearchModal
        visible={searchOpen}
        onClose={() => setSearchOpen(false)}
        onNavigateModule={onNavigateModule}
        onNavigateUsuario={onNavigateUsuario}
        onNavigateCavalo={onNavigateCavalo}
        onNavigateChamado={onNavigateChamado}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.md,
    paddingTop: theme.spacing.md,
    paddingBottom: 40,
  },
  titleRow: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    flex: 1,
  },
  backButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing.sm,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 3,
  },
});
