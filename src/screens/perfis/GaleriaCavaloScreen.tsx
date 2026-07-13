import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Chip } from '../../components/ui/Chip';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { Toast, useToast } from '../../components/ui/Toast';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useHorseStore } from '../../store/useHorseStore';

type Props = NativeStackScreenProps<RootStackParamList, 'GaleriaCavalo'>;

const FILTROS = ['Fotos', 'Vídeos', 'Mapa', 'Favoritos'];

export function GaleriaCavaloScreen({ navigation, route }: Props) {
  const horses = useHorseStore((state) => state.horses);
  const horse = horses.find((h) => h.id === route.params.id) ?? horses[0];
  const [filtro, setFiltro] = useState('Fotos');
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

  const items = horse.fotoUri ? [horse.fotoUri] : [];

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Galeria · {horse.nome}
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filtros}>
            {FILTROS.map((label) => (
              <Chip key={label} label={label} selected={filtro === label} onPress={() => setFiltro(label)} />
            ))}
          </View>
        </ScrollView>

        {items.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text variant="md" weight="bold">
              Nenhuma foto ainda
            </Text>
            <Text variant="sm" weight="medium" color="secondary" style={styles.emptySubtitle}>
              Adicione a primeira foto de {horse.nome} para começar a galeria.
            </Text>
            <Pressable style={styles.emptyButton} onPress={() => show('Abrindo criação de memória...')}>
              <Text variant="sm" weight="extraBold">
                Adicionar foto
              </Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.grid}>
            {items.map((uri, index) => (
              <View key={index} style={styles.gridTile} />
            ))}
          </View>
        )}
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
  filtros: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  emptyCard: {
    marginTop: theme.spacing.xl,
    borderRadius: theme.radius.cardLarge,
    backgroundColor: 'rgba(43,41,36,0.04)',
    padding: theme.spacing.xxl,
    alignItems: 'center',
  },
  emptySubtitle: {
    marginTop: 4,
    textAlign: 'center',
  },
  emptyButton: {
    marginTop: theme.spacing.md,
    height: 44,
    paddingHorizontal: theme.spacing.xl,
    borderRadius: 22,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  gridTile: {
    width: '31.5%',
    height: 110,
    borderRadius: 12,
    backgroundColor: theme.colors.placeholder.background,
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
