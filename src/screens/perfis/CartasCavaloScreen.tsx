import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Chip } from '../../components/ui/Chip';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { Toast, useToast } from '../../components/ui/Toast';
import { BackIcon, LetterIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useHorseStore } from '../../store/useHorseStore';

type Props = NativeStackScreenProps<RootStackParamList, 'CartasCavalo'>;

const HUMORES = ['grata', 'animada', 'tranquila', 'orgulhosa'];

export function CartasCavaloScreen({ navigation, route }: Props) {
  const horses = useHorseStore((state) => state.horses);
  const horse = horses.find((h) => h.id === route.params.id) ?? horses[0];
  const addCarta = useHorseStore((state) => state.addCarta);

  const [aberto, setAberto] = useState(false);
  const [humor, setHumor] = useState(HUMORES[0]);
  const [texto, setTexto] = useState('');
  const [expandidas, setExpandidas] = useState<Record<string, boolean>>({});
  const { message, show } = useToast();

  if (!horse) {
    return (
      <Screen>
        <Text variant="md" weight="bold">
          Cavalo não encontrado.
        </Text>
      </Screen>
    );
  }

  function handleSalvar() {
    const conteudo = texto.trim() || `Mais um dia especial ao lado de ${horse!.nome}.`;
    addCarta(horse!.id, conteudo, humor);
    setTexto('');
    setAberto(false);
    show('Carta salva!');
  }

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Text variant="xxl" weight="extraBold">
            Cartas · {horse.nome}
          </Text>
          <Pressable onPress={() => navigation.navigate('Timeline')}>
            <Text variant="xs" weight="bold">
              Ver no Diário →
            </Text>
          </Pressable>
        </View>

        <Pressable style={styles.novaCartaButton} onPress={() => setAberto((current) => !current)}>
          <Text variant="sm" weight="bold" color={theme.colors.accent.leather}>
            + Nova carta
          </Text>
        </Pressable>

        {aberto && (
          <View style={styles.novaCartaCard}>
            <Text variant="xs" weight="semiBold" color="secondary">
              Como você está se sentindo hoje?
            </Text>
            <View style={styles.humorChips}>
              {HUMORES.map((label) => (
                <Chip key={label} label={label} selected={humor === label} onPress={() => setHumor(label)} />
              ))}
            </View>
            <TextField
              placeholder="Escreva sua carta..."
              value={texto}
              onChangeText={setTexto}
              multiline
              numberOfLines={3}
              style={styles.textarea}
            />
            <Pressable style={styles.salvarButton} onPress={handleSalvar}>
              <Text variant="sm" weight="extraBold">
                Salvar carta
              </Text>
            </Pressable>
          </View>
        )}

        <View style={styles.cartasList}>
          {horse.cartas.length === 0 ? (
            <Text variant="sm" weight="medium" color="secondary" style={styles.empty}>
              Nenhuma carta ainda.
            </Text>
          ) : (
            horse.cartas.map((carta) => {
              const isOpen = !!expandidas[carta.id];
              return (
                <Pressable
                  key={carta.id}
                  style={styles.cartaCard}
                  onPress={() => setExpandidas((current) => ({ ...current, [carta.id]: !current[carta.id] }))}
                >
                  <View style={styles.cartaHeader}>
                    <LetterIcon size={18} color={theme.colors.accent.gold} strokeWidth={1.8} />
                    <Text variant="sm" weight="bold" color="inverse" style={styles.cartaHeaderText}>
                      {carta.date} · {carta.humor}
                    </Text>
                  </View>
                  {isOpen && (
                    <Text variant="sm" weight="semiBold" color="rgba(251,249,244,0.9)" style={styles.cartaTexto}>
                      {carta.texto}
                    </Text>
                  )}
                </Pressable>
              );
            })
          )}
        </View>
      </ScrollView>

      <BottomTabBar active="Perfis" />

      <Pressable style={styles.backButton} onPress={() => navigation.navigate('PerfilCavalo', { id: horse.id })} hitSlop={8}>
        <BackIcon />
      </Pressable>
      <Toast message={message} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: 70,
    paddingBottom: 150,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  novaCartaButton: {
    marginTop: theme.spacing.lg,
    height: 48,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.2)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
  },
  novaCartaCard: {
    marginTop: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  humorChips: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  textarea: {
    marginTop: theme.spacing.sm,
    height: 80,
    paddingTop: theme.spacing.sm,
    textAlignVertical: 'top',
  },
  salvarButton: {
    marginTop: theme.spacing.sm,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartasList: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  empty: {
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
  cartaCard: {
    borderRadius: theme.radius.card,
    backgroundColor: theme.colors.surfaceDark,
    padding: theme.spacing.lg,
  },
  cartaHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  cartaHeaderText: {
    flex: 1,
  },
  cartaTexto: {
    marginTop: theme.spacing.md,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 4,
  },
});
