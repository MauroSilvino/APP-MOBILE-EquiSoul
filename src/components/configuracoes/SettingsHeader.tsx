import { Pressable, StyleSheet, View } from 'react-native';
import { Text } from '../ui/Text';
import { BackIcon } from '../ui/icons';
import { theme } from '../../theme';

interface SettingsHeaderProps {
  title: string;
  onBack: () => void;
  breadcrumb?: string;
}

export function SettingsHeader({ title, onBack, breadcrumb = 'Configurações' }: SettingsHeaderProps) {
  return (
    <View style={styles.header}>
      <Pressable style={styles.backButton} onPress={onBack} hitSlop={8} accessibilityLabel="Voltar">
        <BackIcon size={18} />
      </Pressable>
      <View style={styles.titleWrap}>
        <Text variant="xs" weight="bold" color="tertiary" style={styles.breadcrumb}>
          {breadcrumb.toUpperCase()} › {title.toUpperCase()}
        </Text>
        <Text variant="xxl" weight="extraBold" style={styles.title}>
          {title}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: theme.spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 4,
  },
  titleWrap: {
    flex: 1,
    paddingTop: 6,
  },
  breadcrumb: {
    letterSpacing: 0.4,
  },
  title: {
    marginTop: 4,
  },
});
