import { config } from '../config/config';

export const showPicture = (product) => {
    let img = config.NO_IMAGE;
    if (product.picture) {
        img = `${config.BACKEND_URL}/product/image/${product?.picture}`;
    } else {
        if (product.pictureLink) {
            img = product.pictureLink;
        }
    }
    return img;
}