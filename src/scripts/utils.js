export const sort = (value1, value2) => {
  if (!value1) {
    return -1;
  } else if (!value2) {
    return 1;
  } else {
    return value1.localeCompare(value2);
  }
};

export const downloadToCsv = (headers, body, fileTitle = "arq") => {
  let newBody = body.slice();
  if (headers) {
    newBody.unshift(headers);
  }
  var jsonObject = JSON.stringify(newBody);

  function convertToCSV(objArray, separator = ",", enclosingCharacter) {
    var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
    var str = "";
    for (var i = 0; i < array.length; i++) {
      var line = "";
      for (var index in array[i]) {
        if (line !== "") line += separator;
        if (typeof array[i][index] === "string") {
          if (enclosingCharacter === undefined) {
            line += `"${array[i][index]}"`;
          } else {
            line += `${enclosingCharacter}${array[i][index]}${enclosingCharacter}`;
          }
        } else {
          line += `${array[i][index]}`;
        }
      }
      str += line + "\r\n";
    }
    return str;
  }

  var csvString = convertToCSV(jsonObject, ";");
  var extension = ".csv";
  var exportedFilename = fileTitle + extension || "file_export" + extension;
  var blob = new Blob([csvString], {
    type: `text/${extension};charset=utf-8;`,
  });
  if (navigator.msSaveBlob) {
    // IE 10+
    navigator.msSaveBlob(blob, exportedFilename);
  } else {
    var link = document.createElement("a");
    if (link.download !== undefined) {
      // feature detection
      // Browsers that support HTML5 download attribute
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", exportedFilename);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
};

function regexReplacer(str) {
  function replacer(match, p1, p2, p3) {
    return p1 + "," + p3;
  }
  return str.replace(/(\d+)(\.)(\d+)/gm, replacer);
}

export function copyToClipBoard(headers, items, decSeparator) {
  var newArr = items.slice();
  if (headers) {
    newArr.unshift(headers);
  }
  // Convert Object to JSON
  var objArray = JSON.stringify(newArr);
  var array = typeof objArray != "object" ? JSON.parse(objArray) : objArray;
  var str = "";
  for (var i = 0; i < array.length; i++) {
    var line = "";
    for (var index in array[i]) {
      if (line != "") line += "\t";
      line += `${array[i][index]}`;
    }
    str += line + "\r\n";
  }
  if (decSeparator === ",") {
    str = regexReplacer(str);
  }
  navigator.clipboard.writeText(str).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}

export function generateDate() {
  var date = new Date();
  var day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  var month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  return `${date.getFullYear()}-${month}-${day} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export function formatDate(date, shouldAddThreeHours = true) {
  var formattedDate = new Date(date);
  var day = formattedDate.getDate();
  var month = formattedDate.getMonth() + 1;
  var hours = shouldAddThreeHours
    ? formattedDate.getHours() + 3
    : formattedDate.getHours();
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }

  return `${day}/${month}/${formattedDate.getFullYear()} 
  ${hours}h
  ${formattedDate.getMinutes()}`;
}


export const parseUA = (() => {
  //https://stackoverflow.com/questions/24376418/user-agent-parsing-in-javascript
  //useragent strings are just a set of phrases each optionally followed by a set of properties encapsulated in paretheses
  const part = /\s*([^\s/]+)(\/(\S+)|)(\s+\(([^)]+)\)|)/g;
  //these properties are delimited by semicolons
  const delim = /;\s*/;
  //the properties may be simple key-value pairs if;
  const single = [
      //it is a single comma separation,
      /^([^,]+),\s*([^,]+)$/,
      //it is a single space separation,
      /^(\S+)\s+(\S+)$/,
      //it is a single colon separation,
      /^([^:]+):([^:]+)$/,
      //it is a single slash separation
      /^([^/]+)\/([^/]+)$/,
      //or is a special string
      /^(.NET CLR|Windows)\s+(.+)$/
  ];
  //otherwise it is unparsable because everyone does it differently, looking at you iPhone
  const many = / +/;
  //oh yeah, bots like to use links
  const link = /^\+(.+)$/;

  const inner = (properties, property) => {
      let tmp;

      if (tmp = property.match(link)) {
          properties.link = tmp[1];
      }
      else if (tmp = single.reduce((match, regex) => (match || property.match(regex)), null)) {
          properties[tmp[1]] = tmp[2];
      }
      else if (many.test(property)) {
          if (!properties.properties)
              properties.properties = [];
          properties.properties.push(property);
      }
      else {
          properties[property] = true;
      }

      return properties;
  };

  return (input) => {
      const output = {};
      for (let match; match = part.exec(input); '') {
          output[match[1]] = {
              ...(match[5] && match[5].split(delim).reduce(inner, {})),
              ...(match[3] && {version:match[3]})
          };
      }
      return output;
  };
})();
//parseUA('user agent string here');