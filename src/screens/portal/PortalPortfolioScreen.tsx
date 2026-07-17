import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePortalStore } from '../../store/usePortalStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalPortfolio'>;

export function PortalPortfolioScreen({ navigation }: Props) {
  const itens = usePortalStore((s) => s.portfolioItens);

  return (
    <PortalScreen
      title="Portfólio"
      activeModule="PortalPerfilPublico"
      onBack={() => navigation.goBack()}
      onNavigateModule={(route) => navigation.navigate(route)}
    >
      <View style={styles.grid}>
        {itens.map((item) => (
          <View key={item} style={styles.card}>
            <ImagePlaceholder caption="" style={styles.thumb} />
            <Text variant="xs" weight="bold" style={styles.caption}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </PortalScreen>
  );
}

const styles = StyleSheet.create({
  grid: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  card: {
    width: '47%',
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    elevation: 1,
  },
  thumb: {
    height: 90,
  },
  caption: {
    padding: 10,
  },
});
