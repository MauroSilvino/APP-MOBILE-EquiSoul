import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Text } from '../../components/ui/Text';
import { PlusIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePortalStore } from '../../store/usePortalStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalServicos'>;

export function PortalServicosScreen({ navigation }: Props) {
  const servicos = usePortalStore((s) => s.servicos);

  return (
    <PortalScreen
      title="Serviços"
      activeModule="PortalDashboard"
      onBack={() => navigation.goBack()}
      onNavigateModule={(route) => navigation.navigate(route)}
      headerRight={
        <Pressable style={styles.addButton} onPress={() => navigation.navigate('PortalNovoServico')} accessibilityLabel="Novo serviço">
          <PlusIcon size={16} />
        </Pressable>
      }
    >
      <View style={styles.list}>
        {servicos.map((s) => (
          <View key={s.nome} style={styles.card}>
            <ImagePlaceholder caption="" style={styles.thumb} />
            <View style={styles.cardBody}>
              <View style={styles.cardHeader}>
                <Text variant="sm" weight="bold">
                  {s.nome}
                </Text>
                <Text variant="sm" weight="extraBold" color={theme.colors.accent.leather}>
                  {s.preco}
                </Text>
              </View>
              <Text variant="xs" weight="medium" color="secondary" style={styles.cardSubtitle}>
                {s.categoria} · {s.duracao}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </PortalScreen>
  );
}

const styles = StyleSheet.create({
  addButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  list: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  card: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 1,
  },
  thumb: {
    height: 70,
  },
  cardBody: {
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardSubtitle: {
    marginTop: 2,
  },
});
