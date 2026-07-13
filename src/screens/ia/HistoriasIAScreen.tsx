import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { BackIcon, DiaryIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { HISTORIAS_IA } from '../../store/useAIStore';

type Props = NativeStackScreenProps<RootStackParamList, 'HistoriasIA'>;

export function HistoriasIAScreen({ navigation }: Props) {
  const [abertos, setAbertos] = useState<string[]>([]);

  const toggle = (id: string) =>
    setAbertos((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]));

  return (
    <Screen padded={false} style={styles.screen}>
      <Pressable style={styles.backButton} onPress={() => navigation.navigate('InteligenciaArtificial')} hitSlop={8}>
        <BackIcon />
      </Pressable>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xl" weight="extraBold">
          Histórias
        </Text>
        <Text variant="md" weight="medium" color="secondary" style={styles.subtitle}>
          Capítulos escritos pela IA a partir das memórias de vocês.
        </Text>

        {HISTORIAS_IA.length === 0 ? (
          <View style={styles.vazio}>
            <DiaryIcon size={34} color={theme.colors.text.tertiary} />
            <Text variant="md" weight="bold" style={styles.vazioTitulo}>
              Ainda sem capítulos
            </Text>
            <Text variant="sm" weight="medium" color="secondary" style={styles.vazioTexto}>
              Quando houver memórias suficientes, a IA escreve o primeiro capítulo.
            </Text>
          </View>
        ) : (
          <View style={styles.lista}>
            {HISTORIAS_IA.map((capitulo) => {
              const aberto = abertos.includes(capitulo.id);
              return (
                <Pressable key={capitulo.id} style={styles.card} onPress={() => toggle(capitulo.id)}>
                  <ImagePlaceholder caption="capítulo" style={styles.capa} />
                  <View style={styles.cardBody}>
                    <Text variant="md" weight="extraBold">
                      {capitulo.titulo}
                    </Text>
                    {aberto && (
                      <Text variant="sm" weight="medium" color="secondary" style={styles.cardTexto}>
                        {capitulo.texto}
                      </Text>
                    )}
                  </View>
                </Pressable>
              );
            })}
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
  subtitle: {
    marginTop: theme.spacing.xs,
    lineHeight: 20,
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
  card: {
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  capa: {
    height: 110,
  },
  cardBody: {
    padding: theme.spacing.md,
  },
  cardTexto: {
    marginTop: theme.spacing.sm,
    lineHeight: 20,
  },
});
