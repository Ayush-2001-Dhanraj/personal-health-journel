const isPdfFile = (file) => {
  const extension = file.split(".").pop().toLowerCase();
  if (extension === "pdf") {
    return true;
  }
  return false;
};

export default isPdfFile;
