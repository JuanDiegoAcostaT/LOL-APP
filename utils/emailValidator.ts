export function validateEmail(email: string): boolean {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}
