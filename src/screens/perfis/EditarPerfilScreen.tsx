import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Chip } from '../../components/ui/Chip';
import { ImagePlaceholder } from '../../components/ui/ImagePlaceholder';
import { Screen } from '../../components/ui/Screen';
import { Switch } from '../../components/ui/Switch';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { Toast, useToast } from '../../components/ui/Toast';
import { BackIcon } from '../../components/ui/icons';
import { RootStackParamList } from '../../navigation/types';
import { theme } from '../../theme';
import { UserPrivacidade, useUserStore } from '../../store/useUserStore';

type Props = NativeStackScreenProps<RootStackParamList, 'EditarPerfil'>;

const MODALIDADES = ['Salto', 'Adestramento', 'Enduro', 'Volteio', 'Passeio', 'Vaquejada'];
const NIVEIS = ['Iniciante', 'Intermediário', 'Avançado'];

const PRIVACIDADE_LABELS: { key: keyof UserPrivacidade; label: string }[] = [
  { key: 'publica', label: 'Conta pública' },
  { key: 'ocultarCidade', label: 'Ocultar cidade' },
  { key: 'ocultarStats', label: 'Ocultar estatísticas' },
  { key: 'permitirMsg', label: 'Permitir mensagens' },
  { key: 'permitirMarcacoes', label: 'Permitir marcações' },
];

export function EditarPerfilScreen({ navigation }: Props) {
  const profile = useUserStore((state) => state.profile);
  const privacidade = useUserStore((state) => state.privacidade);
  const setProfile = useUserStore((state) => state.setProfile);
  const setPrivacidade = useUserStore((state) => state.setPrivacidade);

  const [nome, setNome] = useState(profile.nome);
  const [cidade, setCidade] = useState(profile.cidade);
  const [estado, setEstado] = useState(profile.estado);
  const [bio, setBio] = useState(profile.bio);
  const [modalidade, setModalidade] = useState(profile.modalidadePrincipal);
  const [nivel, setNivel] = useState(profile.nivel);
  const { message, show } = useToast();

  function handleSalvar() {
    setProfile({ nome, cidade, estado, bio, modalidadePrincipal: modalidade, nivel });
    show('Perfil atualizado!');
    navigation.navigate('Perfis');
  }

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text variant="xxl" weight="extraBold">
          Editar perfil
        </Text>

        <View style={styles.avatarRow}>
          <ImagePlaceholder caption="foto" style={styles.avatar} />
          <Text variant="sm" weight="bold" color={theme.colors.accent.leather}>
            Trocar foto
          </Text>
        </View>

        <View style={styles.fields}>
          <TextField placeholder="Nome" value={nome} onChangeText={setNome} />
          <View style={styles.row}>
            <TextField placeholder="Cidade" value={cidade} onChangeText={setCidade} style={styles.flex1} />
            <TextField placeholder="Estado" value={estado} onChangeText={setEstado} style={styles.stateField} />
          </View>
          <TextField
            placeholder="Biografia"
            value={bio}
            onChangeText={setBio}
            multiline
            numberOfLines={3}
            style={styles.textarea}
          />
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          MODALIDADE PRINCIPAL
        </Text>
        <View style={styles.chips}>
          {MODALIDADES.map((label) => (
            <Chip key={label} label={label} selected={modalidade === label} onPress={() => setModalidade(label)} />
          ))}
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          NÍVEL DE EXPERIÊNCIA
        </Text>
        <View style={styles.chips}>
          {NIVEIS.map((label) => (
            <Chip key={label} label={label} selected={nivel === label} onPress={() => setNivel(label)} />
          ))}
        </View>

        <Text variant="xs" weight="bold" style={styles.sectionLabel}>
          PRIVACIDADE
        </Text>
        <View style={styles.toggles}>
          {PRIVACIDADE_LABELS.map((item) => (
            <View key={item.key} style={styles.toggleRow}>
              <Text variant="sm" weight="bold" style={styles.toggleLabel}>
                {item.label}
              </Text>
              <Switch
                value={privacidade[item.key]}
                onValueChange={(value) => setPrivacidade(item.key, value)}
              />
            </View>
          ))}
        </View>

        <Pressable style={styles.submit} onPress={handleSalvar}>
          <Text variant="lg" weight="extraBold">
            Salvar alterações
          </Text>
        </Pressable>
      </ScrollView>

      <Pressable style={styles.backButton} onPress={() => navigation.navigate('Perfis')} hitSlop={8}>
        <BackIcon />
      </Pressable>
      <Toast message={message} />
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
  avatarRow: {
    marginTop: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.lg,
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
  },
  fields: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: theme.spacing.sm,
  },
  flex1: {
    flex: 1,
  },
  stateField: {
    width: 80,
  },
  textarea: {
    height: 90,
    paddingTop: theme.spacing.md,
    textAlignVertical: 'top',
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
  toggles: {
    marginTop: theme.spacing.sm,
    gap: theme.spacing.md,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  toggleLabel: {
    flex: 1,
  },
  submit: {
    marginTop: theme.spacing.xl,
    height: 56,
    borderRadius: 28,
    backgroundColor: theme.colors.accent.gold,
    alignItems: 'center',
    justifyContent: 'center',
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
