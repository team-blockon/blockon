class FileTypeCheck {
  static uploadFileType(mimeType, checkTypeArray) {
    for (let i = 0; i < checkTypeArray.size(); i++) {
      if (mimeType.split('/')[1] !== checkTypeArray[i]) {
        return false;
      }
    }
    return true;
  }
}

module.exports = FileTypeCheck;
