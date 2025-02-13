import {Alert} from 'react-native';

export const confirmDelete = (onConfirm: () => void) => {
  Alert.alert('Delete?', 'Are you sure you want to delete this item?', [
    {text: 'No', style: 'cancel'},
    {text: 'Yes', onPress: onConfirm, style: 'destructive'},
  ]);
};
