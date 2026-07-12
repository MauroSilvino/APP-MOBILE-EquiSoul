import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, Share, StyleSheet, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Chip } from '../../components/ui/Chip';
import { FavoriteToggle } from '../../components/ui/FavoriteToggle';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { CommentIcon, ShareIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useMemoriesStore } from '../../store/useMemoriesStore';

type Props = NativeStackScreenProps<RootStackParamList, 'MemoriaCompleta'>;

const TIPOS = ['Treino', 'Passeio', 'Competição', 'Momento especial', 'Foto', 'Check-in'];
const EMOCOES = ['😊', '❤️', '😌', '🏆', '😴', '😅', '🤩', '😢'];

export function MemoriaCompletaScreen({ navigation, route }: Props) {
  const memorias = useMemoriesStore((state) => state.memorias);
  const toggleFavorito = useMemoriesStore((state) => state.toggleFavorito);
  const removerMemoria = useMemoriesStore((state) => state.removerMemoria);
  const atualizarMemoria = useMemoriesStore((state) => state.atualizarMemoria);
  const ultimaMemoriaId = useMemoriesStore((state) => state.ultimaMemoriaId);

  const memoriaId = route.params?.id ?? ultimaMemoriaId ?? memorias[0]?.id;
  const memoria = memorias.find((item) => item.id === memoriaId) ?? memorias[0];

  const [editando, setEditando] = useState(false);
  const [confirmandoExclusao, setConfirmandoExclusao] = useState(false);
  const [tipoEdit, setTipoEdit] = useState(memoria?.tipo ?? TIPOS[0]);
  const [emocaoEdit, setEmocaoEdit] = useState<string | null>(memoria?.emocao ?? null);
  const [notaEdit, setNotaEdit] = useState(memoria?.nota ?? '');

  if (!memoria) {
    return (
      <Screen>
        <Text variant="md" color="secondary" style={styles.empty}>
          Nenhuma memória para exibir ainda.
        </Text>
      </Screen>
    );
  }

  function abrirEdicao() {
    setTipoEdit(memoria!.tipo);
    setEmocaoEdit(memoria!.emocao);
    setNotaEdit(memoria!.nota);
    setEditando(true);
  }

  function salvarEdicao() {
    atualizarMemoria(memoria!.id, { tipo: tipoEdit, emocao: emocaoEdit, nota: notaEdit });
    setEditando(false);
  }

  function confirmarExclusao() {
    removerMemoria(memoria!.id);
    navigation.navigate('Home');
  }

  function compartilhar() {
    Share.share({ message: `${memoria!.titulo}\n${memoria!.nota}` });
  }

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView>
        <ImagePlaceholder style={styles.hero} caption="foto grande · momento registrado" />
        <View style={styles.content}>
          <Text variant="xs" weight="semiBold" color={theme.colors.accent.leather} style={styles.eyebrow}>
            {memoria.relativeLabel} · {memoria.tipo}
          </Text>

          {!editando ? (
            <>
              <Text variant="xxl" weight="extraBold" style={styles.title}>
                {memoria.titulo}
              </Text>
              {!!memoria.nota && (
                <Text variant="md" weight="medium" color="secondary" style={styles.nota}>
                  {memoria.nota}
                </Text>
              )}
              {!!memoria.emocao && (
                <Text style={styles.emocao}>{memoria.emocao}</Text>
              )}

              <View style={styles.tags}>
                {!!memoria.local && (
                  <View style={styles.tag}>
                    <Text variant="sm" weight="semiBold">
                      {memoria.local}
                    </Text>
                  </View>
                )}
                <View style={styles.tag}>
                  <Text variant="sm" weight="semiBold">
                    ☀ 24°C
                  </Text>
                </View>
              </View>

              <View style={styles.iaCard}>
                <Text variant="xs" weight="bold" color={theme.colors.accent.gold} style={styles.iaEyebrow}>
                  IA
                </Text>
                <Text variant="sm" weight="bold" color="inverse" style={styles.iaText}>
                  Este foi o treino mais tranquilo do mês — continuem assim.
                </Text>
              </View>

              <View style={styles.actions}>
                <FavoriteToggle favorito={memoria.favorito} onToggle={() => toggleFavorito(memoria!.id)} />
                <CommentIcon />
                <Pressable onPress={compartilhar}>
                  <ShareIcon />
                </Pressable>
                <View style={styles.actionsSpacer} />
                <Pressable onPress={abrirEdicao}>
                  <Text variant="sm" weight="bold" color={theme.colors.accent.leather}>
                    Editar
                  </Text>
                </Pressable>
                <Pressable onPress={() => setConfirmandoExclusao(true)}>
                  <Text variant="sm" weight="bold" color={theme.colors.error}>
                    Excluir
                  </Text>
                </Pressable>
              </View>

              {confirmandoExclusao && (
                <View style={styles.deleteConfirm}>
                  <Text variant="sm" weight="medium" color={theme.colors.error}>
                    Excluir esta memória? Essa ação não pode ser desfeita.
                  </Text>
                  <View style={styles.deleteActions}>
                    <Pressable style={styles.deleteConfirmButton} onPress={confirmarExclusao}>
                      <Text variant="xs" weight="bold" color="inverse">
                        Confirmar exclusão
                      </Text>
                    </Pressable>
                    <Pressable
                      style={styles.deleteCancelButton}
                      onPress={() => setConfirmandoExclusao(false)}
                    >
                      <Text variant="xs" weight="bold">
                        Cancelar
                      </Text>
                    </Pressable>
                  </View>
                </View>
              )}
            </>
          ) : (
            <View style={styles.editForm}>
              <Text variant="xs" weight="bold" style={styles.sectionLabel}>
                TIPO
              </Text>
              <View style={styles.chips}>
                {TIPOS.map((label) => (
                  <Chip key={label} label={label} selected={tipoEdit === label} onPress={() => setTipoEdit(label)} />
                ))}
              </View>

              <Text variant="xs" weight="bold" style={styles.sectionLabel}>
                SENTIMENTO
              </Text>
              <View style={styles.chips}>
                {EMOCOES.map((emoji) => (
                  <Pressable
                    key={emoji}
                    style={[styles.emocaoChip, emocaoEdit === emoji && styles.emocaoChipSelected]}
                    onPress={() => setEmocaoEdit(emoji)}
                  >
                    <Text style={styles.emocaoChipText}>{emoji}</Text>
                  </Pressable>
                ))}
              </View>

              <TextField
                placeholder="Observação"
                value={notaEdit}
                onChangeText={setNotaEdit}
                multiline
                numberOfLines={3}
                style={styles.textarea}
              />

              <View style={styles.editActions}>
                <Pressable style={styles.editCancel} onPress={() => setEditando(false)}>
                  <Text variant="sm" weight="bold">
                    Cancelar
                  </Text>
                </Pressable>
                <View style={styles.editSaveWrap}>
                  <Button variant="primary" onPress={salvarEdicao}>
                    Salvar
                  </Button>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  hero: {
    height: 280,
  },
  content: {
    padding: theme.spacing.xl,
  },
  eyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    marginTop: theme.spacing.sm,
  },
  nota: {
    marginTop: theme.spacing.sm,
  },
  emocao: {
    marginTop: theme.spacing.sm,
    fontSize: 22,
  },
  tags: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  tag: {
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: 14,
    backgroundColor: 'rgba(43,41,36,0.06)',
  },
  iaCard: {
    marginTop: theme.spacing.lg,
    borderRadius: theme.radius.card,
    padding: theme.cardPadding.max,
    backgroundColor: theme.colors.surfaceDark,
  },
  iaEyebrow: {
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  iaText: {
    marginTop: theme.spacing.xs,
  },
  actions: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  actionsSpacer: {
    flex: 1,
  },
  deleteConfirm: {
    marginTop: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(184,92,76,0.1)',
    padding: theme.cardPadding.max,
  },
  deleteActions: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  deleteConfirmButton: {
    flex: 1,
    height: 42,
    borderRadius: 21,
    backgroundColor: theme.colors.error,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteCancelButton: {
    flex: 1,
    height: 42,
    borderRadius: 21,
    borderWidth: 1.5,
    borderColor: 'rgba(43,41,36,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  editForm: {
    gap: theme.spacing.sm,
  },
  sectionLabel: {
    marginTop: theme.spacing.lg,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  chips: {
    marginTop: theme.spacing.sm,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.spacing.sm,
  },
  emocaoChip: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(43,41,36,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emocaoChipSelected: {
    backgroundColor: theme.colors.surfaceDark,
  },
  emocaoChipText: {
    fontSize: 18,
  },
  textarea: {
    marginTop: theme.spacing.lg,
    height: 90,
    paddingTop: theme.spacing.md,
    textAlignVertical: 'top',
  },
  editActions: {
    marginTop: theme.spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  editCancel: {
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
  },
  editSaveWrap: {
    flex: 1,
  },
  empty: {
    marginTop: theme.spacing.xxl,
    textAlign: 'center',
  },
});
