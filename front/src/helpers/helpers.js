export const getImageFromBase64 = (data, style = { height: '100%' }) => {
  const encode = Buffer.from(data.data, 'binary').toString('base64');
  return <img style={style} src={`data:image/jpeg;base64,${encode}`} alt={''} />;
};

export const turnOffEvent = (e, callback) => {
  e.preventDefault();
  e.stopPropagation();
  return callback;
};

export const makeIncrement = (data, id) => {
  const { [id]: { count } } = data;
  return { ...data, [id]: { pizza: id, count: count + 1 } };
};

export const makeDecrement = (data, id) => {
  const { [id]: { count, ...obj }, ...other } = data;
  return count === 1 ? { ...other } : { ...other, [id]: { ...obj, count: count - 1 } };
};

export const makeRemove = (data, id) => {
  const { [id]: obj, ...other } = data;
  return other;
};
