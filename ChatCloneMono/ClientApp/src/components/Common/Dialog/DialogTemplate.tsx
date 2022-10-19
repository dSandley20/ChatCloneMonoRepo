import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import React from 'react'

interface IDialogTemplateProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
}

const DialogTemplate = (props: IDialogTemplateProps) => {
    const { isOpen, onClose, title, children } = props

    return (
        <Dialog onClose={onClose} open={isOpen}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default DialogTemplate