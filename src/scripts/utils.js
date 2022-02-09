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

export function generateDate() {
  var date = new Date();
  var day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  var month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  return `${date.getFullYear()}-${month}-${day} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export function formatDate(date) {
  var formattedDate = new Date(date);
  var day = formattedDate.getDate();
  var month = formattedDate.getMonth() + 1;
  if (day < 10) {
    day = `0${day}`;
  }
  if (month < 10) {
    month = `0${month}`;
  }

  return `${day}/${month}/${formattedDate.getFullYear()} ${formattedDate.getHours()}h${formattedDate.getMinutes()}`;
}
