import type { NumberFormatValues, NumericFormatProps } from 'react-number-format';
import type { AppTextFieldProps } from '@/components/TextField/type';

export type NumberFormatProps = Omit<
   NumericFormatProps,
   'onChange' | 'fixedDecimalScale' | 'thousandSeparator' | 'type'
>;

export type TextFieldProps = Pick<
   AppTextFieldProps,
   | 'name'
   | 'label'
   | 'required'
   | 'error'
   | 'helperText'
   | 'InputProps'
   | 'generateCode'
   | 'onGenerateCode'
   | 'disabled'
   | 'loading'
   | 'sx'
   | 'inputRef'
   | 'type'
>;

export interface AppNumberFieldProps extends NumberFormatProps, TextFieldProps {
   onChange(values: NumberFormatValues): void;
   fixedDecimalScale?: boolean | number;
   thousandSeparator?: boolean | string;
   onPressEnter?(): void;
   debounceDelay?: number;
   isDecimalScale?: boolean;
}
