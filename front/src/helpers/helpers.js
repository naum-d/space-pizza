export const getImageFromBase64 = (data, style = { height: '100%' }) => {
  const encode = Buffer.from(data.data, 'binary').toString('base64');
  return <img style={style} src={`data:image/jpeg;base64,${encode}`} alt={''} />;
};

export const turnOffEvent = (e, callback) => {
  e.preventDefault();
  e.stopPropagation();
  return callback;
};
