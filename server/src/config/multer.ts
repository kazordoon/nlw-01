import multer from 'multer';
import { resolve } from 'path';
import crypto from 'crypto';
import UnsupportedFileError from '../exceptions/UnsupportedFileError';

const maxFileSizeInBytes = 2 * 1024 * 1024;

const multerOptions: multer.Options = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename(req, file, callback) {
      const hash = crypto.randomBytes(6).toString('hex');
      const filename = `${hash}-${file.originalname}`;

      return callback(null, filename);
    },
  }),
  fileFilter(req, file, callback) {
    const allowedMimes = ['image/png', 'image/jpeg', 'image/pjpeg'];
    const notAllowedMime = !allowedMimes.includes(file.mimetype);

    if (notAllowedMime) {
      const error = new UnsupportedFileError();
      return callback(error);
    }

    return callback(null, true);
  },
  limits: {
    fileSize: maxFileSizeInBytes,
  },
};

export default multerOptions;
