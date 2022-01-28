export function validateField(e, form, setForm, index) {
  const { name, value } = e.target;
  switch (name) {
    case 'title': {
      if (value.length) form.error.title = false;
      else form.error.title = '請輸入團購主題!';
      break;
    }
    case 'deliveryDate': {
      if (new Date(value).getDay() !== 4) form.error.deliveryDate = false;
      else
        form.error.deliveryDate =
          '⚠️ 禮拜四為腳踏車進貨日！請勿將進貨日設為禮拜四！';
      break;
    }
    case 'body': {
      if (value.length) form.error.body = false;
      else form.error.body = '請輸入團購內容!';
      break;
    }
    case 'item': {
      if (!value.length) form.error.items[index].item = '請輸入商品名稱!';
      else if (value.length > 8) form.error.items[index].item = '最多八個字!';
      else form.error.items[index].item = false;
      break;
    }
    case 'price': {
      if (Number(value) < 1) form.error.items[index].price = '請輸入商品價格!';
      else form.error.items[index].price = false;
      break;
    }
    case 'itemQty': {
      if (Number(value) < 0 || value === '')
        form.error.items[index].itemQty = '請輸入商品數量!';
      else form.error.items[index].itemQty = false;
      break;
    }
    default:
      break;
  }
  setForm({ ...form });
}

export function validatePost(form, setForm) {
  const { title, deliveryDate, body, items, imageUrls } = form.post;
  let formIsValid = true;
  if (title.length) form.error.title = false;
  else {
    form.error.title = '請輸入團購主題!';
    formIsValid = false;
  }
  if (new Date(deliveryDate).getDay() !== 4) form.error.deliveryDate = false;
  else {
    form.error.deliveryDate =
      '⚠️ 禮拜四為腳踏車進貨日！請勿將進貨日設為禮拜四！';
    formIsValid = false;
  }
  if (body.length) form.error.body = false;
  else {
    form.error.body = '請輸入團購內容!';
    formIsValid = false;
  }
  items.forEach((i, index) => {
    const { item, price, itemQty } = i;
    if (!item.length) {
      form.error.items[index].item = '請輸入商品名稱!';
      formIsValid = false;
    } else if (item.length > 8) {
      form.error.items[index].item = '最多八個字!';
      formIsValid = false;
    } else form.error.items[index].item = false;
    if (Number(price) > 0) form.error.items[index].price = false;
    else {
      form.error.items[index].price = '請輸入商品價格!';
      formIsValid = false;
    }
    if (Number(itemQty) >= 0) form.error.items[index].itemQty = false;
    else form.error.items[index].itemQty = '請輸入商品數量!';
  });
  if (imageUrls.length < 1) formIsValid = false;
  setForm({ ...form });
  return formIsValid;
}
