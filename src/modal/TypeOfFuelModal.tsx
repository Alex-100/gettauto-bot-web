import {typeOfFuelOptions} from "../api/request/types";
import React, {useEffect} from "react";
import {
    Box,
    Button,
    Checkbox,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Modal,
    Typography
} from "@mui/material";
import {style} from "./Style";
import CloseIcon from "@mui/icons-material/Close";

interface TypeOfFuelModalProps {
    open: boolean;
    typeOfFuel: typeof typeOfFuelOptions[0][],
    handleClose: () => void;
    setTypeOfFuel: (typeOfFuel: typeof typeOfFuelOptions[0][]) => void;
}


const TypeOfFuelModal: React.FC<TypeOfFuelModalProps> = ({ open, handleClose, typeOfFuel, setTypeOfFuel }) => {
    const [checked, setChecked] = React.useState<typeof typeOfFuelOptions[0][]>([]);
    useEffect(() => {
        setChecked(typeOfFuel);
    }, [typeOfFuel]);


    const handleToggle = (value: typeof typeOfFuelOptions[0]) => () => {
        const currentIndex = checked.findIndex(item => item.value === value.value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        setTypeOfFuel(newChecked);
    };
    const handleAccept = () => {
        setTypeOfFuel(checked);
        handleClose();
    };

    const handleReset = () => {
        setChecked([]);
        setTypeOfFuel([]);
    };

    return (
        <Modal open={open} >
            <Box sx={style}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>Тип топлива</Typography>
                    <Box display="flex" alignItems="center">
                        {checked.length>0 && (
                            <Typography onClick={handleReset} sx={{ cursor: 'pointer', marginRight: '8px', fontWeight: 'bold', color: 'blue' }}>Сбросить</Typography>
                        )}
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Box>
                <List>
                    {typeOfFuelOptions.map((option, index) => {
                        const labelId = `checkbox-list-label-${index}`;

                        return (
                            <ListItem key={index} role={undefined} dense button onClick={handleToggle(option)}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        checked={checked.findIndex(item => item.value === option.value) !== -1}
                                        tabIndex={-1}
                                        disableRipple
                                        inputProps={{ 'aria-labelledby': labelId }}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={option.label} />
                            </ListItem>
                        );
                    })}
                </List>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginTop="16px"
                >
                    <Button variant="contained" onClick={handleAccept}>
                        Применить
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default TypeOfFuelModal;