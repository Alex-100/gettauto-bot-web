import {
    Autocomplete,
    Button, Divider,
    InputAdornment,
    Paper, Snackbar,
    Stack,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import React, {SyntheticEvent, useEffect, useState} from "react";
import {GeoPoint, Model} from "./api/references/types";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
    BrandWithModels,
    CarEntryDTO,
    DataForLastTime,
    gearBoxOptions,
    GearboxType,
    LocationRadius, locationRadiusOptions,
    Owner,
    ShowBroken,
    TypeOfFuel,
    typeOfFuelOptions,
    WheelDrive, wheelDriveOptions,
    WheelLocation
} from "./api/request/types";
import {useAppDispatch} from "./store";
import {useSelector} from "react-redux";
import {getGeoPointData, getModelData} from "./store/references/referencesReducer";
import {fetchGeoPoints, fetchModels} from "./store/references/actionCreators";
import {addRequest, countRequest, getRequest} from "./api/request";
import WheelDriveModal from "./modal/WheelDriveModal";
import GearBoxModal from "./modal/GearBoxModal";
import TypeOfFuelModal from "./modal/TypeOfFuelModal";
import LocationModal from "./modal/LocationModal";
import MarksModal from "./modal/MarksModal";
import ModelsModal from "./modal/ModelsModal";
import MarksModalExclude from "./modal/MarksModalExlude";
import ModelsModalExclude from "./modal/ModelsModalExclude";
import { useMask } from '@react-input/mask';




