// multer.config.ts

import { diskStorage, StorageEngine, DiskStorageOptions } from 'multer';
import { extname } from 'path';
import { CustomRequest } from 'src/utils';

export const publicPath = './public/uploads';

const diskStorageOptions: DiskStorageOptions = {
  destination: publicPath,
  filename: (req: CustomRequest, file, callback) => {
    let cat: string;
    if (req.route.path.includes('song')) {
      const songName = req.body.title.toLowerCase().replace(/ /g, '-');
      cat = 'song-' + songName;
    } else if (req.baseUrl === '/api/v1/posts') {
      cat = 'post';
    } else if (req.baseUrl === '/api/v1/events') {
      cat = 'event';
    } else if (req.baseUrl === '/api/v1/vote-events') {
      cat = 'vote-event';
    } else if (req.baseUrl === '/api/v1/messages') {
      cat = 'message';
    } else {
      cat = 'default';
    }
    const uniqueSuffix = Date.now();
    const filename = `${cat}-${uniqueSuffix}${extname(file.originalname)}`;

    console.log();

    callback(null, filename);
  },
};

export const storage: StorageEngine = diskStorage(diskStorageOptions);

export const multerOptions = {
  storage: storage,
};
