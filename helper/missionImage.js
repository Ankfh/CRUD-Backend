exports.uploadMissionImage = async (file) => {
  const path = `${process.env.MISSION_IMAGE_PATH}/${Math.floor(
    Math.random() * 100000 + 1
  )}.${file.name}`;
  file.mv(path, (err) => {
    if (err) {
      return err;
      console.log(err);
    }
  });
  const newPath = path.slice(22);
  return newPath;
};
