import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePortalStore } from '../../store/usePortalStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalCertificados'>;

export function PortalCertificadosScreen({ navigation }: Props) {
  const certificados = usePortalStore((s) => s.certificadosOrganizador);

  return (
    <PortalScreen
      title="Certificados"
      activeModule="PortalOrganizadorDashboard"
      onBack={() => navigation.goBack()}
      onNavigateModule={(route) => navigation.navigate(route)}
    >
      <View style={styles.templateCard}>
        <ImagePlaceholder caption="template · certificado com QR" style={styles.templateThumb} />
        <View style={styles.templateBody}>
          <Text variant="sm" weight="bold">
            Template · Copa Nacional de Salto
          </Text>
          <Text variant="xs" weight="medium" color="secondary" style={styles.templateSubtitle}>
            Assinatura digital + QR de verificação
          </Text>
        </View>
      </View>

      <Text variant="xs" weight="bold" style={styles.sectionTitle}>
        EMITIDOS
      </Text>
      <View style={styles.list}>
        {certificados.map((c) => (
          <View key={c.nome} style={styles.row}>
            <Text variant="sm" weight="semiBold">
              {c.nome}
            </Text>
            <Text variant="sm" weight="semiBold" color="secondary">
              {c.data}
            </Text>
          </View>
        ))}
      </View>
    </PortalScreen>
  );
}

const styles = StyleSheet.create({
  templateCard: {
    marginTop: theme.spacing.md,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 1,
  },
  templateThumb: {
    height: 130,
  },
  templateBody: {
    padding: 14,
  },
  templateSubtitle: {
    marginTop: 2,
  },
  sectionTitle: {
    marginTop: theme.spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  list: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.xs,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 13,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 1,
  },
});
