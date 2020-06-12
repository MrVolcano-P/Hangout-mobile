import { requestCameraPermission, requestWriteStoragePermission } from './permission'
import ImagePicker from 'react-native-image-crop-picker';
export default () => new Promise(async (resolve, reject) => {
    if (await requestCameraPermission() && await requestWriteStoragePermission()) {
        ImagePicker.openCamera({
            width: 300,
            height: 100,
            cropping: true,
            includeBase64: true,
        }).then(image => {
            resolve(image)
        });
    }
    else {
        reject({ error: 'no permission' })
    }
})
