/*
 * @Author: your name
 * @Date: 2021-03-13 09:43:34
 * @LastEditTime: 2021-03-14 22:54:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \regI18n\server\reg.js
 */
var closeTagNoCapture = '(?:\\>)'; //匹配不捕获元素右标识 \>
var openTagNoCapture = '(?:\\<\\/)'; // 匹配不捕获元素左标识 \>
// \w 匹配字母或数字或下划线或汉字 等价于 '[^A-Za-z0-9_]'。
//punctuationSelfDefine这里需要的话可以自己添加，我只是添加本次需要用到的
var punctuationSelfDefine =
  "，,&%、!！{{}?？“”'':：‘’``（）()_ }>\\\\@\\-\\+\\/\\+\\s";
var onlyPunctuation = '[' + punctuationSelfDefine + ']*'; //匹配自定义标点符号
var numberPunctuationLetter = '[' + '\\dA-Za-z' + punctuationSelfDefine + ']*'; //匹配字母和自定义标点符号
var chineseCharAndJointMark = '[\\u4E00-\\u9FA5]+'; //匹配中文
var chieseNoQuation = //匹配标点符号加中文加标点符号
  '([' +
  punctuationSelfDefine +
  ']*[\\u4E00-\\u9FA5]+' +
  '[' +
  punctuationSelfDefine +
  ']*)+';
var chineseAndLetter = '(([\\w-\\s]*[\\u4E00-\\u9FA5]+[\\w-\\s]*)+)'; //匹配 字母、数字、下划线+中文+字母、数字、下划线
var chineseAndLetterWithQuation =
  '[\'"](([\\w-\\s]*[\\u4E00-\\u9FA5]+[\\w-\\s]*)+)[\'"]'; //匹配 字母、数字、下划线+中文+字母、数字、下划线
