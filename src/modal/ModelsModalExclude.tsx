import React, {useEffect, useState} from "react";
import {
    Box, Button,
    Checkbox,
    IconButton,
    InputAdornment,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Modal, TextField,
    Typography
} from "@mui/material";
import {style} from "./Style";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

interface ModelsModalProps {
    open: boolean;
    handleClose: () => void,
    models: string[],
    selectedModels: string[],
    setSelectedModels: (selectedBrands: string[]) => void;
}

const ModelsModalExclude: React.FC<ModelsModalProps> = ({open, handleClose, models, selectedModels, setSelectedModels})=>{
    const [checked, setChecked] = React.useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        setChecked(selectedModels);
    }, [selectedModels]);

    const [filteredModels, setFilteredModels] = useState<string[]>(models);

    const handleToggle = (value: string) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    useEffect(() => {
        // Фильтрация марок на основе поискового запроса
        const filtered = models.filter(option =>
            option.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredModels(filtered);
    }, [searchTerm, models]);

    const handleAccept = () => {
        setSelectedModels(checked);
        handleClose();
    };

    const handleReset = () => {
        setChecked([]);
        setSearchTerm('')
        setSelectedModels([]);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

   return (
       <Modal open={open}>
           <Box sx={style}>

               <Box sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px'}}>
                   <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>Модели</Typography>
                   <Box display="flex" alignItems="center">
                       {checked.length > 0 && (
                           <Typography onClick={handleReset} sx={{ cursor: 'pointer', marginRight: '8px', fontWeight: 'bold', color: 'blue' }}>Сбросить</Typography>
                       )}
                       <IconButton onClick={handleClose}>
                           <CloseIcon />
                       </IconButton>
                   </Box>
               </Box>
               <TextField
                   label="Поиск"
                   variant="outlined"
                   fullWidth
                   value={searchTerm}
                   onChange={handleSearchChange}
                   InputProps={{
                       endAdornment: (
                           <InputAdornment position="end">
                               <SearchIcon />
                           </InputAdornment>
                       ),
                   }}
                   sx={{ marginBottom: '16px' }}/>
               <List sx={{ maxHeight: 300, overflow: 'auto' }}>
                   {filteredModels.map((option, index) => {
                       const labelId = `checkbox-list-label-${index}`;
                       return (
                           <ListItem key={index} role={undefined} dense button onClick={handleToggle(option)}>
                               <ListItemIcon>
                                   <Checkbox
                                       edge="start"
                                       checked={checked.indexOf(option) !== -1}
                                       tabIndex={-1}
                                       disableRipple
                                       inputProps={{ 'aria-labelledby': labelId }}
                                   />
                               </ListItemIcon>
                               <ListItemText id={labelId} primary={option} />
                           </ListItem>
                       );
                   })}
               </List>
               <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '16px'}}>
                   <Button variant="contained" onClick={handleAccept}>Применить</Button>
               </Box>
           </Box>
       </Modal>
   );
}

export default ModelsModalExclude;