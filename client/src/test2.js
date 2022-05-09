String.fromHtmlEntities = function (string) {
  return (string + "").replace(/&#\d+;/gm, function (s) {
    return String.fromCharCode(s.match(/\d+/gm)[0]);
  });
};
String.fromHtmlEntities = function (string) {
  return (string + "").replace(/&#\d+;/gm, function (s) {
    return String.fromCharCode(s.match(/\d+/gm)[0]);
  });
};
var str = "<p>hello</p>".fromHtmlEntities();
console.log("Entities:", str);
console.log("String:", String.toHtmlEntities(str));

// console.log(convertingToString("<p>hello<p>"));
