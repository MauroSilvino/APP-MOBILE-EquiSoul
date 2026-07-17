import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePortalStore } from '../../store/usePortalStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalEstoque'>;

export function PortalEstoqueScreen({ navigation }: Props) {
  const estoque = usePortalStore((s) => s.estoque);
  const reporEstoque = usePortalStore((s) => s.reporEstoque);

  return (
    <PortalScreen
      title="Estoque"
      activeModule="PortalLoja"
      onBack={() => navigation.goBack()}
      onNavigateModule={(route) => navigation.navigate(route)}
    >
      <View style={styles.list}>
        {estoque.map((e) => {
          const color = e.baixo ? theme.colors.error : theme.colors.accent.olive;
          return (
            <View key={e.nome} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text variant="sm" weight="bold">
                  {e.nome}
                </Text>
                <Text variant="xs" weight="bold" color={color}>
                  {e.qtd} un.
                </Text>
              </View>
              <View style={styles.barTrack}>
                <View style={[styles.barFill, { width: `${e.percent}%`, backgroundColor: color }]} />
              </View>
              {e.baixo && (
                <Pressable style={styles.reporButton} onPress={() => reporEstoque(e.nome)}>
                  <Text variant="xs" weight="bold" color={theme.colors.accent.gold}>
                    Repor estoque
                  </Text>
                </Pressable>
              )}
            </View>
          );
        })}
      </View>
    </PortalScreen>
  );
}

const styles = StyleSheet.create({
  list: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  card: {
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 14,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  barTrack: {
    marginTop: 8,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(43,41,36,0.06)',
    overflow: 'hidden',
  },
  barFill: {
    height: '100%',
    borderRadius: 3,
  },
  reporButton: {
    marginTop: 8,
    alignSelf: 'flex-start',
    borderRadius: 10,
    backgroundColor: theme.colors.surfaceDark,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
});
