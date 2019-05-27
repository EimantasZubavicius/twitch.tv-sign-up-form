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

export type FormSubmitHandler = () => Promise<FormsError | undefined | false>;

export interface FormsError {
    message: string;
}

export interface FormState {
    submitClicked: boolean;
    pendingSubmit: boolean;
    error?: FormsError;
}

export interface Form {
    state: FormState;
    resetError: () => void;
    submit: () => void;
}
