export const capitalizeFirstChar = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export function containsSpecialChars(str) {
    const specialCharPattern = /[^a-zA-Z0-9 ]/;
    return specialCharPattern.test(str);
};
