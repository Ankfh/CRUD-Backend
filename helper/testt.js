exports.uploadsImage = async (file) => {
  const path = `${process.env.FILE_UPLOAD_PATH}/${Math.floor(
    Math.random() * 100000 + 1
  )}.${file.name}`;
  await file.mv(path, (err) => {
    if (err) {
      return err;
    }
  });
  const newPath = path.slice(19);
  return newPath;
};
