import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/ui/Button';
import { Checkbox } from '../../components/ui/Checkbox';
import { LegalSheet } from '../../components/ui/LegalSheet';
import { Screen } from '../../components/ui/Screen';
import { Text } from '../../components/ui/Text';
import { TextField } from '../../components/ui/TextField';
import { theme } from '../../theme';
import { getPasswordStrength } from '../../utils/passwordStrength';
import { RootStackParamList } from '../../navigation/types';
import { useAuthStore } from '../../store/useAuthStore';

type Props = NativeStackScreenProps<RootStackParamList, 'Cadastro'>;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function CadastroScreen({ navigation }: Props) {
  const login = useAuthStore((state) => state.login);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [emailTouched, setEmailTouched] = useState(false);
  const [senha, setSenha] = useState('');
  const [confirmar, setConfirmar] = useState('');
  const [confirmarTouched, setConfirmarTouched] = useState(false);
  const [aceiteTermos, setAceiteTermos] = useState(false);
  const [aceitePrivacidade, setAceitePrivacidade] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [showTermosModal, setShowTermosModal] = useState(false);
  const [showPrivacidadeModal, setShowPrivacidadeModal] = useState(false);

  const emailValid = EMAIL_REGEX.test(email);
  const nomeErro = submitAttempted && nome.trim() === '';
  const emailErro = (emailTouched || submitAttempted) && !emailValid;
  const confirmarErro = (confirmarTouched || submitAttempted) && confirmar !== senha;
  const strength = getPasswordStrength(senha);
  const cadastroValido =
    nome.trim() !== '' &&
    emailValid &&
    senha.length >= 6 &&
    confirmar === senha &&
    aceiteTermos &&
    aceitePrivacidade;

  function tentarCriarConta() {
    setSubmitAttempted(true);
    if (!cadastroValido) return;
    login('email');
    navigation.navigate('CriarPerfil');
  }

  return (
    <Screen style={styles.screen} padded={false}>
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <Text variant="xxl" weight="extraBold">
          Criar conta
        </Text>
        <Text variant="md" weight="medium" color="secondary" style={styles.subtitle}>
          Leva menos de um minuto.
        </Text>

        <View style={styles.fields}>
          <TextField
            placeholder="Nome completo"
            value={nome}
            onChangeText={setNome}
            error={nomeErro ? 'Conte pra gente seu nome completo' : undefined}
          />
          <TextField
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            onBlur={() => setEmailTouched(true)}
            autoCapitalize="none"
            keyboardType="email-address"
            error={emailErro ? 'Verifique o formato do email' : undefined}
          />
          <View>
            <TextField
              placeholder="Senha"
              value={senha}
              onChangeText={setSenha}
              secureTextEntry
            />
            <View style={styles.strengthTrack}>
              <View
                style={[
                  styles.strengthFill,
                  { width: `${strength.widthPercent}%`, backgroundColor: strength.color },
                ]}
              />
            </View>
            <Text variant="xs" weight="semiBold" color="secondary" style={styles.strengthLabel}>
              {strength.label}
            </Text>
          </View>
          <TextField
            placeholder="Confirmar senha"
            value={confirmar}
            onChangeText={setConfirmar}
            onBlur={() => setConfirmarTouched(true)}
            secureTextEntry
            error={confirmarErro ? 'As senhas não coincidem' : undefined}
          />
        </View>

        <View style={styles.checkboxes}>
          <Checkbox checked={aceiteTermos} onToggle={() => setAceiteTermos((v) => !v)}>
            Aceito os{' '}
            <Text
              variant="sm"
              weight="bold"
              color={theme.colors.accent.leather}
              style={styles.link}
              onPress={() => setShowTermosModal(true)}
            >
              Termos de Uso
            </Text>
          </Checkbox>
          <Checkbox checked={aceitePrivacidade} onToggle={() => setAceitePrivacidade((v) => !v)}>
            Aceito a{' '}
            <Text
              variant="sm"
              weight="bold"
              color={theme.colors.accent.leather}
              style={styles.link}
              onPress={() => setShowPrivacidadeModal(true)}
            >
              Política de Privacidade
            </Text>
          </Checkbox>
        </View>

        {submitAttempted && !cadastroValido && (
          <View style={styles.errorBanner}>
            <Text variant="sm" weight="semiBold" color={theme.colors.error}>
              Revise os campos destacados e aceite os termos para continuar.
            </Text>
          </View>
        )}

        <View style={styles.spacer} />

        <Button variant="primary" onPress={tentarCriarConta}>
          Criar conta
        </Button>
      </ScrollView>

      <LegalSheet visible={showTermosModal} title="Termos de Uso" onClose={() => setShowTermosModal(false)}>
        Ao usar o EquiSoul, você concorda em manter registros verdadeiros sobre você e seu cavalo,
        respeitar outros membros da comunidade e utilizar a IA apenas como apoio — nunca como
        substituta de cuidado veterinário profissional. O conteúdo que você publica permanece seu;
        compartilhamos apenas o que você autorizar.
      </LegalSheet>

      <LegalSheet
        visible={showPrivacidadeModal}
        title="Política de Privacidade"
        onClose={() => setShowPrivacidadeModal(false)}
      >
        Suas memórias pertencem a você. Você escolhe o que é público, privado ou visível só para
        seguidores. Dados de saúde do seu cavalo nunca são compartilhados sem sua autorização
        explícita, mesmo com profissionais conectados na plataforma.
      </LegalSheet>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.xl,
    paddingTop: theme.spacing.xxl,
    paddingBottom: theme.spacing.xl,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
  },
  fields: {
    marginTop: theme.spacing.xl,
    gap: theme.spacing.md,
  },
  strengthTrack: {
    marginTop: theme.spacing.sm,
    height: 4,
    borderRadius: 2,
    backgroundColor: 'rgba(43,41,36,0.08)',
  },
  strengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  strengthLabel: {
    marginTop: theme.spacing.xs,
  },
  checkboxes: {
    marginTop: theme.spacing.lg,
    gap: theme.spacing.md,
  },
  link: {
    textDecorationLine: 'underline',
  },
  errorBanner: {
    marginTop: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.radius.card,
    backgroundColor: 'rgba(184,92,76,0.1)',
  },
  spacer: {
    flex: 1,
    minHeight: theme.spacing.lg,
  },
});
