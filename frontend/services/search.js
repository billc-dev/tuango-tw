export function placeholderText(type) {
  switch (type) {
    case 'text':
      return '搜尋關鍵字';
    case 'postNum':
      return '搜尋流水編號';
    default:
      break;
  }
}

export function textFieldType(type) {
  switch (type) {
    case 'text':
      return 'text';
    case 'postNum':
      return 'number';
    case 'deadline':
    case 'deliveryDate':
      return 'date';
    default:
      break;
  }
}
