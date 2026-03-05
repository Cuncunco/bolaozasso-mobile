import { HStack } from 'native-base';
import CountryFlag from "react-native-country-flag";

import { Input } from './Input';

interface Props {
  code: string;
  position: 'left' | 'right';
  onChangeText: (value: string) => void;
  isDisabled?: boolean;
}

export function Team({ code, position, onChangeText }: Props) {
  return (
    <HStack alignItems="center">
      {position === 'left' && (
        <CountryFlag
          isoCode={code}
          size={40} // 🔥 bandeira maior (antes era 25)
          style={{ marginRight: 12 }}
        />
      )}

      <Input
        w={12} // 🔥 um pouco maior
        h={10}
        textAlign="center"
        fontSize="sm"
        keyboardType="numeric"
        onChangeText={onChangeText}
        borderWidth={2}          // 🔥 borda visível
        borderColor="gray.500"   // 🔥 cor da borda
        bg="gray.900"            // 🔥 fundo para destacar
        _focus={{
          borderColor: "yellow.500"
        }}
      />

      {position === 'right' && (
        <CountryFlag
          isoCode={code}
          size={40} // 🔥 bandeira maior
          style={{ marginLeft: 12 }}
        />
      )}
    </HStack>
  );
}