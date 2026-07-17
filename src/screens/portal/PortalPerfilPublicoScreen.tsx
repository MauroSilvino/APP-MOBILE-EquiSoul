import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { Chip } from '../../components/ui/Chip';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalPerfilPublico'>;

const ABAS = ['Agenda', 'Avaliações', 'Certificados', 'Galeria', 'Contato'];

export function PortalPerfilPublicoScreen({ navigation }: Props) {
  const [aba, setAba] = useState<(typeof ABAS)[number]>('Agenda');

  return (
    <PortalScreen activeModule="PortalPerfilPublico" scroll onNavigateModule={(route) => navigation.navigate(route)} padded={false}>
      <ImagePlaceholder caption="capa · perfil profissional" style={styles.cover} />
      <View style={styles.body}>
        <ImagePlaceholder caption="" style={styles.avatar} />
        <Text variant="lg" weight="extraBold" style={styles.name}>
          Dra. Marina Kist
        </Text>
        <Text variant="xs" weight="bold" color={theme.colors.accent.leather} style={styles.role}>
          Veterinária Equina · São Paulo, SP
        </Text>
        <Text variant="sm" weight="medium" color="secondary" style={styles.bio}>
          Mais de 12 anos cuidando da saúde e bem-estar de cavalos atletas e de lazer.
        </Text>

        <View style={styles.actionsRow}>
          <Pressable style={styles.primaryButton} onPress={() => navigation.navigate('PortalPortfolio')}>
            <Text variant="sm" weight="extraBold">
              Agendar
            </Text>
          </Pressable>
          <Pressable style={styles.secondaryButton}>
            <Text variant="sm" weight="bold">
              Mensagem
            </Text>
          </Pressable>
        </View>

        <View style={styles.chipsRow}>
          {ABAS.map((a) => (
            <Chip key={a} label={a} selected={aba === a} onPress={() => setAba(a)} />
          ))}
        </View>
      </View>
    </PortalScreen>
  );
}

const styles = StyleSheet.create({
  cover: {
    height: 150,
  },
  body: {
    paddingHorizontal: theme.spacing.md,
    paddingBottom: 40,
  },
  avatar: {
    marginTop: -36,
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 3,
    borderColor: theme.colors.background,
  },
  name: {
    marginTop: theme.spacing.sm,
  },
  role: {
    marginTop: 2,
  },
  bio: {
    marginTop: theme.spacing.sm,
    lineHeight: 20,
  },
  actionsRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  primaryButton: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButton: {
    flex: 1,
    height: 44,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipsRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
});
