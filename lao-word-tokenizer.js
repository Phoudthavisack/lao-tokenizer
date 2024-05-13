const laoWord = require("./laoWord.json");

function LaoTokenizer(text) {
  const words = [];
  for (const e of laoWord) {
    let _start = 0;
    for (;;) {
      const _in = text.indexOf(e, _start);
      if (_in >= 0) {
        words[_in] = [e, [_in, _in + e.length]];
        _start = _in + 1;
      } else {
        break;
      }
    }
  }
  const _formatWord = words.filter(() => true);
  var b = [];
  var c = [];
  const dataWrong = _formatWord.map((e) => e[1][1]);
  for (var i = 0; i < dataWrong.length; i++) {
    if (b.indexOf(dataWrong[i]) < 0) {
      b.push(dataWrong[i]);
    } else {
      c.push(dataWrong[i]);
      _formatWord[i] = undefined;
    }
  }
  const _forWord = _formatWord.filter((e) => e);
  for (var i = 0; i < _forWord.length; i++) {
    if (_forWord.length <= i + 1) {
      break;
    }
    if (
      _forWord[i][1][1] > _forWord[i + 1][1][0] &&
      _forWord[i][1][1] <= _forWord[i + 1][1][1]
    ) {
      const _number = _forWord[i][1][1] - _forWord[i + 1][1][0];
      const text = _forWord[i][0];
      const newText = text.substring(0, _forWord[i][0].length - _number);
      _forWord[i][0] = newText;
    }
  }
  return _forWord;
}

// use
let text = "ເຈົ້າຕັດຄຳໄດ້ ແຕ່ຕັດເຂົາອອກຈາກໃຈບໍ່ໄດ້";
console.log(LaoTokenizer(text).map((e) => e[0]));
console.log(LaoTokenizer(text));
