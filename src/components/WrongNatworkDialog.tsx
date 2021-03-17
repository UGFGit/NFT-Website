import React from 'react';
import MuiDialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Lottie from "../components/Lottie";

interface DialogProps{
    open: boolean;
    network: string;
}

function WrongNatworkDialog({ open, network}: DialogProps){
    return(
        <MuiDialog open={open} >
            <DialogTitle>
                <p style = {{textAlign: 'center'}}>Wrong network</p>
            </DialogTitle>
            <DialogContent dividers style = {{
                padding: "16px 24px"
            }}>
                <div style = {{
                    marginBottom: 20,
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex"
                }}>
                    <Lottie width={60} height={60}/>
                </div>
                <p style = {{
                   fontFamily: "Open Sans",
                   fontStyle: "normal",
                   fontWeight: "normal",
                   fontSize: 14,
                   color: "#868686"
                }}>Change network to {network}</p>                 
            </DialogContent>
        </MuiDialog>
    )
}

export default WrongNatworkDialog;