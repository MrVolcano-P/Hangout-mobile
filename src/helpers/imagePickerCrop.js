import { requestCameraPermission, requestWriteStoragePermission } from './permission'
import ImagePicker from 'react-native-image-crop-picker';
export default () => new Promise(async (resolve, reject) => {
    if (await requestCameraPermission() && await requestWriteStoragePermission()) {
        // ImagePicker.showImagePicker({}, (response) => {
        //     if (response.uri) {
        //         resolve(response)
        //     }
        //     else {
        //         reject(response)
        //     }
        // })
    }
    else {
        reject({ error: 'no permission' })
    }
})