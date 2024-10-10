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
    AMT = "AMT"
}

export enum TypeOfFuel {
    PETROL = "PETROL",
    DIESEL = "DIESEL",
    HYBRID = "HYBRID",
    ELECTRIC = "ELECTRIC",
    GAS  = "GAS"
}

export enum WheelLocation {
    LEFT = "LEFT",
    RIGHT  = "RIGHT"
}

export enum WheelDrive {
    FWD = "FWD",
    AWD  = "AWD",
    RWD = "RWD"
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
    mileageFrom: number | null;
    mileageTo: number | null;
    yearFrom: number | null;
    yearTo: number | null;
    priceFrom: number | null;
    priceTo: number | null;
    horsePowerFrom: number | null;
    horsePowerTo: number | null;
    volumeOfEngineFrom: number | null;
    volumeOfEngineTo: number | null;
    showBroken: ShowBroken;
    gearboxType: GearboxType[];
    typeOfFuel: TypeOfFuel[];
    wheelLocation: WheelLocation[];
    wheelDrive: WheelDrive[];
    owner: Owner[];
    locationLat: number | null;
    locationLon: number | null;
    locationRadius: LocationRadius;
    locationName: string | null;
    locationRegion: string | null;
    dataForLastTime: DataForLastTime;
    note: string | null;
}

export const locationRadiusOptions=[
    {label: "500 км.", value: LocationRadius.KM_500},
    {label: "1000 км.", value: LocationRadius.KM_1000}
];


export const gearBoxOptions = [
    { label: "Механическая", value: GearboxType.MT },
    { label: "Автомат", value: GearboxType.AT },
    { label: "Вариатор", value: GearboxType.CVT },
    { label: "Робот", value: GearboxType.AMT }
];

export const wheelDriveOptions = [
    { label: "Передний", value: WheelDrive.FWD },
    { label: "Задний", value: WheelDrive.RWD },
    { label: "Полный", value: WheelDrive.AWD }
];

export const typeOfFuelOptions = [
    { label: "Бензин", value: TypeOfFuel.PETROL },
    { label: "Дизель", value: TypeOfFuel.DIESEL },
    { label: "Газ", value: TypeOfFuel.GAS },
    { label: "Гибрид", value: TypeOfFuel.HYBRID },
    { label: "Электромобиль", value: TypeOfFuel.ELECTRIC }
];