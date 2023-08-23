function toTitlecase(str) {
  return str.replace(/(?:^|\s)\S/g, function (char) {
    return char.toUpperCase();
  });
}

module.exports = { toTitlecase };
