function filter(docsRef, condition) {
  let newRef = docsRef;
  switch (condition.operator) {
    case "==":
      newRef = docsRef.where(condition.field, "==", condition.value);
      break;
    case "!=":
      newRef = docsRef.where(condition.field, "!=", condition.value);
      break;
    case "isNull":
      newRef = docsRef.where(condition.field, "==", null);
      break;
    case "isNotNull":
      newRef = docsRef.where(condition.field, "!=", null);
      break;
    case ">":
      newRef = docsRef.where(condition.field, ">", condition.value);
      break;
    case ">=":
      newRef = docsRef.where(condition.field, ">=", condition.value);
      break;
    case "<":
      newRef = docsRef.where(condition.field, "<", condition.value);
      break;
    case "<=":
      newRef = docsRef.where(condition.field, "<=", condition.value);
      break;
    case "array-contains":
      newRef = docsRef.where(condition.field, "array-contains", condition.value);
      break;
    case "array-contains-any":
      newRef = docsRef.where(condition.field, "array-contains-any", condition.value);
      break;
    case "in":
      newRef = docsRef.where(condition.field, "in", condition.value);
      break;
    case "not-in":
      newRef = docsRef.where(condition.field, "not-in", condition.value);
      break;
    default:
      break;
  }
  return newRef;
}

module.exports = filter;