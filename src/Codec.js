const _encodings = [
  Symbol.for('UTF-8'),
  Symbol.for('UTF-16LE'),
  Symbol.for('UTF-16BE'),
  Symbol.for('UTF-32LE'),
  Symbol.for('UTF-32BE')
];

class Codec {
  constructor(encoding = Symbol.for('UTF-8')) {
    this.encoding = encoding;
  }

  setEncoding(encoding) {
    this.encoding = Symbol.for(encoding);
  }

  encode(text) {
    switch (Symbol.keyFor(this.encoding)) {
      case 'UTF-8':
        return encodeURIComponent(text).replace(
          /%([0-9a-f]{2})/gi,
          (_, match) => String.fromCharCode(parseInt(match, 16))
        ).split('');
        break;
      case 'UTF-16LE':
        break;
      case 'UTF-16BE':
        break;
      case 'UTF-32LE':
        break;
      case 'UTF-32BE':
        break;
    }
  }

  decode(data) {
    switch (Symbol.keyFor(this.encoding)) {
      case 'UTF-8':
        return decodeURIComponent(
          '%' + data.map(
            el => el.charCodeAt(0).toString(16).padStart(2, '0')
          ).join('%')
        );
        break;
    }
  }

  static encodings() {
    return _encodings;
  }
}

export default Codec;