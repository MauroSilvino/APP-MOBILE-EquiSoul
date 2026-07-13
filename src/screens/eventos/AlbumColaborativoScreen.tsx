import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon, ClockIcon, DocumentIcon, PlayIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'AlbumColaborativo'>;

const CRIACOES_IA = [
  { label: 'Vídeo oficial do evento', Icon: PlayIcon },
  { label: 'Retrospectiva do dia', Icon: ClockIcon },
  { label: 'Livro digital do evento', Icon: DocumentIcon },
];

export function AlbumColaborativoScreen({ navigation }: Props) {
  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Álbum colaborativo
        </Text>
        <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
          Todos os participantes contribuem — a IA organiza tudo.
        </Text>

        <View style={styles.photoGrid}>
          {Array.from({ length: 9 }, (_, i) => (
            <View key={i} style={styles.photo} />
          ))}
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          A IA JÁ CRIOU
        </Text>
        <View style={styles.list}>
          {CRIACOES_IA.map(({ label, Icon }) => (
            <View key={label} style={styles.item}>
              <Icon size={18} color={theme.colors.accent.olive} strokeWidth={1.8} />
              <Text variant="sm" weight="bold">
                {label}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <Pressable style={styles.backButton} onPress={() => navigation.goBack()} hitSlop={8}>
        <BackIcon size={16} />
      </Pressable>

      <BottomTabBar active="Comunidade" />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: 60,
    paddingBottom: 130,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
    lineHeight: 20,
  },
  photoGrid: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  photo: {
    width: '31.5%',
    height: 100,
    borderRadius: 12,
    backgroundColor: theme.colors.placeholder.background,
  },
  sectionLabel: {
    marginTop: theme.spacing.xl,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  list: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.sm,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: 16,
    backgroundColor: '#fff',
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  backButton: {
    position: 'absolute',
    top: 16,
    left: 20,
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
    elevation: 4,
  },
});
