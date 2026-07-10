import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useState } from 'react';
import { TourOverlay, TourStep } from '../../components/onboarding/TourOverlay';
import { Screen } from '../../components/ui/Screen';
import { RootStackParamList } from '../../navigation/types';
import { useUserStore } from '../../store/useUserStore';

type Props = NativeStackScreenProps<RootStackParamList, 'TourInteligente'>;

const PASSOS: TourStep[] = [
  {
    caption: 'destaque · diário de memórias',
    title: 'Registre cada momento',
    text: 'Fotos, treinos e conquistas viram memórias guardadas para sempre.',
  },
  {
    caption: 'destaque · comunidade',
    title: 'Conecte-se com outros cavaleiros',
    text: 'Compartilhe sua jornada com pessoas que também amam cavalos.',
  },
  {
    caption: 'destaque · saúde do cavalo',
    title: 'Acompanhe a saúde e o bem-estar',
    text: 'Vacinas, check-ups e cuidados sempre à mão.',
  },
  {
    caption: 'destaque · carta da IA',
    title: 'Receba cartas escritas pelo seu cavalo',
    text: 'A IA transforma seus registros em histórias emocionantes.',
  },
  {
    caption: 'destaque · conquistas',
    title: 'Evolua junto com seu cavalo',
    text: 'Selos, sequências e desafios tornam a jornada ainda mais especial.',
  },
];

export function TourInteligenteScreen({ navigation }: Props) {
  const setTourConcluido = useUserStore((state) => state.setTourConcluido);
  const [index, setIndex] = useState(0);

  function irParaCheckin() {
    setTourConcluido(true);
    navigation.navigate('PrimeiroCheckin');
  }

  return (
    <Screen padded={false}>
      <TourOverlay
        steps={PASSOS}
        index={index}
        onNext={() => setIndex((current) => Math.min(current + 1, PASSOS.length - 1))}
        onDotPress={setIndex}
        onFinish={irParaCheckin}
        onSkip={irParaCheckin}
      />
    </Screen>
  );
}
