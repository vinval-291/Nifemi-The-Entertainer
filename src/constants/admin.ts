export const ADMIN_EMAILS = [
  "kuteyioluwaloyevincent291@gmail.com",
  "vinvaldigital291@gmail.com"
];

export const isUserAdmin = (email: string | null | undefined) => {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
};
