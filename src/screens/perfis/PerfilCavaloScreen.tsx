import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import {
  BackIcon,
  ClockIcon,
  GalleryIcon,
  LetterIcon,
  PulseHeartIcon,
  TrendIcon,
  TrophyIcon,
} from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { getHorseAgeYears, useHorseStore } from '../../store/useHorseStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PerfilCavalo'>;

export function PerfilCavaloScreen({ navigation, route }: Props) {
  const horses = useHorseStore((state) => state.horses);
  const horse = horses.find((h) => h.id === route.params.id) ?? horses[0];

  if (!horse) {
    return (
      <Screen>
        <Text variant="md" weight="bold">
          Cavalo não encontrado.
        </Text>
      </Screen>
    );
  }

  const idade = getHorseAgeYears(horse.nascimento);
  const aiResumo = horse.personalidade.length
    ? `${horse.nome} é conhecido(a) por ser ${horse.personalidade.join(', ').toLowerCase()}.`
    : `Ainda conhecendo ${horse.nome} — poucos registros até agora.`;

  const subtitleParts = [
    horse.raca,
    horse.pelagem,
    horse.sexo === 'macho' ? 'Macho' : horse.sexo === 'femea' ? 'Fêmea' : null,
    idade !== null ? `${idade} anos` : null,
    horse.relationship?.tempoJuntos ? `${horse.relationship.tempoJuntos} juntos` : null,
  ].filter(Boolean);

  const grid = [
    { label: 'Linha do tempo', icon: <ClockIcon color={theme.colors.accent.olive} />, onPress: () => navigation.navigate('TimelineCavalo', { id: horse.id }) },
    { label: 'Galeria', icon: <GalleryIcon />, onPress: () => navigation.navigate('GaleriaCavalo', { id: horse.id }) },
    { label: 'Saúde', icon: <PulseHeartIcon />, onPress: () => navigation.navigate('SaudeCavalo', { id: horse.id }) },
    { label: 'Evolução', icon: <TrendIcon />, onPress: () => navigation.navigate('EvolucaoCavalo', { id: horse.id }) },
    { label: 'Cartas', icon: <LetterIcon size={20} color="#6B7353" strokeWidth={1.8} />, onPress: () => navigation.navigate('CartasCavalo', { id: horse.id }) },
    { label: 'Conquistas', icon: <TrophyIcon />, onPress: null },
  ];

  return (
    <Screen padded={false} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <ImagePlaceholder caption={`foto grande · ${horse.nome}`} style={StyleSheet.absoluteFill} />
          <View style={styles.heroOverlay} />
          <View style={styles.heroContent}>
            <Text variant="xxl" weight="extraBold" color="inverse">
              {horse.nome}
            </Text>
            {!!subtitleParts.length && (
              <Text variant="xs" weight="bold" color="rgba(251,249,244,0.85)" style={styles.heroSubtitle}>
                {subtitleParts.join(' · ')}
              </Text>
            )}
            <View style={styles.heroActions}>
              <Pressable
                style={styles.heroPrimaryButton}
                onPress={() => navigation.navigate('NovoRegistro')}
              >
                <Text variant="sm" weight="extraBold">
                  Registrar memória
                </Text>
              </Pressable>
              <Pressable
                style={styles.heroSecondaryButton}
                onPress={() => navigation.navigate('CompartilharCavalo', { id: horse.id })}
              >
                <Text variant="sm" weight="bold" color="inverse">
                  Compartilhar
                </Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.aiCard}>
            <Text variant="xs" weight="bold" color={theme.colors.accent.moss} style={styles.aiEyebrow}>
              A IA RESUME
            </Text>
            <Text variant="sm" weight="semiBold" style={styles.aiText}>
              "{aiResumo}"
            </Text>
          </View>

          <View style={styles.grid}>
            {grid.map((item) => (
              <Pressable
                key={item.label}
                style={styles.gridTile}
                onPress={item.onPress ?? undefined}
                disabled={!item.onPress}
              >
                {item.icon}
                <Text variant="xs" weight="bold" style={styles.gridLabel}>
                  {item.label}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text variant="xs" weight="bold" style={styles.sectionLabel}>
            SOBRE {horse.nome.toUpperCase()}
          </Text>
          <View style={styles.sobre}>
            <View style={styles.sobreRow}>
              <Text variant="sm" weight="bold" color="secondary">
                Nascimento
              </Text>
              <Text variant="sm" weight="bold">
                {horse.nascimento || '—'}
              </Text>
            </View>
            <View style={styles.sobreRow}>
              <Text variant="sm" weight="bold" color="secondary">
                Personalidade
              </Text>
              <Text variant="sm" weight="bold">
                {horse.personalidade.length ? horse.personalidade.join(', ') : '—'}
              </Text>
            </View>
            <View style={styles.sobreRow}>
              <Text variant="sm" weight="bold" color="secondary">
                Apelido
              </Text>
              <Text variant="sm" weight="bold">
                {horse.apelido || '—'}
              </Text>
            </View>
            <View style={styles.sobreRow}>
              <Text variant="sm" weight="bold" color="secondary">
                Comida favorita
              </Text>
              <Text variant="sm" weight="bold">
                {horse.comidaFavorita || '—'}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <Pressable style={styles.backButton} onPress={() => navigation.navigate('Cavalos')} hitSlop={8}>
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
    paddingBottom: theme.spacing.xxl,
  },
  hero: {
    height: 400,
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(43,41,36,0.45)',
  },
  heroContent: {
    position: 'absolute',
    left: theme.spacing.xl,
    right: theme.spacing.xl,
    bottom: theme.spacing.lg,
  },
  heroSubtitle: {
    marginTop: 4,
  },
  heroActions: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  heroPrimaryButton: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroSecondaryButton: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.3,
    borderColor: 'rgba(251,249,244,0.4)',
    backgroundColor: 'rgba(251,249,244,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
  },
  aiCard: {
    borderRadius: theme.radius.card,
    padding: theme.spacing.lg,
    backgroundColor: 'rgba(107,115,83,0.1)',
  },
  aiEyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  aiText: {
    marginTop: 6,
    fontStyle: 'italic',
    lineHeight: 20,
  },
  grid: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  gridTile: {
    width: '31%',
    borderRadius: theme.radius.card,
    backgroundColor: '#fff',
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
    gap: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  gridLabel: {
    textAlign: 'center',
  },
  sectionLabel: {
    marginTop: theme.spacing.xl,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  sobre: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  sobreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
