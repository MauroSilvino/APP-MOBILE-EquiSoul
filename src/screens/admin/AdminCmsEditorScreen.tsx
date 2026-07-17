import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';
import { AdminScreen } from '../../components/admin/AdminScreen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { useAdminStore } from '../../store/useAdminStore';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminCmsEditor'>;

export function AdminCmsEditorScreen({ navigation, route }: Props) {
  const { id } = route.params;
  const cmsList = useAdminStore((s) => s.cmsList);
  const setCmsContent = useAdminStore((s) => s.setCmsContent);
  const item = cmsList.find((c) => c.id === id) ?? cmsList[0];
  const [titulo, setTitulo] = useState(item.titulo);
  const [conteudo, setConteudo] = useState(item.conteudo);

  function handleSalvar() {
    setCmsContent(item.id, titulo, conteudo);
    navigation.navigate('AdminCMS');
  }

  return (
    <AdminScreen
      title={`Editar ${item.label}`}
      activeRoute="AdminCMS"
      onBack={() => navigation.goBack()}
      onNavigateModule={(route2) => navigation.navigate(route2)}
      onNavigateUsuario={(uid) => navigation.navigate('AdminUsuarioDetalhe', { id: uid })}
      onNavigateCavalo={(cid) => navigation.navigate('AdminCavaloDetalhe', { id: cid })}
      onNavigateChamado={(chid) => navigation.navigate('AdminChamadoDetalhe', { id: chid })}
    >
      <Text variant="xs" weight="bold" style={styles.fieldLabel}>
        TÍTULO
      </Text>
      <TextField value={titulo} onChangeText={setTitulo} style={styles.input} />

      <Text variant="xs" weight="bold" style={styles.fieldLabel}>
        CONTEÚDO
      </Text>
      <TextInput
        value={conteudo}
        onChangeText={setConteudo}
        placeholder="Escreva o conteúdo aqui…"
        multiline
        style={styles.textarea}
        placeholderTextColor={theme.colors.text.tertiary}
      />

      <Pressable style={styles.saveButton} onPress={handleSalvar}>
        <Text variant="sm" weight="extraBold" color={theme.colors.accent.gold}>
          Salvar alterações
        </Text>
      </Pressable>
    </AdminScreen>
  );
}

const styles = StyleSheet.create({
  fieldLabel: {
    marginTop: theme.spacing.lg,
    letterSpacing: 0.4,
  },
  input: {
    marginTop: theme.spacing.sm,
    height: 46,
  },
  textarea: {
    marginTop: theme.spacing.sm,
    width: '100%',
    height: 180,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'rgba(43,41,36,0.14)',
    padding: 12,
    fontSize: 12,
    color: theme.colors.text.primary,
    textAlignVertical: 'top',
  },
  saveButton: {
    marginTop: theme.spacing.xl,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.surfaceDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
