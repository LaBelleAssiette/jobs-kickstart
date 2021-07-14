export function convertUnicode(unicode) {
  let prefix = "0x";
  if (unicode) {
    let uri = prefix + unicode;
    let intValue = parseInt(uri);
    return  String.fromCodePoint(intValue);
  }
}