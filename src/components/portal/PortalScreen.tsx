import { PropsWithChildren, ReactNode, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { theme } from '../../theme';
import { Screen } from '../ui/Screen';
import { Text } from '../ui/Text';
import { BackIcon, MenuIcon } from '../ui/icons';
import { PortalDrawer } from './PortalDrawer';
import { PORTAL_MODES, PortalModuleRoute } from './portalModules';

interface PortalScreenProps {
  title?: string;
  activeModule: PortalModuleRoute;
  onNavigateModule: (route: PortalModuleRoute) => void;
  headerRight?: ReactNode;
  onBack?: () => void;
  scroll?: boolean;
  padded?: boolean;
}

export function PortalScreen({
  title,
  activeModule,
  onNavigateModule,
  headerRight,
  onBack,
  scroll = true,
  padded = true,
  children,
}: PropsWithChildren<PortalScreenProps>) {
  const [menuOpen, setMenuOpen] = useState(false);
  const modoAtivo = PORTAL_MODES.find((m) => m.route === activeModule)?.label ?? 'Profissional';

  const content = (
    <>
      <View style={styles.topBar}>
        <Pressable style={styles.iconButton} onPress={() => setMenuOpen(true)} hitSlop={8} accessibilityLabel="Abrir modos do portal">
          <MenuIcon size={19} />
        </Pressable>
        <Text variant="xs" weight="bold" color="tertiary" style={styles.modeLabel}>
          Modo: {modoAtivo}
        </Text>
        <View style={styles.iconButton} />
      </View>
      {(title || onBack) && (
        <View style={styles.titleRow}>
          {onBack && (
            <Pressable style={styles.backButton} onPress={onBack} hitSlop={8} accessibilityLabel="Voltar">
              <BackIcon size={16} />
            </Pressable>
          )}
          {!!title && (
            <Text variant="xxl" weight="extraBold" style={styles.title}>
              {title}
            </Text>
          )}
          {headerRight}
        </View>
      )}
      {children}
    </>
  );

  return (
    <Screen padded={false} style={styles.screen}>
      {scroll ? (
        <ScrollView contentContainerStyle={padded ? styles.content : styles.contentUnpadded}>{content}</ScrollView>
      ) : (
        <View style={padded ? styles.content : styles.contentUnpadded}>{content}</View>
      )}

      <PortalDrawer
        visible={menuOpen}
        activeModule={activeModule}
        onClose={() => setMenuOpen(false)}
        onNavigate={(route) => {
          setMenuOpen(false);
          onNavigateModule(route);
        }}
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
  contentUnpadded: {
    flex: 1,
    paddingTop: theme.spacing.md,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  iconButton: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modeLabel: {
    flex: 1,
    textAlign: 'center',
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
