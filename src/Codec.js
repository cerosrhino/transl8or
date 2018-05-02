const _encodings = [
  'UTF-8',
  'UTF-16LE',
  'UTF-16BE',
  'UTF-32LE',
  'UTF-32BE'
];

class Codec {
  constructor(encoding = 'UTF-8') {
    this.setEncoding(encoding);
  }

  setEncoding(encoding) {
    if (_encodings.indexOf(encoding) === -1) {
      throw new Error('Unknown encoding');
    }
    this.encoding = encoding;
  }

  encode(text) {
    switch (this.encoding) {
      case 'UTF-8':
        return encodeURIComponent(text).replace(
          /%([0-9a-f]{2})/gi,
          (_, match) => String.fromCharCode(parseInt(match, 16))
        ).split('');
      case 'UTF-16LE':
        return this.encodeUTF16(text, true);
      case 'UTF-16BE':
        return this.encodeUTF16(text, false);
      case 'UTF-32LE':
        return this.encodeUTF32(text, true);
      case 'UTF-32BE':
        return this.encodeUTF32(text, false);
      default:
        throw new Error('Unknown encoding');
    }
  }

  decode(data) {
    switch (this.encoding) {
      case 'UTF-8':
        return decodeURIComponent(
          '%' + data.map(
            el => el.charCodeAt(0).toString(16).padStart(2, '0')
          ).join('%')
        );
      case 'UTF-16LE':
        return this.decodeUTF16(data, true);
      case 'UTF-16BE':
        return this.decodeUTF16(data, false);
      case 'UTF-32LE':
        return this.decodeUTF32(data, true);
      case 'UTF-32BE':
        return this.decodeUTF32(data, false);
      default:
        throw new Error('Unknown encoding');
    }
  }

  encodeUTF16(text, littleEndian) {
    const arrayFunc = littleEndian ?
                        Array.prototype.push :
                        Array.prototype.unshift;
    
    let characters = text.split('').map(el => {
      let charCode = el.charCodeAt(0);
      let chunk = [];
      arrayFunc.call(chunk, String.fromCharCode(charCode & 0xff));
      arrayFunc.call(chunk, String.fromCharCode((charCode >>> 8) & 0xff));
      return chunk;
    });

    return Array.prototype.concat.apply([], characters);
  }

  splitByCodePoints(text) {
    return [...text];
  }

  encodeUTF32(text, littleEndian) {
    const arrayFunc = littleEndian ?
                        Array.prototype.push :
                        Array.prototype.unshift;
    
    let characters = this.splitByCodePoints(text).map(el => {
      let codePoint = el.codePointAt(0);
      let chunk = [];
      for (let i = 0; i < 4; i++) {
        arrayFunc.call(chunk, String.fromCharCode(codePoint & 0xff));
        codePoint >>>= 8;
      }
      return chunk;
    });

    return Array.prototype.concat.apply([], characters);
  }

  decodeUTF16(data, littleEndian) {
    if (data.length % 2 !== 0) {
      throw new Error('Wrong data chunk size');
    }

    let string = '';
    for (let i = 0; i < data.length; i += 2) {
      let charCode;
      if (littleEndian) {
        charCode = (data[i].charCodeAt(0)) | (data[i + 1].charCodeAt(0) << 8);
      } else {
        charCode = (data[i].charCodeAt(0) << 8) | (data[i + 1].charCodeAt(0));
      }
      string += String.fromCharCode(charCode);
    }

    return string;
  }

  decodeUTF32(data, littleEndian) {
    if (data.length % 4 !== 0) {
      throw new Error('Wrong data chunk size');
    }

    let string = '';
    for (let i = 0; i < data.length; i += 4) {
      let codePoint;
      if (littleEndian) {
        codePoint =
          (data[i].charCodeAt(0)) |
          (data[i + 1].charCodeAt(0) << 8) |
          (data[i + 2].charCodeAt(0) << 16) |
          (data[i + 3].charCodeAt(0) << 24);
      } else {
        codePoint =
          (data[i].charCodeAt(0) << 24) |
          (data[i + 1].charCodeAt(0) << 16) |
          (data[i + 2].charCodeAt(0) << 8) |
          (data[i + 3].charCodeAt(0));
      }
      string += String.fromCodePoint(codePoint);
    }
    
    return string;
  }

  static encodings() {
    return [..._encodings];
  }
}

export default Codec;