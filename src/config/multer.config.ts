// multer.config.ts

import { diskStorage, StorageEngine, DiskStorageOptions } from 'multer';
import { extname } from 'path';

export const publicPath = './public/uploads';

const diskStorageOptions: DiskStorageOptions = {
  destination: publicPath,
  filename: (_req, file, callback) => {
    const randomName = Array(32)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');

    callback(null, `${randomName}${extname(file.originalname)}`);
  },
};

export const storage: StorageEngine = diskStorage(diskStorageOptions);

export const multerOptions = {
  storage: storage,
};
