exports.uploadPostImage = async (file) => {
  const path = `${process.env.POST_IMAGE_PATH}/${Math.floor(
    Math.random() * 100000 + 1
  )}.${file.name}`;
  file.mv(path, (err) => {
    if (err) {
      return err;
    }
  });
  const newPath = path.slice(19);
  return newPath;
};
