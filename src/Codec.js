const _encodings = new Map([
  ['UTF8', Symbol.for('UTF-8')],
  ['UTF16LE', Symbol.for('UTF-16LE')],
  ['UTF16BE', Symbol.for('UTF-16BE')],
  ['UTF32LE', Symbol.for('UTF-32LE')],
  ['UTF32BE', Symbol.for('UTF-32BE')]
]);

class Codec {
  constructor(encoding = _encodings.get('UTF8')) {
    this.encoding = encoding;
  }

  setEncoding(encoding) {
    this.encoding = Symbol.for(encoding);
  }

  encode() {
    return 'a';
  }

  decode() {
    return 'b';
  }

  static encodings() {
    return _encodings;
  }
}

export default Codec;