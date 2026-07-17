import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePortalStore } from '../../store/usePortalStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalCavalosAtendidos'>;

export function PortalCavalosAtendidosScreen({ navigation }: Props) {
  const cavalos = usePortalStore((s) => s.cavalosAtendidos);

  return (
    <PortalScreen
      title="Cavalos atendidos"
      activeModule="PortalDashboard"
      onBack={() => navigation.goBack()}
      onNavigateModule={(route) => navigation.navigate(route)}
    >
      <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
        Histórico visível conforme autorização do proprietário.
      </Text>
      <View style={styles.list}>
        {cavalos.map((c) => (
          <View key={c.nome} style={styles.row}>
            <ImagePlaceholder caption="" style={styles.avatar} />
            <View style={styles.rowTexts}>
              <Text variant="sm" weight="bold">
                {c.nome} · {c.raca}
              </Text>
              <Text variant="xs" weight="medium" color="secondary">
                {c.idade} · tutor: {c.proprietario} · último em {c.ultimo}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </PortalScreen>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 6,
    lineHeight: 20,
  },
  list: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 1,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 12,
  },
  rowTexts: {
    flex: 1,
  },
});
