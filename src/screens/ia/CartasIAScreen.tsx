import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, LetterIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { CARTAS_IA } from '../../store/useAIStore';

type Props = NativeStackScreenProps<RootStackParamList, 'CartasIA'>;

const FILTROS = ['Todas', 'Treinos', 'Passeios', 'Competições', 'Momentos especiais'];

export function CartasIAScreen({ navigation }: Props) {
  const [filtro, setFiltro] = useState('Todas');

  return (
    <Screen padded={false} style={styles.screen}>
      <Pressable style={styles.backButton} onPress={() => navigation.navigate('InteligenciaArtificial')} hitSlop={8}>
        <BackIcon />
      </Pressable>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xl" weight="extraBold">
          Cartas
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtros}>
          {FILTROS.map((label) => (
            <Pressable
              key={label}
              style={[styles.filtroChip, filtro === label && styles.filtroChipSelected]}
              onPress={() => setFiltro(label)}
            >
              <Text variant="sm" weight="bold" color={filtro === label ? theme.colors.accent.gold : 'primary'}>
                {label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {CARTAS_IA.length === 0 ? (
          <View style={styles.vazio}>
            <LetterIcon size={34} color={theme.colors.text.tertiary} />
            <Text variant="md" weight="bold" style={styles.vazioTitulo}>
              Ainda não há cartas
            </Text>
            <Text variant="sm" weight="medium" color="secondary" style={styles.vazioTexto}>
              Continue registrando momentos — a IA escreve a primeira carta em breve.
            </Text>
          </View>
        ) : (
          <View style={styles.lista}>
            {CARTAS_IA.map((carta) => (
              <Pressable
                key={carta.id}
                style={styles.cartaCard}
                onPress={() => navigation.navigate('LeituraCarta', { cartaId: carta.id })}
              >
                <LetterIcon size={26} color={theme.colors.accent.gold} />
                <View style={styles.cartaInfo}>
                  <Text variant="md" weight="extraBold" color="inverse">
                    {carta.tipo}
                  </Text>
                  <Text variant="xs" weight="medium" color="rgba(251,249,244,0.65)" style={styles.cartaMeta}>
                    {carta.data} · humor {carta.humor} · {carta.tempo}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
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
    paddingHorizontal: theme.spacing.xl,
    paddingTop: 70,
    paddingBottom: theme.spacing.xxl,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 20,
    zIndex: 2,
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
  },
  filtros: {
    marginTop: theme.spacing.md,
  },
  filtroChip: {
    marginRight: theme.spacing.sm,
    paddingVertical: theme.chipPadding.vertical,
    paddingHorizontal: theme.chipPadding.horizontal,
    borderRadius: theme.radius.chip,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  filtroChipSelected: {
    backgroundColor: theme.colors.surfaceDark,
  },
  vazio: {
    marginTop: 60,
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  vazioTitulo: {
    textAlign: 'center',
  },
  vazioTexto: {
    textAlign: 'center',
    maxWidth: 220,
    lineHeight: 20,
  },
  lista: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  cartaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: 18,
    backgroundColor: theme.colors.surfaceDark,
    padding: theme.spacing.md,
  },
  cartaInfo: {
    flex: 1,
    minWidth: 0,
  },
  cartaMeta: {
    marginTop: 2,
  },
});
