import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import { CloseIcon, LetterIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { CARTAS_IA, useAIStore } from '../../store/useAIStore';

type Props = NativeStackScreenProps<RootStackParamList, 'LeituraCarta'>;

type Estagio = 'capa' | 'carregando' | 'aberta';

export function LeituraCartaScreen({ navigation, route }: Props) {
  const { cartaId } = route.params;
  const carta = CARTAS_IA.find((c) => c.id === cartaId) ?? CARTAS_IA[0];
  const [estagio, setEstagio] = useState<Estagio>('capa');
  const { message, action, show } = useToast();

  const favorita = useAIStore((state) => state.cartasFavoritas.includes(carta.id));
  const salva = useAIStore((state) => state.cartasSalvas.includes(carta.id));
  const noAlbum = useAIStore((state) => state.cartasNoAlbum.includes(carta.id));
  const toggleFavorita = useAIStore((state) => state.toggleCartaFavorita);
  const marcarSalva = useAIStore((state) => state.marcarCartaSalva);
  const marcarNoAlbum = useAIStore((state) => state.marcarCartaNoAlbum);

  useEffect(() => {
    if (estagio !== 'carregando') return;
    const timer = setTimeout(() => setEstagio('aberta'), 850);
    return () => clearTimeout(timer);
  }, [estagio]);

  return (
    <View style={styles.screen}>
      <Pressable
        style={styles.closeButton}
        onPress={() => navigation.navigate('CartasIA')}
        hitSlop={8}
      >
        <CloseIcon />
      </Pressable>

      {estagio === 'capa' && (
        <Pressable style={styles.capa} onPress={() => setEstagio('carregando')}>
          <View style={styles.capaEnvelope}>
            <LetterIcon size={34} color={theme.colors.accent.gold} />
          </View>
          <Text variant="md" weight="extraBold" color="inverse" style={styles.capaTexto}>
            Toque para abrir a carta
          </Text>
        </Pressable>
      )}

      {estagio === 'carregando' && (
        <View style={styles.carregando}>
          <ActivityIndicator size="small" color={theme.colors.accent.gold} />
          <Text variant="sm" weight="bold" color="rgba(251,249,244,0.7)">
            A IA está lendo a carta…
          </Text>
        </View>
      )}

      {estagio === 'aberta' && (
        <View style={styles.aberta}>
          <Text variant="xs" weight="bold" color={theme.colors.accent.gold} style={styles.tipo}>
            {carta.tipo.toUpperCase()}
          </Text>
          <Text variant="lg" weight="semiBold" color="inverse" style={styles.texto}>
            "{carta.texto}"
          </Text>

          <View style={styles.acoes}>
            <View style={styles.acoesRow}>
              <Pressable
                style={[styles.acaoBotao, favorita ? styles.acaoBotaoOutline : styles.acaoBotaoGold]}
                onPress={() => toggleFavorita(carta.id)}
              >
                <Text variant="sm" weight="extraBold" color={favorita ? 'inverse' : 'primary'}>
                  {favorita ? 'Favoritada ✓' : 'Favoritar'}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.acaoBotao, styles.acaoBotaoOutline]}
                onPress={() => show('Carta pronta para compartilhar')}
              >
                <Text variant="sm" weight="bold" color="inverse">
                  Compartilhar
                </Text>
              </Pressable>
            </View>
            <View style={styles.acoesRow}>
              <Pressable
                style={[styles.acaoBotao, styles.acaoBotaoOutline]}
                onPress={() => {
                  marcarSalva(carta.id);
                  show('Carta salva');
                }}
              >
                <Text variant="sm" weight="bold" color="inverse">
                  {salva ? 'Salva ✓' : 'Salvar'}
                </Text>
              </Pressable>
              <Pressable
                style={[styles.acaoBotao, styles.acaoBotaoOutline]}
                onPress={() => {
                  marcarNoAlbum(carta.id);
                  show('Adicionada ao álbum');
                }}
              >
                <Text variant="sm" weight="bold" color="inverse">
                  {noAlbum ? 'No álbum ✓' : 'Adicionar ao álbum'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      )}

      <Toast message={message} action={action} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: theme.colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: theme.spacing.xl,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 20,
    zIndex: 2,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(251,249,244,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  capa: {
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  capaEnvelope: {
    width: 140,
    height: 100,
    borderWidth: 1.6,
    borderColor: theme.colors.accent.gold,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  capaTexto: {
    textAlign: 'center',
  },
  carregando: {
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  aberta: {
    width: '100%',
    gap: theme.spacing.lg,
  },
  tipo: {
    textAlign: 'center',
    letterSpacing: 0.6,
  },
  texto: {
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 28,
  },
  acoes: {
    gap: theme.spacing.md,
  },
  acoesRow: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  acaoBotao: {
    flex: 1,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  acaoBotaoGold: {
    backgroundColor: theme.colors.accent.gold,
  },
  acaoBotaoOutline: {
    borderWidth: 1.5,
    borderColor: 'rgba(251,249,244,0.25)',
  },
});