// var backquotewithChinese = '[`]' + chieseNoQuation + '[`]';
var backquoteContent = '[`](.*?)[`]'; //匹配捕获反向引号中的所有内容
var leftBacesMatchNoCapture = '(?:{{)'; //左双大括号匹配不捕获
var rightBacesMatchNoCapture = '(?:}})'; //右双大括号匹配不捕获
let quotations = new RegExp('^[\'"]|[\'"]$', 'gm'); // 以单/双引号开头
let withinQuotations = new RegExp('[\'"](.+?)[\'"]', 'gm'); //匹配引号中的任何内容
let textArea = globalThis.document && globalThis.document.querySelector('#aaa');
var fileContent = textArea && textArea.innerHTML;
fileContent && regExpExchange(fileContent, {}, {}, true);
function regExpExchange(fileContent, data, wordNotExist, testing) {
  // console.log(fileContent);
  var checkIfWordHaveTranslation = function (word) {
    return !!data[word];
  };
  // console.log(fileContent, testing);
  var wordsbetweenCloseStartTags = new RegExp(
    closeTagNoCapture +
      '((' +
      numberPunctuationLetter +
      chineseCharAndJointMark +
      numberPunctuationLetter +
      ')+)' +
      openTagNoCapture,
    'gm'
  );
  var quotationwithChinese = '["\'](' + chieseNoQuation + ')+["\']';
  var wordsbetweenCloseStartTagsMatch = wordsbetweenCloseStartTags.exec(
    fileContent
  );
  // return Array,
  // input：整个被查找的字符串的值；
  // index：匹配结果所在的位置（位）；
  // arr：结果值，arr[0]全匹配结果，arr[1,2...]为表达式内()的子匹配，由左至右为1,2...。
  while (wordsbetweenCloseStartTagsMatch) {
    fileContent = fileContent.replace(
      wordsbetweenCloseStartTagsMatch[1], //rr[1,2...]为表达式内()的子匹配
      (...args) => {
        var content = args[0];
        //获得尖括号内{{}}的内容，例如label="{a==1?'确定':'删除'}"
        var betweenBaces = new RegExp(
          leftBacesMatchNoCapture + '(.*)+' + rightBacesMatchNoCapture,
          'gm'
        );
        var betweenBacesMatch = betweenBaces.exec(content);
        while (betweenBacesMatch) {
          content = content.replace(betweenBacesMatch[1], (...args) => {
            // var sentences = new RegExp('(' + quotationwithChinese + ')', 'gm');
            let text = args[0].replace(withinQuotations, (...args) => {
              let quotationReplace = new RegExp('[,，？?!！]+', 'gm');
              // let quotationReplace = /[,，？?!！]+/g
              let text = args[0]
                .replace(quotations, '')
                .replace(new RegExp(chieseNoQuation, 'gm'), (arg) => {
                  let wordaftertranslate = arg.replace(
                    new RegExp(chineseAndLetter, 'gm'),
                    (word) => {
                      if (testing) return "$t('waitToChange')";
                      if (checkIfWordHaveTranslation(word))
                        return "$t('" + data[word] + "')";
                      else {
                        wordNotExist.add(word);
                        return word;
                      }
                    }
                  );
                  return wordaftertranslate;
                })
                .replace(quotationReplace, (arg) => {
                  return '`' + arg + '`';
                });
              return text;
            });
            return text;
          });
          betweenBacesMatch = betweenBaces.exec(content);
        }
        content = content.replace(
          new RegExp(chineseAndLetter, 'gm'),
          (word) => {
            word = word.replace(quotations, '');
            if (testing) return "{{$t('waitToChange')}}";
            if (checkIfWordHaveTranslation(word))
              return "{{$t('" + data[word] + "')}}";
            else {
              wordNotExist.add(word);
              return word;
            }
          }
        );
        return content;
      }
    );
    wordsbetweenCloseStartTagsMatch = wordsbetweenCloseStartTags.exec(
      fileContent
    );
    //匹配html标签元素内的属性
    var wordsAsPropertyInTags = new RegExp(
      '(?:(<[A-Z_a-z-]+\\s*))([\\w\\W]*?)(?:>)', //[\\w\\W]不能用.来代替，因为没有换行符回车符，会导致多行格式有问题
      'g'
    );
    var wordsAsPropertyInTagsMatch = wordsAsPropertyInTags.exec(fileContent);
    while (wordsAsPropertyInTagsMatch) {
      console.log(wordsAsPropertyInTagsMatch[0]);
      fileContent = fileContent.replace(
        wordsAsPropertyInTagsMatch[0],
        (...args) => {
          var text = args[0].replace(
            new RegExp(
              '(?:\\s*)([a-zA-Z-][0-9]*)+\\s*\\=\\s*' +
                '(?:["\'])' +
                chineseAndLetter +
                '(?:["\']\\s*)',
              'gm'
            ),
            (word) => {
              console.log(word);
              let wordExludesEmpty = word.replace(
                new RegExp(chineseAndLetter),
                (word) => {
                  if (testing) return "$t('waitToChange')";
                  if (checkIfWordHaveTranslation(word))
                    return "$t('" + data[word] + "')";
                  else {
                    wordNotExist.add(word);
                    return word;
                  }
                }
              );
              if (
                (a = !new RegExp(chineseAndLetter, 'gm').test(wordExludesEmpty))
              ) {
                wordExludesEmpty = wordExludesEmpty.replace(/(^\s*)/, '$1:');
              }
              return wordExludesEmpty;
            }
          );
          return text;
        }
      );
      wordsAsPropertyInTagsMatch = wordsAsPropertyInTags.exec(fileContent);
    }
  }

  var wordsOnRightEqual = /(?:([a-z_\-A-Z]+[0-9]*)+)\s*(\:|\=|\=\=|\=\=\=)\s*([\"']([\w-\s+]*[\u4E00-\uF9A5]+[\w-\s+]*)+?[\"'])/gm;
  var wordsOnRightEqualMatch = wordsOnRightEqual.exec(fileContent);
  while (wordsOnRightEqualMatch) {
    fileContent = fileContent.replace(wordsOnRightEqualMatch[0], (...args) => {
      let text = args[0].replace(
        new RegExp(chineseAndLetterWithQuation, 'gm'),
        (word) => {
          if (testing) return "this.$t('waitToChange')";
          let word1 = word.replace(quotations, '');
          if (checkIfWordHaveTranslation(word1)) {
            return "this.$t('" + data[word1] + "')";
          } else {
            wordNotExist.add(word1);
            return word;
          }
        }
      );
      return text;
    });
    wordsOnRightEqualMatch = wordsOnRightEqual.exec(fileContent);
  }

  var wordsIn$mMesage = new RegExp(
    '(?:(error|warning|succuess|message)\\()(.*)(?:\\))',
    'gm'
  );
  var wordsIn$mMesageMatch = wordsIn$mMesage.exec(fileContent);
  while (wordsIn$mMesageMatch) {
    fileContent = fileContent.replace(wordsIn$mMesageMatch[2], (...args) => {
      var text = args[0].replace(
        new RegExp(quotationwithChinese, 'gm'),
        (word) => {
          let word1 = word.replace(quotations, '');
          if (testing) return "this.$t('waitToChange')";
          if (checkIfWordHaveTranslation(word1)) {
            return "this.$t('" + data[word1] + "')";
          } else {
            wordNotExist.add(word1);
            return word;
          }
        }
      );
      text = text.replace(new RegExp(backquoteContent, 'gm'), (arg) => {
        var arg = arg.replace(new RegExp(chineseAndLetter, 'gm'), (word) => {
          let word1 = word.replace(quotations, '');
          if (testing) return '${this.$(this.show)}';
          if (checkIfWordHaveTranslation(word1)) {
            return "${$t('" + data[word1] + "')}";
          } else {
            wordNotExist.add(word1);
            return word;
          }
        });
        return arg;
      });
      return text;
    });
    wordsIn$mMesageMatch = wordsIn$mMesage.exec(fileContent);
  }

  var pharseIncludesChinese = new RegExp(quotationwithChinese + '+?', 'gm');
  var pharseIncludesChineseMatch = pharseIncludesChinese.exec(fileContent);
  while (pharseIncludesChineseMatch) {
    fileContent = fileContent.replace(
      pharseIncludesChineseMatch[0],
      (...args) => {
        var text = args[0].replace(
          new RegExp(quotationwithChinese, 'gm'),
          (word) => {
            let word1 = word.replace(quotations, '');
            if (testing) return "this.$t('waitToChange')";
            if (checkIfWordHaveTranslation(word1)) {
              return "this.$t('" + data[word1] + "')";
            } else {
              wordNotExist.add(word1);
              return word;
            }
          }
        );
        return text;
      }
    );
    pharseIncludesChineseMatch = pharseIncludesChinese.exec(fileContent);
  }
  console.log(fileContent);
  return fileContent;
}
if (!fileContent) module.exports = regExpExchange;
