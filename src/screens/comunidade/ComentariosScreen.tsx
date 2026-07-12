import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { CloseIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useCommunityStore } from '../../store/useCommunityStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Comentarios'>;

export function ComentariosScreen({ navigation, route }: Props) {
  const posts = useCommunityStore((state) => state.posts);
  const addComentario = useCommunityStore((state) => state.addComentario);
  const [input, setInput] = useState('');

  const post = posts.find((item) => item.id === route.params.postId) ?? posts[0];

  function enviar() {
    const texto = input.trim();
    if (!texto || !post) return;
    addComentario(post.id, texto);
    setInput('');
  }

  return (
    <Screen style={styles.screen} padded={false}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <Pressable style={styles.closeButton} onPress={() => navigation.navigate('Comunidade')} hitSlop={8}>
            <CloseIcon color={theme.colors.text.primary} />
          </Pressable>
          <Text variant="xl" weight="extraBold">
            Comentários
          </Text>
        </View>

        {!post || post.comentarios.length === 0 ? (
          <View style={styles.empty}>
            <Text variant="lg" weight="bold">
              Nenhum comentário ainda
            </Text>
            <Text variant="sm" weight="medium" color="secondary" style={styles.emptyText}>
              Seja o primeiro a comentar.
            </Text>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.list}>
            {post.comentarios.map((comentario) => (
              <View key={comentario.id} style={styles.item}>
                <View style={styles.avatar} />
                <View style={styles.itemText}>
                  <Text variant="sm" weight="bold">
                    {comentario.nome}{' '}
                    <Text variant="sm" weight="medium">
                      {comentario.texto}
                    </Text>
                  </Text>
                  <View style={styles.itemActions}>
                    <Text variant="xs" weight="semiBold" color="secondary">
                      {comentario.tempo}
                    </Text>
                    <Text variant="xs" weight="semiBold" color="secondary">
                      Curtir
                    </Text>
                    <Text variant="xs" weight="semiBold" color="secondary">
                      Responder
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        <View style={styles.inputRow}>
          <TextField
            value={input}
            onChangeText={setInput}
            placeholder="Adicionar um comentário..."
            onSubmitEditing={enviar}
            style={styles.input}
          />
          <Pressable onPress={enviar}>
            <Text variant="sm" weight="extraBold" color={theme.colors.accent.leather}>
              Enviar
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  header: {
    paddingHorizontal: theme.spacing.xl,
    paddingBottom: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(43,41,36,0.06)',
  },
  closeButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(43,41,36,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: theme.spacing.sm,
    paddingHorizontal: theme.spacing.xl,
  },
  emptyText: {
    textAlign: 'center',
  },
  list: {
    padding: theme.spacing.xl,
    gap: theme.spacing.lg,
  },
  item: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: theme.colors.placeholder.background,
  },
  itemText: {
    flex: 1,
    minWidth: 0,
  },
  itemActions: {
    marginTop: theme.spacing.xs,
    flexDirection: 'row',
    gap: theme.spacing.md,
  },
  inputRow: {
    padding: theme.spacing.lg,
    paddingBottom: theme.spacing.xl,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.sm,
  },
  input: {
    flex: 1,
    height: 48,
    borderRadius: 24,
  },
});
