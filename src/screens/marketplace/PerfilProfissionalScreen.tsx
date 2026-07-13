import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMarketplaceStore } from '../../store/useMarketplaceStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PerfilProfissional'>;

export function PerfilProfissionalScreen({ navigation, route }: Props) {
  const profissional = useMarketplaceStore((state) =>
    state.profissionais.find((item) => item.id === route.params.profissionalId)
  );

  if (!profissional) return null;

  return (
    <Screen style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
          <BackIcon size={16} />
        </Pressable>

        <View style={styles.headerRow}>
          <View style={styles.avatar} />
          <View style={styles.headerInfo}>
            <Text variant="lg" weight="extraBold">
              {profissional.nome}
            </Text>
            <Text variant="sm" weight="semiBold" color="secondary" style={styles.titulo}>
              {profissional.titulo}
            </Text>
            <View style={styles.verifiedBadge}>
              <Text variant="xs" weight="bold" color={theme.colors.accent.leather}>
                Perfil verificado
              </Text>
            </View>
          </View>
        </View>

        <Text variant="sm" weight="medium" color="secondary" style={styles.bio}>
          {profissional.bio}
        </Text>

        <View style={styles.statsRow}>
          <Pressable
            style={styles.statItem}
            onPress={() =>
              navigation.navigate('MarketplaceAvaliacoes', {
                nome: profissional.nome,
                nota: profissional.avaliacao,
              })
            }
          >
            <Text variant="lg" weight="extraBold">
              {profissional.avaliacao}
            </Text>
            <Text variant="xs" weight="semiBold" color="secondary" style={styles.statLabel}>
              AVALIAÇÃO
            </Text>
          </Pressable>
          <View style={styles.statItem}>
            <Text variant="lg" weight="extraBold">
              {profissional.atendimentos}
            </Text>
            <Text variant="xs" weight="semiBold" color="secondary" style={styles.statLabel}>
              ATENDIMENTOS
            </Text>
          </View>
          <View style={styles.statItem}>
            <Text variant="lg" weight="extraBold">
              {profissional.anos}
            </Text>
            <Text variant="xs" weight="semiBold" color="secondary" style={styles.statLabel}>
              ANOS
            </Text>
          </View>
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          GALERIA
        </Text>
        <View style={styles.galeria}>
          {[0, 1, 2].map((i) => (
            <View key={i} style={styles.galeriaItem} />
          ))}
        </View>

        <View style={styles.actionsRow}>
          <Pressable
            style={styles.primaryButton}
            onPress={() =>
              navigation.navigate('MarketplaceReserva', {
                origem: 'Ferrageamento',
                nome: profissional.nome,
                precoLabel: profissional.precoConsultaLabel,
              })
            }
          >
            <Text variant="md" weight="extraBold">
              Agendar
            </Text>
          </Pressable>
          <Pressable
            style={styles.secondaryButton}
            onPress={() => navigation.navigate('MarketplaceChat', { nome: profissional.nome })}
          >
            <Text variant="sm" weight="bold">
              Conversar
            </Text>
          </Pressable>
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
  headerRow: {
    flexDirection: 'row',
    gap: theme.spacing.md,
    alignItems: 'center',
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: theme.colors.placeholder.background,
  },
  headerInfo: {
    flex: 1,
    minWidth: 0,
  },
  titulo: {
    marginTop: 2,
  },
  verifiedBadge: {
    marginTop: 6,
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'rgba(201,161,90,0.18)',
  },
  bio: {
    marginTop: theme.spacing.lg,
    lineHeight: 20,
  },
  statsRow: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    textTransform: 'uppercase',
  },
  sectionLabel: {
    marginTop: theme.spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  galeria: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  galeriaItem: {
    flex: 1,
    height: 80,
    borderRadius: 12,
    backgroundColor: theme.colors.placeholder.background,
  },
  actionsRow: {
    marginTop: theme.spacing.xl,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  primaryButton: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
