import {Autocomplete, Box, Button, IconButton, Modal, Paper, TextField, Typography} from "@mui/material";
import React, {SyntheticEvent, useEffect} from "react";
import {GeoPoint} from "../api/references/types";
import {useSelector} from "react-redux";
import {getGeoPointData} from "../store/references/referencesReducer";
import {style} from "./Style";
import CloseIcon from "@mui/icons-material/Close";


interface LocationModalProps {
    open: boolean;
    handleClose: () => void;
    locationRegion: string | null,
    setLocationRegion: (locationRegion: string | null) => void,
    locationGeoPoint: GeoPoint | null,
    setLocationGeoPoint: (locationGeoPoint: GeoPoint | null)=> void
}


const LocationModal: React.FC<LocationModalProps> =(
    {open, handleClose, locationRegion, setLocationRegion, locationGeoPoint, setLocationGeoPoint})=> {
    const [region, setRegion] = React.useState<string | null>(null);
    const [geoPoint, setGeoPoint] = React.useState<GeoPoint | null>(null);


    useEffect(() => {
        setRegion(locationRegion);
        setGeoPoint(locationGeoPoint);
    }, [locationRegion, locationGeoPoint]);

    const initialGeoData = useSelector(getGeoPointData()).content;
    const regions = Array.from(new Set(initialGeoData.map(item => item.region)));

    const filteredData = region
        ? initialGeoData.filter(item => item.region === region)
        : [];

    const handleReset = () => {
        setLocationRegion(null);
        setLocationGeoPoint(null);
    };

    const handleAccept = () => {
        setLocationRegion(region);
        setLocationGeoPoint(geoPoint)
        handleClose();
    };

    return(
        <Modal open={open}>
            <Box sx={style}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>Город или регион</Typography>
                    <Box display="flex" alignItems="center">
                        {region && (
                            <Typography onClick={handleReset} sx={{ cursor: 'pointer', marginRight: '8px', fontWeight: 'bold', color: 'blue' }}>Сбросить</Typography>
                        )}
                        <IconButton onClick={handleClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Paper elevation={3} style={{ position: 'relative', marginBottom: '10px', padding: '4px'}}>

                    <Autocomplete
                        sx={{marginBottom: 1}}
                        options={regions}
                        value={region}
                        noOptionsText={"Данные не загрузились"}
                        onChange={(event: SyntheticEvent<Element, Event>, value: string | null) => {
                            setRegion(value === null ? '' : value)}}
                        renderInput={(params) => (
                            <TextField {...params}
                                       size={"small"}
                                       variant="outlined"
                                       label="Выберите регион"/>
                        )}
                    />
                    <Autocomplete
                        options={filteredData}
                        value={geoPoint}
                        noOptionsText={"Данные не загрузились"}
                        getOptionKey={(option) => option.id}
                        getOptionLabel={(option) => option.pointName}
                        onChange={(event: SyntheticEvent<Element, Event>, value: GeoPoint | null) => {
                            setGeoPoint(value === null ? null : value)
                            }}
                        disabled={locationRegion === ''}
                        renderInput={(params) => (
                            <TextField {...params}
                                       size={"small"}
                                       variant="outlined"
                                       label="Населенный пункт" />
                        )}
                    />
                </Paper>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    marginTop="16px">
                    <Button variant="contained" onClick={handleAccept}>
                        Применить
                    </Button>
                </Box>
            </Box>
        </Modal>
    );
}

export default LocationModal;