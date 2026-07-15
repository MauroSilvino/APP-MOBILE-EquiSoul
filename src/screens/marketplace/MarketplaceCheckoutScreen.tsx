import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, CheckIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { PRODUTOS_SEED, useMarketplaceStore } from '../../store/useMarketplaceStore';

type Props = NativeStackScreenProps<RootStackParamList, 'MarketplaceCheckout'>;

const ENDERECO_OPCOES = [
  { id: 'casa', titulo: 'Casa', endereco: 'Rua das Palmeiras, 240 · Campinas, SP' },
  { id: 'sitio', titulo: 'Sítio', endereco: 'Estrada do Haras, km 4 · Valinhos, SP' },
];

const PAGAMENTO_OPCOES = ['Apple Pay', 'Google Pay', 'PIX', 'Cartão'];

function parseValor(label: string): number {
  return Number(label.replace('R$', '').trim().replace(/\./g, '').replace(',', '.'));
}

function formatValor(valor: number): string {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

export function MarketplaceCheckoutScreen({ navigation, route }: Props) {
  const produtoId = route.params?.produtoId;
  const produtos = useMarketplaceStore((state) => state.produtos);
  const produto = produtos.find((p) => p.id === produtoId) ?? PRODUTOS_SEED[0];

  const carrinho = useMarketplaceStore((state) => state.carrinho);
  const incrementarQuantidade = useMarketplaceStore((state) => state.incrementarQuantidade);
  const decrementarQuantidade = useMarketplaceStore((state) => state.decrementarQuantidade);

  const [step, setStep] = useState(0);
  const [enderecoId, setEnderecoId] = useState(ENDERECO_OPCOES[0].id);
  const [pagamento, setPagamento] = useState(PAGAMENTO_OPCOES[2]);
  const [numeroCartao, setNumeroCartao] = useState('');
  const [validadeCartao, setValidadeCartao] = useState('');
  const [erroCartao, setErroCartao] = useState<string | null>(null);

  const subtotal = formatValor(parseValor(produto.precoLabel) * carrinho.quantidade);

  const finalizar = () => {
    if (pagamento === 'Cartão') {
      const numeroValido = numeroCartao.replace(/\D/g, '').length === 16;
      const validadeValida = /^\d{2}\/\d{2}$/.test(validadeCartao);
      if (!numeroValido || !validadeValida) {
        setErroCartao('Confira o número do cartão (16 dígitos) e a validade (MM/AA).');
        return;
      }
    }
    setErroCartao(null);
    setStep(3);
  };

  if (step === 3) {
    return (
      <Screen style={styles.screen}>
        <View style={styles.confirmWrap}>
          <View style={styles.confirmIcon}>
            <CheckIcon size={28} color={theme.colors.accent.moss} strokeWidth={2.4} />
          </View>
          <Text variant="xl" weight="extraBold">
            Compra confirmada
          </Text>
          <Text variant="sm" weight="medium" color="secondary" style={styles.confirmText}>
            {carrinho.quantidade}x {produto.nome} · {subtotal}
          </Text>
          <Pressable style={styles.secondaryButton} onPress={() => navigation.navigate('MarketplaceHistorico')}>
            <Text variant="sm" weight="bold">
              Ver no histórico
            </Text>
          </Pressable>
          <Pressable onPress={() => navigation.navigate('MarketplaceHome')}>
            <Text variant="xs" weight="bold" color={theme.colors.accent.leather}>
              Voltar à loja
            </Text>
          </Pressable>
        </View>
      </Screen>
    );
  }

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable
          style={styles.backButton}
          onPress={() => (step === 0 ? navigation.goBack() : setStep(step - 1))}
          hitSlop={8}
        >
          <BackIcon size={16} />
        </Pressable>

        {step === 0 && (
          <>
            <Text variant="xxl" weight="extraBold">
              Carrinho
            </Text>
            <View style={styles.produtoCard}>
              <View style={styles.produtoThumb} />
              <View style={styles.produtoInfo}>
                <Text variant="sm" weight="bold">
                  {produto.nome}
                </Text>
                <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.produtoPreco}>
                  {produto.precoLabel}
                </Text>
              </View>
              <View style={styles.quantidadeRow}>
                <Pressable style={styles.quantidadeButton} onPress={decrementarQuantidade} hitSlop={8}>
                  <Text variant="md" weight="extraBold">
                    –
                  </Text>
                </Pressable>
                <Text variant="sm" weight="bold" style={styles.quantidadeValor}>
                  {carrinho.quantidade}
                </Text>
                <Pressable style={styles.quantidadeButton} onPress={incrementarQuantidade} hitSlop={8}>
                  <Text variant="md" weight="extraBold">
                    +
                  </Text>
                </Pressable>
              </View>
            </View>
            <View style={styles.totalRow}>
              <Text variant="md" weight="bold">
                Subtotal
              </Text>
              <Text variant="md" weight="bold">
                {subtotal}
              </Text>
            </View>
            <Pressable style={styles.primaryButton} onPress={() => setStep(1)}>
              <Text variant="lg" weight="extraBold">
                Continuar
              </Text>
            </Pressable>
          </>
        )}

        {step === 1 && (
          <>
            <Text variant="xxl" weight="extraBold">
              Endereço de entrega
            </Text>
            <View style={styles.enderecoList}>
              {ENDERECO_OPCOES.map((opcao) => {
                const selected = enderecoId === opcao.id;
                return (
                  <Pressable
                    key={opcao.id}
                    style={[styles.enderecoCard, selected && styles.enderecoCardSelected]}
                    onPress={() => setEnderecoId(opcao.id)}
                  >
                    <Text variant="sm" weight="bold">
                      {opcao.titulo}
                    </Text>
                    <Text variant="xs" weight="medium" color="secondary" style={styles.enderecoTexto}>
                      {opcao.endereco}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            <Pressable style={styles.primaryButton} onPress={() => setStep(2)}>
              <Text variant="lg" weight="extraBold">
                Continuar
              </Text>
            </Pressable>
          </>
        )}

        {step === 2 && (
          <>
            <Text variant="xxl" weight="extraBold">
              Pagamento
            </Text>
            <View style={styles.wrapRow}>
              {PAGAMENTO_OPCOES.map((opcao) => {
                const selected = pagamento === opcao;
                return (
                  <Pressable
                    key={opcao}
                    style={[styles.chip, selected && styles.chipSelected]}
                    onPress={() => {
                      setPagamento(opcao);
                      setErroCartao(null);
                    }}
                  >
                    <Text variant="sm" weight="bold" color={selected ? theme.colors.text.inverse : 'primary'}>
                      {opcao}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {pagamento === 'Cartão' && (
              <View style={styles.cartaoForm}>
                <TextInput
                  value={numeroCartao}
                  onChangeText={setNumeroCartao}
                  placeholder="Número do cartão"
                  placeholderTextColor={theme.colors.text.tertiary}
                  keyboardType="number-pad"
                  maxLength={19}
                  style={styles.input}
                />
                <TextInput
                  value={validadeCartao}
                  onChangeText={setValidadeCartao}
                  placeholder="Validade (MM/AA)"
                  placeholderTextColor={theme.colors.text.tertiary}
                  keyboardType="number-pad"
                  maxLength={5}
                  style={styles.input}
                />
                {erroCartao && (
                  <Text variant="xs" weight="bold" color={theme.colors.error}>
                    {erroCartao}
                  </Text>
                )}
              </View>
            )}

            <View style={styles.totalRow}>
              <Text variant="md" weight="bold">
                Total
              </Text>
              <Text variant="md" weight="bold">
                {subtotal}
              </Text>
            </View>
            <Pressable style={styles.primaryButton} onPress={finalizar}>
              <Text variant="lg" weight="extraBold">
                Finalizar compra
              </Text>
            </Pressable>
          </>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingBottom: 40,
  },
  backButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing.sm,
  },
  produtoCard: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  produtoThumb: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: theme.colors.placeholder.background,
  },
  produtoInfo: {
    flex: 1,
  },
  produtoPreco: {
    marginTop: 2,
  },
  quantidadeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  quantidadeButton: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantidadeValor: {
    width: 16,
    textAlign: 'center',
  },
  totalRow: {
    marginTop: theme.spacing.xl,
    borderRadius: theme.radius.card,
    padding: theme.spacing.md,
    backgroundColor: 'rgba(43,41,36,0.05)',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  primaryButton: {
    marginTop: theme.spacing.xl,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  enderecoList: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  enderecoCard: {
    borderRadius: theme.radius.card,
    padding: theme.spacing.md,
    backgroundColor: 'rgba(43,41,36,0.04)',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  enderecoCardSelected: {
    backgroundColor: 'rgba(201,161,90,0.12)',
    borderColor: theme.colors.accent.gold,
  },
  enderecoTexto: {
    marginTop: 2,
  },
  wrapRow: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  chip: {
    paddingVertical: theme.chipPadding.vertical,
    paddingHorizontal: theme.chipPadding.horizontal,
    borderRadius: theme.radius.chip,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  chipSelected: {
    backgroundColor: theme.colors.surfaceDark,
  },
  cartaoForm: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.sm,
  },
  input: {
    height: 48,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(43,41,36,0.05)',
    paddingHorizontal: theme.spacing.lg,
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.primary,
  },
  confirmWrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
  },
  confirmIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(107,115,83,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmText: {
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 20,
  },
  secondaryButton: {
    height: 52,
    paddingHorizontal: 24,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
