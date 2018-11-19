import { PasswordStrength } from "../contracts/password-strength";
import { FieldStatus } from "../contracts/field-status";

export const MONTHS_LENGTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
export const LEAP_YEAR_MONTHS_LENGTH = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const SPECIAL_CHARACTERS_REGEX = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
const EMAIL_PATTERN_REGEX = /\S+@\S+\.\S+/;

export function hasUpperCase(value: string): boolean {
    return /[A-Z]/.test(value);
}

export function hasLowerCase(value: string): boolean {
    return /[a-z]/.test(value);
}

export function hasNumbers(value: string): boolean {
    return /[0-9]/.test(value);
}

export function hasSpecialCharacters(value: string): boolean {
    return SPECIAL_CHARACTERS_REGEX.test(value);
}

export function isMonthValid(value: string): FieldStatus {
    const month = parseInt(value);

    if (month !== 0) {
        if (month >= 1 && month <= 12) {
            return FieldStatus.Correct;
        } else {
            return FieldStatus.Incorrect;
        }
    } else {
        return FieldStatus.Initialized;
    }
}

export function isDayValid(dayValue: string, monthValue: string, yearValue: string): FieldStatus {
    const month = parseInt(monthValue);
    const day = parseInt(dayValue);
    const year = parseInt(yearValue);
    let MONTHS;

    if (year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0)) {
        MONTHS = LEAP_YEAR_MONTHS_LENGTH;
    } else {
        MONTHS = MONTHS_LENGTH;
    }
    if (dayValue.length !== 0) {
        if (!isNaN(day) && day <= MONTHS[month - 1] && day > 0) {
            return FieldStatus.Correct;
        } else {
            return FieldStatus.Incorrect;
        }
    } else {
        return FieldStatus.Initialized;
    }
}

export function isYearValid(value: string): FieldStatus {
    const year = parseInt(value);

    if (value.length !== 0) {
        if (!isNaN(year) && year > 1903 && year < 2019) {
            return FieldStatus.Correct;
        } else {
            return FieldStatus.Incorrect;
        }
    } else {
        return FieldStatus.Initialized;
    }
}

export function isEmailValid(value: string): FieldStatus {
    if (value.length !== 0) {
        if (EMAIL_PATTERN_REGEX.test(value)) {
            return FieldStatus.Correct;
        } else {
            return FieldStatus.Incorrect;
        }
    } else {
        return FieldStatus.Initialized;
    }
}

export function isUsernameOrPasswordValid(value: string, letterCount: number): FieldStatus {
    if (value.length === 0) {
        return FieldStatus.Initialized;
    } else {
        if (value.length > letterCount) {
            return FieldStatus.Correct;
        } else {
            return FieldStatus.Incorrect;
        }
    }
}

export function getPasswordStrength(password: string): PasswordStrength {
    const passwordLength = password.length;

    if (passwordLength === 0) {
        return PasswordStrength.Empty;
    } else if (passwordLength > 8 && passwordLength < 12) {
        if (hasUpperCase(password) && hasLowerCase(password) && hasNumbers(password)) {
            return PasswordStrength.Weak;
        }
        return PasswordStrength.VeryWeak;
    } else if (passwordLength >= 12) {
        if (hasUpperCase(password) && hasLowerCase(password) && hasNumbers(password) && hasSpecialCharacters(password)) {
            return PasswordStrength.VeryStrong;
        }
        return PasswordStrength.Strong;
    } else {
        return PasswordStrength.Bad;
    }
}
