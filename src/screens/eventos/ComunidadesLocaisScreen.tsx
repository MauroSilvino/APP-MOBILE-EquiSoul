import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { Chip } from '../../components/ui/Chip';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useEventsStore } from '../../store/useEventsStore';

type Props = NativeStackScreenProps<RootStackParamList, 'ComunidadesLocais'>;

const MODOS = ['Lista', 'Mapa'];
const COMUNIDADES = [
  { nome: 'Cavaleiros de Campinas', cidade: 'Campinas, SP', membros: 480 },
  { nome: 'Amazonas do Sul', cidade: 'Porto Alegre, RS', membros: 320 },
  { nome: 'Trilhas Serra do Mar', cidade: 'Petrópolis, RJ', membros: 210 },
];

export function ComunidadesLocaisScreen({ navigation }: Props) {
  const comunidadesMembro = useEventsStore((state) => state.comunidadesMembro);
  const toggleComunidade = useEventsStore((state) => state.toggleComunidade);
  const [modo, setModo] = useState('Lista');

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Comunidades locais
        </Text>

        <View style={styles.chipsRow}>
          {MODOS.map((label) => (
            <Chip key={label} label={label} selected={modo === label} onPress={() => setModo(label)} />
          ))}
        </View>

        {modo === 'Mapa' && (
          <ImagePlaceholder caption="mapa com pins das comunidades" style={styles.mapPlaceholder} />
        )}

        <View style={styles.list}>
          {COMUNIDADES.map((c) => {
            const membro = comunidadesMembro.includes(c.nome);
            return (
              <View key={c.nome} style={styles.card}>
                <View style={styles.cardPhoto} />
                <View style={styles.cardBody}>
                  <Text variant="md" weight="bold">
                    {c.nome}
                  </Text>
                  <Text variant="sm" weight="medium" color="secondary" style={styles.cardInfo}>
                    {c.cidade} · {c.membros} membros
                  </Text>
                </View>
                <Pressable style={[styles.actionButton, membro && styles.actionButtonMembro]} onPress={() => toggleComunidade(c.nome)}>
                  <Text variant="xs" weight="bold" color={membro ? theme.colors.accent.moss : 'primary'}>
                    {membro ? 'Membro ✓' : 'Participar'}
                  </Text>
                </Pressable>
              </View>
            );
          })}
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
  chipsRow: {
    marginTop: theme.spacing.md,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  mapPlaceholder: {
    marginTop: theme.spacing.md,
    height: 150,
    borderRadius: theme.radius.cardLarge,
  },
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: 18,
    backgroundColor: '#fff',
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    elevation: 2,
  },
  cardPhoto: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: theme.colors.placeholder.background,
  },
  cardBody: {
    flex: 1,
  },
  cardInfo: {
    marginTop: 2,
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 14,
    backgroundColor: theme.colors.accent.gold,
  },
  actionButtonMembro: {
    backgroundColor: 'rgba(107,115,83,0.15)',
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
