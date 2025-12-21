import { v2 as cloudinary } from 'cloudinary'
import config from '../config';

cloudinary.config({
    cloud_name: config.cloudinary.clude_name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secrate
});
export default cloudinary