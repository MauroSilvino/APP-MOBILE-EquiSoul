import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePremiumStore } from '../../store/usePremiumStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PremiumCriacoesExclusivas'>;

export function PremiumCriacoesExclusivasScreen({ navigation }: Props) {
  const avulsosList = usePremiumStore((state) => state.avulsosList);

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <BackIcon size={16} />
        </Pressable>

        <Text variant="xxl" weight="extraBold">
          Criações Exclusivas
        </Text>
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
          Recursos avulsos de IA, sem precisar assinar o Premium.
        </Text>

        <View style={styles.list}>
          {avulsosList.map((avulso) => (
            <View key={avulso.id} style={styles.card}>
              <ImagePlaceholder caption={avulso.imagemLabel} style={styles.thumb} />
              <View style={styles.cardBody}>
                <View style={styles.cardHeader}>
                  <Text variant="md" weight="extraBold" style={styles.cardTitle}>
                    {avulso.titulo}
                  </Text>
                  <Text variant="md" weight="extraBold" color={theme.colors.accent.leather}>
                    {avulso.preco}
                  </Text>
                </View>
                <Text variant="xs" weight="medium" color="secondary" style={styles.cardDescricao}>
                  {avulso.descricao}
                </Text>
                <Pressable
                  style={styles.cta}
                  onPress={() =>
                    navigation.navigate('PremiumCheckout', {
                      tipo: 'avulso',
                      titulo: avulso.titulo,
                      preco: avulso.preco,
                      recorrente: false,
                    })
                  }
                >
                  <Text variant="sm" weight="extraBold" color={theme.colors.accent.gold}>
                    Criar Agora
                  </Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
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
  subtitle: {
    marginTop: 4,
    lineHeight: 20,
  },
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  card: {
    borderRadius: theme.radius.card,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    elevation: 2,
  },
  thumb: {
    height: 100,
  },
  cardBody: {
    padding: theme.spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: theme.spacing.sm,
  },
  cardTitle: {
    flex: 1,
  },
  cardDescricao: {
    marginTop: theme.spacing.xs,
    lineHeight: 18,
  },
  cta: {
    marginTop: theme.spacing.sm,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
