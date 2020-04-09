import { check, request, PERMISSIONS, RESULTS, openSettings } from 'react-native-permissions'
import { Alert } from 'react-native'

export const requestPermission = async (permission) => {
    const checkResult = await check(permission)
    if (checkResult === RESULTS.DENIED) {
        const requestResult = await request(permission)
        if (requestResult === RESULTS.BLOCKED) {
            return RESULTS.DENIED
        }
        return requestResult
    }
    return checkResult
}

export const requestCameraPermission = async () => {
    const result = await requestPermission(PERMISSIONS.ANDROID.CAMERA)
    if (result === RESULTS.GRANTED) {
        return true
    }
    if (result === RESULTS.DENIED) {
        Alert.alert(
            'คุณปฎิเสธการอนุญาต',
            'ไม่สามารถใช้งานกล้องถ่ายภาพได้ เนื่องจากคุณปฎิเสธที่จะให้สิทธิเข้าถึง',
        )
    }
    if (result === RESULTS.BLOCKED) {
        Alert.alert(
            'คุณปฎิเสธการอนุญาต',
            'ไม่สามารถใช้งานกล้องถ่ายภาพได้ เนื่องจากคุณเคยปฎิเสธที่จะให้สิทธิเข้าถึง',
            [
                {
                    text: 'ยกเลิก',
                    style: 'cancel',
                },
                {
                    text: 'เปิดการตั้งค่า',
                    onPress: openSettings,
                },
            ],
        )
    }
    return false
}

export const requestWriteStoragePermission = async () => {
    const result = await requestPermission(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)
    if (result === RESULTS.GRANTED) {
        return true
    }
    if (result === RESULTS.DENIED) {
        Alert.alert(
            'คุณปฎิเสธการอนุญาต',
            'ไม่สามารถใช้บันทึกภาพได้ เนื่องจากคุณปฎิเสธที่จะให้สิทธิเข้าถึง',
        )
    }
    if (result === RESULTS.BLOCKED) {
        Alert.alert(
            'คุณปฎิเสธการอนุญาต',
            'ไม่สามารถใช้บันทึกภาพได้ เนื่องจากคุณเคยปฎิเสธที่จะให้สิทธิเข้าถึง',
            [
                {
                    text: 'ยกเลิก',
                    style: 'cancel',
                },
                {
                    text: 'เปิดการตั้งค่า',
                    onPress: openSettings,
                },
            ],
        )
    }
    return false
}
