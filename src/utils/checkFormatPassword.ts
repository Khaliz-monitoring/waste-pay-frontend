/**
 * Minimum eight characters, at least one letter and one number:
 */
export const validPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

/**
 * check password is valid
 * @param password
 * @returns
 */
export const checkValidPassword = (password: string) => {
   return validPasswordRegex.test(password);
};
