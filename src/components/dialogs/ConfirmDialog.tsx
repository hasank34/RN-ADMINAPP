import React from 'react';
import {Dialog, Button, Text} from 'react-native-paper';

interface ConfirmDialogProps {
  visible: boolean;
  onDismiss: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

const ConfirmDialog = ({
  visible,
  onDismiss,
  onConfirm,
  title,
  message,
}: ConfirmDialogProps) => (
  <Dialog visible={visible} onDismiss={onDismiss}>
    <Dialog.Title>{title}</Dialog.Title>
    <Dialog.Content>
      <Text>{message}</Text>
    </Dialog.Content>
    <Dialog.Actions>
      <Button onPress={onDismiss}>Hayır</Button>
      <Button onPress={onConfirm}>Evet</Button>
    </Dialog.Actions>
  </Dialog>
);

export default ConfirmDialog;
