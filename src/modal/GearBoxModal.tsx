import {gearBoxOptions} from "../api/request/types";
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

interface GearBoxModalProps {
    open: boolean;
    gearBoxType: typeof gearBoxOptions[0][],
    handleClose: () => void;
    setGearBoxType: (gearBoxType: typeof gearBoxOptions[0][]) => void;
}



const GearBoxModal: React.FC<GearBoxModalProps> = ({ open, handleClose, gearBoxType, setGearBoxType }) => {
    const [checked, setChecked] = React.useState<typeof gearBoxOptions[0][]>([]);
    useEffect(() => {
        setChecked(gearBoxType);
    }, [gearBoxType]);


    const handleToggle = (value: typeof gearBoxOptions[0]) => () => {
        const currentIndex = checked.findIndex(item => item.value === value.value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
        setGearBoxType(newChecked);
    };

    const handleAccept = () => {
        setGearBoxType(checked);
        handleClose();
    };

    const handleReset = () => {
        setChecked([]);
        setGearBoxType([]);
    };

    return (
        <Modal open={open}>
            <Box sx={style}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>Коробка передач</Typography>
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
                    {gearBoxOptions.map((option, index) => {
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

export default GearBoxModal;