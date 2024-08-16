export function maskedString(str: string) {
  let prefix: string;
  let suffix: string;
  if (str.includes("@")) {
    const string = str.split("@");
    prefix = string[0].substring(0, 2);
    suffix = `@${string[1]}`;
  } else {
    prefix = str.substring(0, 2);
    suffix = str.slice(-4);
  }

  return `${prefix}***${suffix}`;
}
