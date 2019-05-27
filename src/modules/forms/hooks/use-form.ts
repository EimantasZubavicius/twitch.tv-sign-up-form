import { useState } from "react";
import { FormSubmitHandler, Form, FormState, FieldState } from "../contracts";

export function useForm(submit: FormSubmitHandler, fields: Array<FieldState<unknown>>): Form {
    const [state, setState] = useState<FormState>({
        submitClicked: false,
        pendingSubmit: false
    });

    const submitHandler = async () => {
        setState(prevState => ({ ...prevState, submitClicked: true }));

        const fieldError = fields.some(x => x.error != null);
        if (fieldError) {
            return;
        }

        setState(prevState => ({ ...prevState, pendingSubmit: true }));

        const response = await submit();
        if (response === false) {
            return;
        }

        setState(prevState => ({ ...prevState, error: response, pendingSubmit: false }));
    };

    const resetError = () => {
        setState(prevState => ({ ...prevState, error: undefined }));
    };

    return {
        submit: submitHandler,
        resetError: resetError,
        state: state
    };
}
