export interface BrandWithModels{
    make: string;
    models: string[]
}

export enum ShowBroken {
    ONLY_BROKEN = "ONLY_BROKEN",
    ONLY_NOT_BROKEN = "ONLY_NOT_BROKEN",
    BROKEN_AND_NOT_BROKEN = "BROKEN_AND_NOT_BROKEN"
}

export enum GearboxType {
    AT = "AT",
    MT = "MT",
    CVT = "CVT",
    AMT = "AMT",
    NO_GEAR  = "NO_GEAR"
}

export enum TypeOfFuel {
    PETROL = "PETROL",
    DIESEL = "DIESEL",
    HYBRID = "HYBRID",
    ELECTRIC = "ELECTRIC",
    GAS  = "GAS",
    UNDEFINED   = "UNDEFINED"
}

export enum WheelLocation {
    LEFT = "LEFT",
    RIGHT  = "RIGHT"
}

export enum WheelDrive {
    FWD = "FWD",
    AWD  = "AWD",
    RWD = "RWD",
    UNDEFINED   = "UNDEFINED"
}

export enum Owner {
    PRIVATE = "PRIVATE",
    DEALER  = "DEALER"
}

export enum LocationRadius {
    KM_500 = "KM_500",
    KM_1000   = "KM_1000"
}

export enum DataForLastTime {
    MINUTES_1  = "MINUTES_1",
    MINUTES_2   = "MINUTES_2",
    MINUTES_5 = "MINUTES_5",
    MINUTES_10   = "MINUTES_10",
    MINUTES_20 = "MINUTES_20",
    MINUTES_30   = "MINUTES_30"
}


export interface CarEntryDTO{
    makeAndModelsIncludeList: BrandWithModels[];
    makeAndModelsExcludeList: BrandWithModels[];
    mileageFrom: number;
    mileageTo: number;
    yearFrom: number;
    yearTo: number;
    priceFrom: number;
    priceTo: number
    horsePowerFrom: number;
    horsePowerTo: number;
    volumeOfEngineFrom: number;
    volumeOfEngineTo: number;
    showBroken: ShowBroken;
    gearboxType: GearboxType[];
    typeOfFuel: TypeOfFuel[];
    wheelLocation: WheelLocation[];
    wheelDrive: WheelDrive[];
    owner: Owner[];
    locationLat: number;
    locationLon: number;
    locationRadius: LocationRadius;
    locationName: string;
    locationRegion: string;
    dataForLastTime: DataForLastTime;
}

export const gearBoxOptions = [
    { label: "Механическая", value: GearboxType.MT },
    { label: "Автомат", value: GearboxType.AT },
    { label: "Вариатор", value: GearboxType.CVT },
    { label: "Робот", value: GearboxType.AMT },
    { label: "Без коробки", value: GearboxType.NO_GEAR }
];

export const typeOfFuelOptions = [
    { label: "Бензин", value: TypeOfFuel.PETROL },
    { label: "Дизель", value: TypeOfFuel.DIESEL },
    { label: "Газ", value: TypeOfFuel.GAS },
    { label: "Гибрид", value: TypeOfFuel.HYBRID },
    { label: "Электромобиль", value: TypeOfFuel.ELECTRIC },
    { label: "Неизвестно", value: TypeOfFuel.UNDEFINED }
];