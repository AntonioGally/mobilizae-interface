export const sort = (value1, value2) => {
  if (!value1) {
    return -1;
  } else if (!value2) {
    return 1;
  } else {
    return value1.localeCompare(value2)
  }
}