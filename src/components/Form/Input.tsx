import { forwardRef, ForwardedRef } from 'react';
import { FieldError } from 'react-hook-form';
import {
  FormControl,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormErrorMessage,
} from '@chakra-ui/react';

interface InputProps extends ChakraInputProps {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase = (
  { name, label, error, ...rest }: InputProps,
  ref: ForwardedRef<HTMLInputElement>
) => {
  return (
    <FormControl isInvalid={Boolean(error)}>
      {label && (
        <FormLabel id={`${name}-form-label`} htmlFor={name}>
          {label}
        </FormLabel>
      )}
      <ChakraInput
        name={name}
        id={name}
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bg: 'gray.900',
        }}
        size="lg"
        ref={ref}
        {...rest}
      />

      {error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
