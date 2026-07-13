import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { getHorseAgeYears, useHorseStore } from '../../store/useHorseStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Cavalos'>;

export function CavalosScreen({ navigation }: Props) {
  const horses = useHorseStore((state) => state.horses);

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Meus cavalos
        </Text>

        <View style={styles.list}>
          {horses.length === 0 && (
            <Text variant="sm" weight="medium" color="secondary" style={styles.empty}>
              Você ainda não cadastrou nenhum cavalo.
            </Text>
          )}

          {horses.map((cavalo) => {
            const idade = getHorseAgeYears(cavalo.nascimento);
            return (
              <Pressable
                key={cavalo.id}
                style={styles.card}
                onPress={() => navigation.navigate('PerfilCavalo', { id: cavalo.id })}
              >
                <ImagePlaceholder caption={`foto · ${cavalo.nome || 'cavalo'}`} style={styles.cardPhoto} />
                <View style={styles.cardBody}>
                  <Text variant="lg" weight="extraBold">
                    {cavalo.nome || 'Sem nome'}
                  </Text>
                  <Text variant="xs" weight="medium" color="secondary" style={styles.cardSubtitle}>
                    {[cavalo.raca, idade !== null ? `${idade} anos` : null, cavalo.humor ? `humor ${cavalo.humor}` : null]
                      .filter(Boolean)
                      .join(' · ') || 'Sem detalhes ainda'}
                  </Text>
                </View>
              </Pressable>
            );
          })}

          <Pressable
            style={styles.addButton}
            onPress={() => navigation.navigate('AdicionarCavalo', { fromPerfis: true })}
          >
            <Text variant="md" weight="bold" color={theme.colors.accent.leather}>
              + Adicionar cavalo
            </Text>
          </Pressable>
        </View>
      </ScrollView>

      <BottomTabBar active="Perfis" />

      <Pressable style={styles.backButton} onPress={() => navigation.navigate('Perfis')} hitSlop={8}>
        <BackIcon />
      </Pressable>
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
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  empty: {
    textAlign: 'center',
    marginTop: theme.spacing.xl,
  },
  card: {
    borderRadius: theme.radius.cardLarge,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 2,
  },
  cardPhoto: {
    height: 150,
  },
  cardBody: {
    padding: theme.cardPadding.max,
  },
  cardSubtitle: {
    marginTop: 2,
  },
  addButton: {
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.2)',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
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