function Home(){
    const dispatch = useAppDispatch();

    const [userId, setUserId] = useState<number>(0);
    const [requestCode, setRequestCode] = useState<string>('');
    useEffect(() => {
        // Инициализируем Telegram Web App
        window.Telegram.WebApp.ready();
        // Получаем данные о пользователе
        const user = window.Telegram.WebApp.initDataUnsafe?.user;
        let startParam = window.Telegram.WebApp.initDataUnsafe.start_param
        if (user) {
            setUserId(user.id);
        }
        if (startParam){
            setRequestCode(startParam)
        }
    }, []);

    const initialCarData: Model[] = useSelector(getModelData()).content;
    const initialGeoData = useSelector(getGeoPointData()).content;
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    useEffect(() => {
        dispatch(fetchModels());
        dispatch(fetchGeoPoints());
    },[dispatch]);

    useEffect(() => {
        if (requestCode) {
            const fetchData = async () => {
                const carEntryDTO: CarEntryDTO = await getRequest(requestCode, userId);
                if (carEntryDTO) {
                    let brands = carEntryDTO.makeAndModelsIncludeList.flatMap(item => item.make)
                    let models = carEntryDTO.makeAndModelsIncludeList.flatMap(item => item.models)
                    let brandsExclude = carEntryDTO.makeAndModelsExcludeList.flatMap(item => item.make)
                    let modelsExclude = carEntryDTO.makeAndModelsExcludeList.flatMap(item => item.models)
                    setSelectedBrands(brands);
                    setSelectedModels(models);
                    setSelectedBrandsExclude(brandsExclude);
                    setSelectedModelsExclude(modelsExclude);
                    setMileageFrom(carEntryDTO.mileageFrom || null);
                    setMileageTo(carEntryDTO.mileageTo || null);
                    setYearFrom(carEntryDTO.yearFrom || null);
                    setYearTo(carEntryDTO.yearTo || null);
                    setPriceFrom(carEntryDTO.priceFrom || null);
                    setPriceTo(carEntryDTO.priceTo || null);
                    setHorsePowerFrom(carEntryDTO.horsePowerFrom || null);
                    setHorsePowerTo(carEntryDTO.horsePowerTo || null);
                    setVolumeOfEngineFrom(carEntryDTO.volumeOfEngineFrom || null);
                    setVolumeOfEngineTo(carEntryDTO.volumeOfEngineTo || null);
                    setShowBroken(carEntryDTO.showBroken);
                    setGearboxValues(getGearboxOptions(carEntryDTO.gearboxType));
                    setTypeOfFuel(getTypeOfFuelOptions(carEntryDTO.typeOfFuel));
                    setWheelLocation(carEntryDTO.wheelLocation);
                    setWheelDrive(getWheelDriveOptions(carEntryDTO.wheelDrive));
                    setOwner(carEntryDTO.owner);
                    setLocationGeoPoint(initialGeoData.find(geoPoint => geoPoint.pointName === carEntryDTO.locationName) ?? null);
                    setLocationRegion(carEntryDTO.locationRegion);
                }
            };

            fetchData();
        }
    }, [userId, requestCode, initialGeoData]);

    const getGearboxOptions = (gearboxTypes: GearboxType[]): { label: string; value: GearboxType }[] => {
        return gearBoxOptions.filter(option => gearboxTypes.includes(option.value));
    };


    const getTypeOfFuelOptions = (typeOfFuels: TypeOfFuel[]): { label: string; value: TypeOfFuel }[] => {
        return typeOfFuelOptions.filter(option => typeOfFuels.includes(option.value));
    };

    const getWheelDriveOptions = (wheelDrives: WheelDrive[]): { label: string; value: WheelDrive }[] => {
        return wheelDriveOptions.filter(option => wheelDrives.includes(option.value));
    };

    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [selectedModels, setSelectedModels] = useState<string[]>([]);
    const [selectedBrandsExclude, setSelectedBrandsExclude] = useState<string[]>([]);
    const [selectedModelsExclude, setSelectedModelsExclude] = useState<string[]>([]);
    const [models, setModels] = useState<string[]>([]);
    const [modelsExclude, setModelsExclude] = useState<string[]>([]);
    const [mileageFrom, setMileageFrom] = useState<number | null>(null);
    const [mileageTo, setMileageTo] = useState<number | null>(null);
    const [yearFrom, setYearFrom] = useState<number | null>(null);
    const [yearTo, setYearTo] = useState<number | null>(null);
    const [priceFrom, setPriceFrom] = useState<number | null>(null);
    const [priceTo, setPriceTo] = useState<number | null>(null);
    const [horsePowerFrom, setHorsePowerFrom] = useState<number | null>(null);
    const [horsePowerTo, setHorsePowerTo] = useState<number | null>(null);
    const [volumeOfEngineFrom, setVolumeOfEngineFrom] = useState<number | null>(null);
    const [volumeOfEngineTo, setVolumeOfEngineTo] = useState<number | null>(null);
    const [showBroken, setShowBroken] = useState<ShowBroken>(ShowBroken.BROKEN_AND_NOT_BROKEN);
    const [gearboxValues, setGearboxValues] = useState<typeof gearBoxOptions[0][]>([]);
    const [typeOfFuel, setTypeOfFuel] = useState<typeof typeOfFuelOptions[0][]>([]);
    const [wheelLocation, setWheelLocation] = useState<WheelLocation[]>([]);
    const [wheelDrive, setWheelDrive] = useState<typeof wheelDriveOptions[0][]>([]);
    const [owner, setOwner] = useState<Owner[]>([]);
    const [locationRegion, setLocationRegion] = useState<string | null>(null);
    const [locationGeoPoint, setLocationGeoPoint] = useState<GeoPoint | null>(null);
    const [locationRadius, setLocationRadius] = React.useState(locationRadiusOptions[0]);
    const dataForLastTime = DataForLastTime.MINUTES_5;


    // MODALS HANDLER
    const [wheelDriveModalOpen, setWheelDriveModalOpen] = useState(false);
    const wheelDriveOpen = () => setWheelDriveModalOpen(true);
    const wheelDriveClose = () => setWheelDriveModalOpen(false);
    const [gearBoxModalOpen, setGearBoxModalOpen] = useState(false);
    const gearBoxOpen = () => setGearBoxModalOpen(true);
    const gearBoxClose = () => setGearBoxModalOpen(false);
    const [typeOfFuelModalOpen, setTypeOfFuelModalOpen] = useState(false)
    const typeOfFuelOpen = () => setTypeOfFuelModalOpen(true);
    const typeOfFuelClose = () => setTypeOfFuelModalOpen(false);
    const [locationModalOpen, setLocationModalOpen] = useState(false)
    const locationOpen = () => setLocationModalOpen(true);
    const locationClose = () => setLocationModalOpen(false);
    const [marksModalOpen, setMarksModalOpen] = useState(false)
    const marksOpen = () => setMarksModalOpen(true);
    const marksClose = () => setMarksModalOpen(false);
    const [modelsModalOpen, setModelsModalOpen] = useState(false)
    const modelsOpen = () => setModelsModalOpen(true);
    const modelsClose = () => setModelsModalOpen(false);
    const [marksModalExcludeOpen, setMarksModalExcludeOpen] = useState(false)
    const marksExcludeOpen = () => setMarksModalExcludeOpen(true);
    const marksExcludeClose = () => setMarksModalExcludeOpen(false);
    const [modelsModalExcludeOpen, setModelsModalExcludeOpen] = useState(false)
    const modelsExcludeOpen = () => setModelsModalExcludeOpen(true);
    const modelsExcludeClose = () => setModelsModalExcludeOpen(false);



    const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    useEffect(() => {
        const newModels = initialCarData.filter((item: Record<string, any>) => selectedBrands.includes(Object.keys(item)[0])).map(item => Object.values(item)[0]);
        setModels(newModels);
    }, [initialCarData, selectedBrands]);


    useEffect(() => {
        const newModels = initialCarData.filter((item: Record<string, any>) => selectedBrandsExclude.includes(Object.keys(item)[0])).map(item => Object.values(item)[0]);
        setModelsExclude(newModels);
    }, [initialCarData, selectedBrandsExclude]);

    const inputRefFrom = useMask({ mask: '_._', replacement: { _: /\d/ } });
    const inputRef = useMask({ mask: '_._', replacement: { _: /\d/ } });


    const showBrokenChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: ShowBroken,
    ) => {
        setShowBroken(newAlignment);
    };


    const wheelLocationChange = (
        event: React.MouseEvent<HTMLElement>,
        newFormats: WheelLocation[],
    ) => {
        setWheelLocation(newFormats);
    };

    const ownerChange = (
        event: React.MouseEvent<HTMLElement>,
        newFormats: Owner[],
    ) => {
        setOwner(newFormats);
    };

    const handleAccept = async () => {
        const groupedCarData = selectedBrands.length ? groupByBrands(filterCarData(initialCarData, selectedBrands, selectedModels)) : [];
        const groupedCarDataExclude = selectedBrandsExclude.length ? groupByBrands(filterCarData(initialCarData, selectedBrandsExclude, selectedModelsExclude)) : [];
        const carEntryDTO: CarEntryDTO = {
            makeAndModelsIncludeList: groupedCarData,
            makeAndModelsExcludeList: groupedCarDataExclude,
            mileageFrom,
            mileageTo,
            yearFrom,
            yearTo,
            priceFrom,
            priceTo,
            horsePowerFrom,
            horsePowerTo,
            volumeOfEngineFrom,
            volumeOfEngineTo,
            showBroken,
            gearboxType: gearboxValues.map(option => option.value),
            typeOfFuel: typeOfFuel.map(option => option.value),
            wheelLocation,
            wheelDrive: wheelDrive.map(option => option.value),
            owner,
            locationRadius: locationRadius.value,
            locationName: locationGeoPoint?.pointName ?? null,
            locationLat: locationGeoPoint?.pointLat ?? null,
            locationLon: locationGeoPoint?.pointLon ?? null,
            locationRegion,
            dataForLastTime,
            note: null
        };

        try {
            const result = await countRequest(carEntryDTO, userId);
            if (result/720 > 10){
                setOpenSnackbar(true)
            }else {
                carEntryDTO.note = result;
                const add = await addRequest(carEntryDTO, userId);
                console.log('ADD Result:', add);
                 window.Telegram.WebApp.close()
            }


        } catch (error) {
            console.error('Failed to add request:', error);
        }
    };

    const handleChangeTextField = (value: string, setValue: React.Dispatch<React.SetStateAction<number | null>>): void => {
        // Удаляем все символы, кроме цифр и ограничиваем длину до 4 символов
        const cleanedValue = value.replace(/[^\d]/g, '').slice(0, 4);
        const numericValue = cleanedValue ? parseInt(cleanedValue, 10) : null;
        setValue(numericValue);
    };


    const filterCarData = (data: Model[], brands: string[], models: string[]): Model[] => {
        const filteredData = data.filter(item => {
            const [brand, model] = Object.entries(item)[0];
            const brandMatches = brands.length === 0 || brands.includes(brand);
            const modelMatches = models.length === 0 || models.includes(model);

            if (brands.length > 0 && models.length === 0) {
                return brandMatches;
            }

            return brandMatches && modelMatches;
        });

        if (brands.length > 0 && models.length === 0) {
            return brands.map(brand => ({[brand]: ''}));
        }

        return filteredData;
    };

    const groupByBrands = (data: Model[]): BrandWithModels[] => {
        const brandMap: { [key: string]: string[] } = {};
        data.forEach(item => {
            const [brand, model] = Object.entries(item)[0];
            if (!brandMap[brand]) {
                brandMap[brand] = [];
            }
            brandMap[brand].push(model);
        });

        return Object.keys(brandMap).map(brand => ({
            make: brand,
            models: brandMap[brand].filter(model => model) // Remove any undefined or empty model entries
        }));
    };

    const formatNumber = (number: number | null): string => {
        if (number === null) return '';
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    const handleChangeMileage = (value: string, setValue: React.Dispatch<React.SetStateAction<number | null>>): void => {
        // Удаляем все символы, кроме цифр
        const cleanedValue = value.replace(/[^\d]/g, '');
        const numericValue = cleanedValue ? parseInt(cleanedValue, 10) : null;
        setValue(numericValue);
    };

    return (
            <Stack spacing={1} sx={{ width: '80%'}}>
                <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>Где искать</Typography>
                <TextField
                    size={"small"}
                    id="filled-basic"
                    sx={{width: '100%'}}
                    InputProps={{readOnly: true, disableUnderline: true,
                        endAdornment: (
                            <InputAdornment position="end">
                                <ArrowDropDownIcon />
                            </InputAdornment>
                        ),
                    }}
                    inputProps={{ style: { textAlign: 'center' }}}
                    value={(locationRegion ? locationRegion : '') + ' ' + (locationGeoPoint?.pointName ? locationGeoPoint.pointName : '')}
                    variant="filled"
                    onClick={locationOpen}/>
                <LocationModal
                    open={locationModalOpen}
                    handleClose={locationClose}
                    locationRegion={locationRegion}
                    setLocationRegion={setLocationRegion}
                    locationGeoPoint={locationGeoPoint}
                    setLocationGeoPoint={setLocationGeoPoint}/>
                {locationRegion !== null && (
                <Autocomplete
                    sx={{ marginBottom: 1 }}
                    options={locationRadiusOptions}
                    value={locationRadius}
                    getOptionLabel={(option) => option.label}
                    isOptionEqualToValue={(option, value) => option.value === value.value}
                    onChange={(event: SyntheticEvent<Element, Event>, value: { label: string, value: LocationRadius } | null) => {
                        setLocationRadius(value === null ? locationRadiusOptions[0] : value);
                    }}
                    renderInput={(params) => (
                        <TextField {...params}
                                   size="small"
                                   variant="outlined"
                                   label="Радиус поиска"
                        />
                    )}
                />
                )}

                                <Paper elevation={3} style={{ position: 'relative', marginBottom: '10px', padding: '4px'}}>
                                    <Typography variant="subtitle1" >Включает в поиск</Typography>
                                    <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>Марка</Typography>
                                            <TextField
                                                size={"small"}
                                                id="filled-basic"
                                                sx={{width: '100%'}}
                                                InputProps={{readOnly: true, disableUnderline: true,
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <ArrowDropDownIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                inputProps={{ style: { textAlign: 'center' }}}
                                                value={selectedBrands}
                                                variant="filled"
                                                onClick={marksOpen}/>
                                            <MarksModal open={marksModalOpen} handleClose={marksClose} selectedBrands={selectedBrands} setSelectedBrands={setSelectedBrands}/>
                                            {selectedBrands.length>0 && (
                                                <>
                                                <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>Модель</Typography>
                                                <TextField
                                                size={"small"}
                                                id="filled-basic"
                                                sx={{width: '100%'}}
                                                InputProps={{
                                                readOnly: true,
                                                disableUnderline: true,
                                                endAdornment: (
                                                <InputAdornment position="end">
                                                <ArrowDropDownIcon />
                                                </InputAdornment>
                                                ),}}
                                                inputProps={{ style: { textAlign: 'center' }}}
                                                value={selectedModels}
                                                variant="filled"
                                                onClick={modelsOpen}/>
                                                <ModelsModal
                                                    open={modelsModalOpen}
                                                    handleClose={modelsClose}
                                                    models={models}
                                                    selectedModels={selectedModels}
                                                    setSelectedModels={setSelectedModels}/>
                                                </>)}
                                </Paper>

                                <Paper elevation={3} style={{ position: 'relative', marginBottom: '10px', padding: '4px'}}>
                                    <Typography variant="subtitle1" >Исключить из поиска</Typography>
                                    <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>Марка</Typography>
                                    <TextField
                                        size={"small"}
                                        id="filled-basic"
                                        sx={{width: '100%'}}
                                        InputProps={{readOnly: true, disableUnderline: true,
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <ArrowDropDownIcon />
                                                </InputAdornment>
                                            ),
                                        }}
                                        inputProps={{ style: { textAlign: 'center' }}}
                                        value={selectedBrandsExclude}
                                        variant="filled"
                                        onClick={marksExcludeOpen}/>
                            <MarksModalExclude open={marksModalExcludeOpen} handleClose={marksExcludeClose} selectedBrands={selectedBrandsExclude} setSelectedBrands={setSelectedBrandsExclude}/>
                                    {selectedBrandsExclude.length >0 && (
                                        <>
                                            <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>Модель</Typography>
                                            <TextField
                                                size={"small"}
                                                id="filled-basic"
                                                sx={{width: '100%'}}
                                                InputProps={{
                                                    readOnly: true,
                                                    disableUnderline: true,
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <ArrowDropDownIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                                inputProps={{ style: { textAlign: 'center' }}}
                                                value={selectedModelsExclude}
                                                variant="filled"
                                                onClick={modelsExcludeOpen}/>
                                            <ModelsModalExclude open={modelsModalExcludeOpen} handleClose={modelsExcludeClose} models={modelsExclude} selectedModels={selectedModelsExclude} setSelectedModels={setSelectedModelsExclude}/>
                                        </>
                                    )}
                        </Paper>
                                <div>
                                    <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>Пробег, км</Typography>
                                    <Stack direction={"row"} spacing={1} alignItems="center">
                                        <TextField size={"small"}
                                                   sx={{width: '45%'}}
                                                   id="outlined-basic"
                                                   label="от"
                                                   variant="outlined"
                                                   value={mileageFrom !== null ? formatNumber(mileageFrom) : ''}
                                                   inputMode={"decimal"}
                                                   onChange={event => handleChangeMileage(event.target.value, setMileageFrom)}
                                                   InputLabelProps={{ shrink: mileageFrom !== null }}
                                        />
                                        <TextField size={"small"}
                                                   sx={{width: '45%'}}
                                                   id="outlined-basic"
                                                   label="до"
                                                   value={mileageTo !== null ? formatNumber(mileageTo) : ''}
                                                   variant="outlined"
                                                   inputMode={"decimal"}
                                                   onChange={event => handleChangeMileage(event.target.value, setMileageTo)}
                                                   InputLabelProps={{ shrink: mileageTo !== null }}
                                        />
                                    </Stack>
                                </div>

                                <div>
                                    <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>Год выпуска</Typography>
                                    <Stack direction={"row"} spacing={1} alignItems="center">
                                        <TextField size={"small"}
                                                   sx={{width: '45%'}}
                                                   id="outlined-basic"
                                                   label="от"
                                                   variant="outlined"
                                                   value={yearFrom}
                                                   inputMode={"numeric"}
                                                   onChange={event => handleChangeTextField(event.target.value, setYearFrom)}
                                                   InputLabelProps={{ shrink: yearFrom !== null }}

                                        />
                                        <TextField size={"small"}
                                                   sx={{width: '45%'}}
                                                   id="outlined-basic"
                                                   label="до"
                                                   value={yearTo}
                                                   variant="outlined"
                                                   inputMode={"numeric"}
                                                   onChange={event => handleChangeTextField(event.target.value, setYearTo)}
                                                   InputLabelProps={{ shrink: yearTo !== null }}
                                        />
                                    </Stack>
                                </div>

                                <div>
                                    <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>Цена, ₽</Typography>
                                    <Stack direction={"row"} spacing={1} alignItems="center">
                                        <TextField size={"small"}
                                                   sx={{width: '45%'}}
                                                   id="outlined-basic"
                                                   label="от"
                                                   variant="outlined"
                                                   value={priceFrom !== null ? formatNumber(priceFrom) : ''}
                                                   inputMode={"decimal"}
                                                   onChange={event => handleChangeMileage(event.target.value, setPriceFrom)}
                                                   InputLabelProps={{ shrink: priceFrom !== null }}/>
                                        <TextField size={"small"}
                                                   sx={{width: '45%'}}
                                                   id="outlined-basic"
                                                   label="до"
                                                   value={priceTo !== null ? formatNumber(priceTo) : ''}
                                                   inputMode={"decimal"}
                                                   onChange={event => handleChangeMileage(event.target.value, setPriceTo)}
                                                   variant="outlined"
                                                   InputLabelProps={{ shrink: priceTo !== null }}/>
                                    </Stack>
                                </div>



                                <div>
                                    <Stack direction={"row"} spacing={1} alignItems="center">
                                        <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>Состояние</Typography>
                                        <ToggleButtonGroup
                                            color="primary"
                                            value={showBroken}
                                            exclusive
                                            onChange={showBrokenChange}
                                            aria-label="Platform">
                                            <ToggleButton size={"small"} value={ShowBroken.BROKEN_AND_NOT_BROKEN}>Все</ToggleButton>
                                            <ToggleButton size={"small"} value={ShowBroken.ONLY_NOT_BROKEN}>Целые</ToggleButton>
                                            <ToggleButton size={"small"} value={ShowBroken.ONLY_BROKEN}>Битые</ToggleButton>
                                        </ToggleButtonGroup>
                                    </Stack>

                                </div>

                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'left' }}>Трансмиссия</Typography>
                <div>
                    <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>Коробка передач</Typography>
                    <TextField
                        size={"small"}
                        id="filled-basic"
                        sx={{width: '100%'}}
                        InputProps={{readOnly: true, disableUnderline: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <ArrowDropDownIcon />
                                </InputAdornment>
                            ),
                        }}
                        inputProps={{ style: { textAlign: 'center' }}}
                        value={gearboxValues.map(item => ' '+item.label)}
                        variant="filled"
                        onClick={gearBoxOpen}/>
                    <GearBoxModal open={gearBoxModalOpen} handleClose={gearBoxClose} gearBoxType={gearboxValues}  setGearBoxType={setGearboxValues}/>
                </div>
                <div>
                    <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>Привод</Typography>
                    <TextField
                        size={"small"}
                        id="filled-basic"
                        sx={{width: '100%'}}
                        InputProps={{readOnly: true, disableUnderline: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <ArrowDropDownIcon />
                                </InputAdornment>
                            ),
                        }}
                        inputProps={{ style: { textAlign: 'center' }}}
                        value={wheelDrive.map(item => ' '+item.label)}
                        variant="filled"
                        onClick={wheelDriveOpen}/>
                    <WheelDriveModal open={wheelDriveModalOpen} handleClose={wheelDriveClose} wheelDrive={wheelDrive}  setWheelDrive={setWheelDrive}/>
                </div>

                <Typography variant="h6" sx={{ fontWeight: 'bold', textAlign: 'left' }}>Двигатель</Typography>

                <div>
                    <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>Тип</Typography>
                    <TextField
                        size={"small"}
                        id="filled-basic"
                        fullWidth
                        InputProps={{
                            readOnly: true,
                            disableUnderline: true,
                            endAdornment: (
                                <InputAdornment position="end">
                                    <ArrowDropDownIcon />
                                </InputAdornment>
                            ),
                        }}
                        inputProps={{ style: { textAlign: 'center' }}}
                        value={typeOfFuel.map(item => ' '+item.label)}
                        variant="filled"
                        onClick={typeOfFuelOpen}/>
                    <TypeOfFuelModal open={typeOfFuelModalOpen} handleClose={typeOfFuelClose} typeOfFuel={typeOfFuel}  setTypeOfFuel={setTypeOfFuel}/>
                </div>

                <div>
                    <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>Мощность, л.с.</Typography>
                    <Stack direction={"row"} spacing={1} alignItems="center">
                        <TextField size={"small"}
                                   sx={{width: '45%'}}
                                   id="outlined-basic"
                                   label="от"
                                   variant="outlined"
                                   value={horsePowerFrom}
                                   inputMode={"numeric"}
                                   onChange={event => handleChangeTextField(event.target.value, setHorsePowerFrom)}
                                   InputLabelProps={{ shrink: horsePowerFrom !== null }}
                        />
                        <TextField size={"small"}
                                   sx={{width: '45%'}}
                                   id="outlined-basic"
                                   label="до"
                                   value={horsePowerTo}
                                   variant="outlined"
                                   inputMode={"numeric"}
                                   onChange={event => handleChangeTextField(event.target.value, setHorsePowerTo)}
                                   InputLabelProps={{ shrink: horsePowerTo !== null }}
                        />
                    </Stack>
                </div>

                <div>
                    <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>Объём двигателя</Typography>
                    <Stack direction={"row"} spacing={1} alignItems="center">
                        <TextField
                            size={"small"}
                            sx={{width: '45%'}}
                            id="outlined-basic"
                            label="от"
                            inputRef={inputRefFrom}
                            value={volumeOfEngineFrom}
                            variant="outlined"
                            inputMode="decimal"
                            onChange={event => setVolumeOfEngineFrom(parseFloat(event.target.value))}
                            InputLabelProps={{ shrink: volumeOfEngineFrom !== null }}
                        />
                        <TextField
                            size={"small"}
                            sx={{width: '45%'}}
                            id="outlined-basic"
                            label="до"
                            inputRef={inputRef}
                            value={volumeOfEngineTo}
                            variant="outlined"
                            inputMode="decimal"
                            onChange={event => setVolumeOfEngineTo(parseFloat(event.target.value))}
                            InputLabelProps={{ shrink: volumeOfEngineTo !== null }}
                            />
                    </Stack>
                </div>

                                <Stack direction={"row"} spacing={1} alignItems="center">
                                    <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>Руль</Typography>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={wheelLocation}
                                        onChange={wheelLocationChange}
                                        aria-label="text formatting">
                                        <ToggleButton size={"small"} value={WheelLocation.LEFT}>Левый</ToggleButton>
                                        <ToggleButton size={"small"} value={WheelLocation.RIGHT}>Правый</ToggleButton>
                                    </ToggleButtonGroup>
                                </Stack>

                                <Stack direction={"row"} spacing={1} alignItems="center">
                                    <Typography sx={{ fontWeight: 'bold', textAlign: 'left' }}>Продавец</Typography>
                                    <ToggleButtonGroup
                                        color="primary"
                                        value={owner}
                                        onChange={ownerChange}
                                        aria-label="text formatting">
                                        <ToggleButton size={"small"} value={Owner.PRIVATE}>Собственник</ToggleButton>
                                        <ToggleButton size={"small"} value={Owner.DEALER}>Компания</ToggleButton>
                                    </ToggleButtonGroup>
                                </Stack>
                                <Button sx={{marginBottom: '10px'}} variant="outlined" onClick={handleAccept}>Запустить</Button>
                                <Divider/>
                                <Snackbar
                                    open={openSnackbar}
                                    autoHideDuration={6000}
                                    onClose={handleClose}
                                    message="Слишком широкий запрос, укажите больше параметров"
                                />
                            </Stack>
    );
}
export default Home