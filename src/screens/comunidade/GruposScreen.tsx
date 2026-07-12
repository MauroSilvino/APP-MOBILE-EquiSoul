import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { BottomTabBar } from '../../components/diario/BottomTabBar';
import { CommunityTabs } from '../../components/comunidade/CommunityTabs';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useCommunityStore } from '../../store/useCommunityStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Grupos'>;

export function GruposScreen({ navigation }: Props) {
  const grupos = useCommunityStore((state) => state.grupos);
  const criarGrupo = useCommunityStore((state) => state.criarGrupo);

  const [criarGrupoOpen, setCriarGrupoOpen] = useState(false);
  const [novoNome, setNovoNome] = useState('');

  function confirmarCriarGrupo() {
    if (!novoNome.trim()) return;
    criarGrupo(novoNome);
    setNovoNome('');
    setCriarGrupoOpen(false);
  }

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text variant="xxl" weight="extraBold">
          Comunidade
        </Text>

        <View style={styles.tabsSpacing}>
          <CommunityTabs active="Grupos" />
        </View>

        {grupos.length === 0 ? (
          <View style={styles.empty}>
            <Text variant="lg" weight="bold">
              Você ainda não faz parte de grupos
            </Text>
            <Text variant="sm" weight="medium" color="secondary" style={styles.emptyText}>
              Crie o primeiro grupo para começar.
            </Text>
          </View>
        ) : (
          <View style={styles.list}>
            {grupos.map((grupo) => (
              <Pressable
                key={grupo.id}
                style={styles.card}
                onPress={() => navigation.navigate('GrupoDetalhe', { id: grupo.id })}
              >
                <View style={styles.avatar} />
                <View style={styles.cardText}>
                  <Text variant="md" weight="bold">
                    {grupo.nome}
                  </Text>
                  <Text variant="sm" weight="medium" color="secondary" style={styles.cardSubtitle}>
                    {grupo.membros} membros
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        )}

        <Pressable style={styles.criarButton} onPress={() => setCriarGrupoOpen(true)}>
          <Text variant="sm" weight="bold" color={theme.colors.accent.leather}>
            + Criar grupo
          </Text>
        </Pressable>
      </ScrollView>

      <BottomTabBar active="Comunidade" />

      {criarGrupoOpen && (
        <View style={styles.overlay}>
          <View style={styles.sheet}>
            <View style={styles.sheetHandle} />
            <Text variant="xl" weight="extraBold">
              Criar novo grupo
            </Text>
            <TextField
              value={novoNome}
              onChangeText={setNovoNome}
              placeholder="Nome do grupo"
              style={styles.sheetInput}
            />
            <Pressable
              style={[styles.sheetButton, !!novoNome.trim() && styles.sheetButtonAtivo]}
              onPress={confirmarCriarGrupo}
            >
              <Text variant="md" weight="extraBold">
                Criar grupo
              </Text>
            </Pressable>
            <Pressable style={styles.cancelButton} onPress={() => setCriarGrupoOpen(false)}>
              <Text variant="sm" weight="bold" color="secondary">
                Cancelar
              </Text>
            </Pressable>
          </View>
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxl,
    paddingBottom: 130,
  },
  tabsSpacing: {
    marginTop: theme.spacing.lg,
  },
  empty: {
    marginTop: 50,
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  emptyText: {
    textAlign: 'center',
  },
  list: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderRadius: theme.radius.cardLarge,
    backgroundColor: '#fff',
    padding: theme.cardPadding.min,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: theme.colors.placeholder.background,
  },
  cardText: {
    minWidth: 0,
  },
  cardSubtitle: {
    marginTop: 2,
  },
  criarButton: {
    marginTop: theme.spacing.lg,
    height: theme.buttonHeight.max,
    borderRadius: theme.buttonHeight.max / 2,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: 'rgba(43,41,36,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(43,41,36,0.5)',
    justifyContent: 'flex-end',
    zIndex: 45,
  },
  sheet: {
    backgroundColor: theme.colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xl,
    paddingBottom: 34,
    gap: theme.spacing.md,
  },
  sheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(43,41,36,0.15)',
    alignSelf: 'center',
    marginBottom: theme.spacing.xs,
  },
  sheetInput: {},
  sheetButton: {
    height: theme.buttonHeight.max,
    borderRadius: theme.buttonHeight.max / 2,
    backgroundColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetButtonAtivo: {
    backgroundColor: theme.colors.accent.gold,
  },
  cancelButton: {
    alignItems: 'center',
  },
});
