export type ServiceListResponse = {
    id: string;
    service: string;
    action: string;
    name: string;
    price: number;
    condition: string;
    unit: string;
}

export type Service = {
    id?: string;
    service: string;
    action: string;
    name: string;
    price: number;
    condition: string;
    unit: string;
}

export type UpdateServiceRq = {
    service: string;
    action: string;
    name: string;
    price: number;
    condition: string;
    unit: string;
}