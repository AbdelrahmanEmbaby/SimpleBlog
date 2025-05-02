import {
    isEmail,
    isInternationalName,
    isLengthAtLeast,
    isLengthAtMost,
    hasNumber,
    hasUpperCase,
    hasLowerCase,
    hasSpecialChar,
} from "./regex.util";

import { PASSWORD_MIN_LENGTH } from "../config/constants.config";

export const validateEmail = (email) => {
    const result = {
        isValid: false,
        messages: []
    }

    !isEmail(email) && result.messages.push("Invalid email address.");

    result.isValid = result.messages.length === 0;
    return result;
};

export const validateName = (name) => {
    const result = {
        isValid: false,
        messages: []
    }

    !isLengthAtLeast(name, 2) && result.messages.push("Name must be at least 2 characters long.");
    !isLengthAtMost(name, 100) && result.messages.push("Name must be at most 100 characters long.");
    !isInternationalName(name) && result.messages.push("Name must contain only letters, spaces, hyphens, and apostrophes.");

    result.isValid = result.messages.length === 0;
    return result;
}

export const validatePassword = (password) => {
    const result = {
        isValid: false,
        messages: []
    }

    !isLengthAtLeast(password, PASSWORD_MIN_LENGTH) && result.messages.push(`Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`);
    !hasNumber(password) && result.messages.push("Password must contain at least one number.");
    !hasUpperCase(password) && result.messages.push("Password must contain at least one uppercase letter.");
    !hasLowerCase(password) && result.messages.push("Password must contain at least one lowercase letter.");
    !hasSpecialChar(password) && result.messages.push("Password must contain at least one special character.");

    result.isValid = result.messages.length === 0;
    return result;
}

export const validateConfirmPassword = (password, confirmPassword) => {
    const result = {
        isValid: false,
        messages: []
    }

    !(password === confirmPassword) && result.messages.push("Passwords do not match.");

    result.isValid = result.messages.length === 0;
    return result;
}

export const isImage = (file) => {
    if (!file || !file.type) return false;

    const imageMimeTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp'
    ];

    return imageMimeTypes.includes(file.type.toLowerCase());
};