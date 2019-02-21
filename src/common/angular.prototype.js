angular.getCurrentLanguage = (lang) => {
  return lang ? lang : 'ja';
};

angular.removeObjectFromArray = function(arr, id) {
  arr.find(function(item) {
    return item.id === id;
  });
  arr = arr.filter(function(el) {
    return el.id !== id;
  });
  return JSON.stringify(arr, null, ' ');
};

angular.multiIndexOf = function(arr, el) {
  let idxs = [];
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === el) {
      idxs.unshift(i);
    }
  }
  return idxs;
};

angular.add = (arr, item) => {
  arr = angular.isArray(arr) ? arr : [];
  for (var i = 0; i < arr.length; i++) {
    if (angular.equals(arr[i], item)) {
      return arr;
    }
  }
  arr.push(item);
  return arr;
};


angular.remove = (arr, item) => {
  if (angular.isArray(arr)) {
    for (let i = 0; i < arr.length; i++) {
      if (angular.equals(arr[i], item)) {
        arr.splice(i, 1);
        break;
      }
    }
  }
  return arr;
};

angular.ucFirstAllWords = function(str) {
  let pieces = str.split(' ');
  for (let i = 0; i < pieces.length; i++) {
    let j = pieces[i].charAt(0).toUpperCase();
    pieces[i] = j + pieces[i].substr(1);
  }
  return pieces.join(' ');
};

angular.formatNlbr = (data) => {
  if (data && typeof data === 'string') {
    return data.replace(/\n/g, '<br/>');
  }
  return data;
};

angular.getQueryString = (params) => {
  let str = '';
  for (let param in params) {
    if (params[param] || String(params[param]) === 'false') {
      str += encodeURIComponent(param) + '=' + encodeURIComponent(params[param]) + '&';
    }
  }
  if (str !== '') {
    str = '?' + str.substr(0, str.length - 1);
  }
  return str;
};

angular.contains = (arr, item) => {
  if (angular.isArray(arr)) {
    for (let i = 0; i < arr.length; i++) {
      if (angular.equals(arr[i], item)) {
        return true;
      }
    }
  }
  return false;
};

angular.formatJPCurrency = (price) => {
  return new Intl.NumberFormat('ja-JP', { currency: 'JPY' }).format(price);
};
