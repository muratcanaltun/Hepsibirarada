import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['Review Items', 'Payment Information', 'Shipping Information'];

export default function HorizontalLinearStepper(props) {
    const activeStep = props.activeStep;
    const setActiveStep = props.setActiveStep;
    const [skipped, setSkipped] = React.useState(new Set());

    const isStepOptional = (step) => {
        return step === -1;
    };

    const isStepSkipped = (step) => {
        return skipped.has(step);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        switch(activeStep) {
            case 0:
                break;
            case 1:
                document.getElementById("cartContainer").classList.remove("drop");
                document.getElementById("cartContainer").style.display="flex";
                document.getElementById("paymentContainer").classList.add("drop");
                break;
            case 2:
                document.getElementById("paymentContainer").classList.remove("drop");
                document.getElementById("paymentContainer").style.display="flex";
                document.getElementById("shippingContainer").classList.add("drop");
                break;
            default:
        }
    };


    return (
        <Box sx={{ width: '100%', height: '100%' }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = (
                            <Typography variant="caption">Optional</Typography>
                        );
                    }
                    if (isStepSkipped(index)) {
                        stepProps.completed = false;
                    }
                    return (
                        <Step key={label} {...stepProps}>
                            <StepLabel {...labelProps}>{label}</StepLabel>
                        </Step>
                    );
                })}
            </Stepper>
                <React.Fragment>
                    <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                        <Button
                            color="inherit"
                            variant={"outlined"}
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ mr: 1}}
                        >
                            Back
                        </Button>

                    </Box>
                </React.Fragment>
        </Box>
    );
}