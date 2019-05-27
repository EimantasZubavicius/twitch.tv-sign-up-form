import { useState } from "react";

export interface FieldError {
    message: string;
}

export interface FieldState<TValue> {
    value: TValue;
    error?: FieldError;
}

export interface FieldValidator<TValue> {
    (value: TValue): FieldError | undefined;
}

export function useField<TValue>(
    initialValue: TValue,
    validation: FieldValidator<TValue>
): [FieldState<TValue>, (value: FieldState<TValue>) => void] {
    const [field, setField] = useState<FieldState<TValue>>({ value: initialValue, error: undefined });

    const fieldSetter = (fieldState: FieldState<TValue>): void => {
        const nextFieldState = {
            value: fieldState.value,
            error: validation(fieldState.value)
        };
        setField(nextFieldState);
    };
    return [field, fieldSetter];
}
