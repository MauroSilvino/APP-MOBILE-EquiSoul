import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { PortalScreen } from '../../components/portal/PortalScreen';
import { Chip } from '../../components/ui/Chip';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Text } from '../../components/ui/Text';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { usePortalStore } from '../../store/usePortalStore';

type Props = NativeStackScreenProps<RootStackParamList, 'PortalConteudo'>;

const TIPOS = ['Artigos', 'Vídeos', 'Dicas', 'Lives', 'Stories', 'Reels'];

export function PortalConteudoScreen({ navigation }: Props) {
  const conteudo = usePortalStore((s) => s.conteudo);
  const [tipo, setTipo] = useState<(typeof TIPOS)[number]>('Artigos');

  return (
    <PortalScreen
      title="Conteúdo"
      activeModule="PortalDashboard"
      onBack={() => navigation.goBack()}
      onNavigateModule={(route) => navigation.navigate(route)}
    >
      <Text variant="sm" weight="medium" color="secondary" style={styles.subtitle}>
        Publicações que constroem sua autoridade.
      </Text>

      <View style={styles.chipsRow}>
        {TIPOS.map((t) => (
          <Chip key={t} label={t} selected={tipo === t} onPress={() => setTipo(t)} />
        ))}
      </View>

      <View style={styles.list}>
        {conteudo.map((c) => (
          <View key={c.titulo} style={styles.card}>
            <ImagePlaceholder caption="" style={styles.thumb} />
            <View style={styles.cardBody}>
              <Text variant="sm" weight="bold">
                {c.titulo}
              </Text>
              <Text variant="xs" weight="semiBold" color={theme.colors.accent.leather} style={styles.cardTipo}>
                {c.tipo}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </PortalScreen>
  );
}

const styles = StyleSheet.create({
  subtitle: {
    marginTop: 6,
    lineHeight: 20,
  },
  chipsRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.xs,
  },
  list: {
    marginTop: theme.spacing.md,
    gap: theme.spacing.sm,
  },
  card: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 1,
  },
  thumb: {
    height: 80,
  },
  cardBody: {
    padding: 12,
  },
  cardTipo: {
    marginTop: 2,
  },
});
