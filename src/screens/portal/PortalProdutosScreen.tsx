import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Text } from '../../components/ui/Text';
import { AiIcon, PlusIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePortalStore } from '../../store/usePortalStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalProdutos'>;

const PAGE_SIZE = 4;

export function PortalProdutosScreen({ navigation }: Props) {
  const produtos = usePortalStore((s) => s.produtos);
  const [visiveis, setVisiveis] = useState(PAGE_SIZE);
  const visivelList = produtos.slice(0, visiveis);
  const temMais = produtos.length > visiveis;

  return (
    <PortalScreen
      title="Produtos"
      activeModule="PortalLoja"
      onBack={() => navigation.goBack()}
      onNavigateModule={(route) => navigation.navigate(route)}
      headerRight={
        <Pressable style={styles.addButton} onPress={() => navigation.navigate('PortalNovoProduto')} accessibilityLabel="Novo produto">
          <PlusIcon size={16} />
        </Pressable>
      }
    >
      <View style={styles.aiHint}>
        <AiIcon size={17} />
        <Text variant="sm" weight="medium" color="secondary" style={styles.aiHintText}>
          A IA pode sugerir descrição, SEO e categorias para novos produtos.
        </Text>
      </View>

      <View style={styles.list}>
        {visivelList.map((p) => (
          <View key={p.sku} style={styles.row}>
            <ImagePlaceholder caption="" style={styles.thumb} />
            <View style={styles.rowTexts}>
              <Text variant="xs" weight="bold">
                {p.nome}
              </Text>
              <Text variant="xs" weight="medium" color="secondary" style={styles.rowSubtitle}>
                {p.categoria} · SKU {p.sku}
              </Text>
            </View>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather}>
              {p.preco}
            </Text>
          </View>
        ))}
        {temMais && (
          <Pressable style={styles.loadMore} onPress={() => setVisiveis((v) => v + PAGE_SIZE)}>
            <Text variant="sm" weight="bold">
              Carregar mais
            </Text>
          </Pressable>
        )}
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
  aiHint: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
    borderRadius: 16,
    backgroundColor: 'rgba(201,161,90,0.12)',
    padding: 12,
  },
  aiHintText: {
    flex: 1,
    lineHeight: 18,
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
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 1,
  },
  thumb: {
    width: 44,
    height: 44,
    borderRadius: 10,
  },
  rowTexts: {
    flex: 1,
  },
  rowSubtitle: {
    marginTop: 1,
  },
  loadMore: {
    marginTop: 4,
    borderRadius: 14,
    backgroundColor: 'rgba(43,41,36,0.05)',
    alignItems: 'center',
    paddingVertical: 12,
  },
});
