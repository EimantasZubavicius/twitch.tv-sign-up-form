import { useState } from "react";

import { FieldValidator, FieldState } from "../contracts";

export function useField<TValue>(initialValue: TValue, validation: FieldValidator<TValue>): [FieldState<TValue>, (value: TValue) => void] {
    const [field, setField] = useState<FieldState<TValue>>({ value: initialValue, error: validation(initialValue) });

    const fieldSetter = (nextValue: TValue): void => {
        setField(prevState => ({
            ...prevState,
            error: validation(nextValue),
            value: nextValue
        }));
    };

    return [field, fieldSetter];
}
