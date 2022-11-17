import {Injectable} from '@nestjs/common';
import {StorageResponse} from "./dto/storage.response";
import {format} from "date-fns";
import {path} from 'app-root-path';
import {ensureDir, writeFile} from "fs-extra";

@Injectable()
export class StorageService {
  async saveFiles(files: Express.Multer.File[]): Promise<StorageResponse[]>{
    const dateFolder = format(new Date(), 'yyyy-MM-dd')
    const uploadFolder = `${path}/storage/${dateFolder}`
    await ensureDir(uploadFolder)
    const res: StorageResponse[] = []

    for(const file of files) {
      await writeFile(`${uploadFolder}/${file.originalname}`, file.buffer)
      res.push({url: `${dateFolder}/${file.originalname}`, name: file.originalname})
    }
    return res
  }
}
