import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props: any) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
  
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
}));

interface CustomizedSnackbarProps{
    open: boolean;
    handleClose: () => void;
    severity?: 'success' | 'info' | 'warning' | 'error';
    title?: string;
}

export default function CustomizedSnackbar({ open, handleClose, severity, title }: CustomizedSnackbarProps) {
    const classes = useStyles();
  
    const onClose = (event: any, reason: string) => {
      if (reason === 'clickaway') {
        return;
      }
  
      handleClose();
    };
  
    return (
      <div className={classes.root}>
        <Snackbar 
            open={open} 
            autoHideDuration={6000} 
            onClose={onClose}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
        >
          <Alert onClose={onClose} severity={severity}>
            { title }
          </Alert>
        </Snackbar>
      </div>
    );
  }
  