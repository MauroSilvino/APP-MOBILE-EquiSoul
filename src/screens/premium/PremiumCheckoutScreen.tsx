import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePremiumStore } from '../../store/usePremiumStore';
import { useUserStore } from '../../store/useUserStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PremiumCheckout'>;

const PAGAMENTO_OPCOES = ['Apple Pay', 'Google Pay', 'PIX', 'Cartão de Crédito', 'Cartão de Débito'];
const CUPOM_VALIDO = 'EQUISOUL10';
const CARTAO_RECUSADO = '4000000000000002';

function parseValor(label: string): number {
  const match = label.match(/[\d.,]+/);
  if (!match) return 0;
  return Number(match[0].replace(/\./g, '').replace(',', '.'));
}

function formatValor(valor: number): string {
  return `R$ ${valor.toFixed(2).replace('.', ',')}`;
}

export function PremiumCheckoutScreen({ navigation, route }: Props) {
  const checkout = route.params;
  const iniciarAssinatura = usePremiumStore((state) => state.iniciarAssinatura);
  const setPremium = useUserStore((state) => state.setPremium);
  const { message, action, show } = useToast();

  const [metodo, setMetodo] = useState(PAGAMENTO_OPCOES[2]);
  const [numeroCartao, setNumeroCartao] = useState('');
  const [validadeCartao, setValidadeCartao] = useState('');
  const [nomeCartao, setNomeCartao] = useState('');
  const [erro, setErro] = useState<string | null>(null);
  const [cupom, setCupom] = useState('');
  const [cupomAplicado, setCupomAplicado] = useState(false);

  const isCartao = metodo === 'Cartão de Crédito' || metodo === 'Cartão de Débito';
  const isPix = metodo === 'PIX';
  const isWallet = metodo === 'Apple Pay' || metodo === 'Google Pay';

  const valorBase = parseValor(checkout.preco);
  const valorFinal = cupomAplicado ? valorBase * 0.9 : valorBase;
  const precoFinal = cupomAplicado ? checkout.preco.replace(/[\d.,]+/, formatValor(valorFinal).replace('R$ ', '')) : checkout.preco;

  const aplicarCupom = () => {
    if (cupom.trim().toUpperCase() === CUPOM_VALIDO) {
      setCupomAplicado(true);
      show('Cupom aplicado — 10% de desconto');
    } else {
      show('Cupom inválido');
    }
  };

  const confirmarPagamento = () => {
    if (isCartao) {
      const numeroLimpo = numeroCartao.replace(/\D/g, '');
      const numeroValido = numeroLimpo.length === 16;
      const validadeValida = /^\d{2}\/\d{2}$/.test(validadeCartao);
      if (!numeroValido || !validadeValida || !nomeCartao.trim()) {
        setErro('Confira o número do cartão (16 dígitos), a validade (MM/AA) e o nome impresso.');
        return;
      }
      setErro(null);
      if (numeroLimpo === CARTAO_RECUSADO) {
        navigation.navigate('PremiumErroPagamento', checkout);
        return;
      }
    }

    if (checkout.tipo === 'plano' && checkout.planoId) {
      iniciarAssinatura({
        planoId: checkout.planoId,
        plano: checkout.titulo,
        preco: precoFinal,
        proximaCobranca: checkout.proximaCobranca ?? '—',
        billing: checkout.billing ?? 'Mensal',
      });
      setPremium(true);
    } else if (checkout.tipo === 'fundador') {
      iniciarAssinatura({
        planoId: 'fundador',
        plano: 'Founding Member (Vitalício)',
        preco: precoFinal,
        proximaCobranca: 'Vitalício',
        billing: 'Anual',
      });
      setPremium(true);
    }

    navigation.navigate('PremiumSucesso', { ...checkout, preco: precoFinal });
  };

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <BackIcon size={16} />
        </Pressable>

        <Text variant="xxl" weight="extraBold">
          Finalizar pagamento
        </Text>

        <View style={styles.resumoCard}>
          <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.resumoLabel}>
            RESUMO
          </Text>
          <View style={styles.resumoRow}>
            <Text variant="lg" weight="extraBold">
              {checkout.titulo}
            </Text>
            <Text variant="lg" weight="extraBold">
              {precoFinal}
            </Text>
          </View>
          <Text variant="xs" weight="medium" color="secondary" style={styles.resumoNota}>
            {checkout.recorrente ? 'Cobrança recorrente · cancele quando quiser' : 'Pagamento único'}
          </Text>
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          MÉTODO DE PAGAMENTO
        </Text>
        <View style={styles.chipsRow}>
          {PAGAMENTO_OPCOES.map((opcao) => {
            const selected = metodo === opcao;
            return (
              <Pressable
                key={opcao}
                style={[styles.chip, selected && styles.chipSelected]}
                onPress={() => {
                  setMetodo(opcao);
                  setErro(null);
                }}
              >
                <Text variant="sm" weight="bold" color={selected ? theme.colors.text.inverse : 'primary'}>
                  {opcao}
                </Text>
              </Pressable>
            );
          })}
        </View>

        {isCartao && (
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
            <View style={styles.cartaoRow}>
              <TextInput
                value={validadeCartao}
                onChangeText={setValidadeCartao}
                placeholder="Validade (MM/AA)"
                placeholderTextColor={theme.colors.text.tertiary}
                keyboardType="number-pad"
                maxLength={5}
                style={[styles.input, styles.inputHalf]}
              />
              <TextInput
                value={nomeCartao}
                onChangeText={setNomeCartao}
                placeholder="Nome impresso"
                placeholderTextColor={theme.colors.text.tertiary}
                style={[styles.input, styles.inputHalf]}
              />
            </View>
            {!!erro && (
              <Text variant="xs" weight="bold" color={theme.colors.error}>
                {erro}
              </Text>
            )}
          </View>
        )}

        {isPix && (
          <View style={styles.pixCard}>
            <ImagePlaceholder caption="QR code PIX" style={styles.pixQr} />
            <Text variant="xs" weight="semiBold" color="secondary">
              Escaneie ou copie o código para pagar
            </Text>
            <Pressable style={styles.pixCopyButton} onPress={() => show('Código PIX copiado')}>
              <Text variant="xs" weight="extraBold">
                Copiar código PIX
              </Text>
            </Pressable>
          </View>
        )}

        {isWallet && (
          <View style={styles.walletCard}>
            <Text variant="xs" weight="semiBold" color="secondary" style={styles.walletText}>
              Confirme com biometria para pagar com {metodo}.
            </Text>
          </View>
        )}

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          CUPOM DE DESCONTO
        </Text>
        <View style={styles.cupomRow}>
          <TextInput
            value={cupom}
            onChangeText={setCupom}
            placeholder="Código do cupom"
            placeholderTextColor={theme.colors.text.tertiary}
            autoCapitalize="characters"
            editable={!cupomAplicado}
            style={[styles.input, styles.cupomInput]}
          />
          <Pressable
            style={[styles.cupomButton, cupomAplicado && styles.cupomButtonApplied]}
            onPress={aplicarCupom}
            disabled={cupomAplicado}
          >
            <Text variant="xs" weight="extraBold" color={cupomAplicado ? theme.colors.accent.olive : 'primary'}>
              {cupomAplicado ? 'Aplicado' : 'Aplicar'}
            </Text>
          </Pressable>
        </View>

        <Pressable style={styles.confirmarButton} onPress={confirmarPagamento}>
          <Text variant="md" weight="extraBold" color={theme.colors.accent.gold}>
            Confirmar pagamento
          </Text>
        </Pressable>
      </ScrollView>
      <Toast message={message} action={action} />
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
  resumoCard: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.spacing.md,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 2,
  },
  resumoLabel: {
    letterSpacing: 0.4,
  },
  resumoRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  resumoNota: {
    marginTop: 4,
  },
  sectionLabel: {
    marginTop: theme.spacing.xl,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  chipsRow: {
    marginTop: theme.spacing.sm,
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
  cartaoRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  input: {
    height: 48,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(43,41,36,0.14)',
    paddingHorizontal: theme.spacing.md,
    fontFamily: theme.typography.fontFamily.semiBold,
    fontSize: theme.typography.sizes.sm,
    color: theme.colors.text.primary,
    backgroundColor: '#fff',
  },
  inputHalf: {
    flex: 1,
  },
  pixCard: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.spacing.lg,
    alignItems: 'center',
    gap: theme.spacing.sm,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  pixQr: {
    width: 140,
    height: 140,
  },
  pixCopyButton: {
    width: '100%',
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  walletCard: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.spacing.lg,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  walletText: {
    textAlign: 'center',
    lineHeight: 19,
  },
  cupomRow: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  cupomInput: {
    flex: 1,
  },
  cupomButton: {
    paddingHorizontal: theme.spacing.md,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  cupomButtonApplied: {
    backgroundColor: 'rgba(107,115,83,0.14)',
  },
  confirmarButton: {
    marginTop: theme.spacing.xl,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
