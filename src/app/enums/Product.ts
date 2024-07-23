export interface Product {
    id: number,
    name: string,
    status: ProductStatus,
    line: ProductLine,
    orderNumber: number,
    quantity: number,
    unit: QuantityUnit,
    requestDate: Date,
}

export enum ProductStatus {
    Pending = 'Pending',
    InProgress = 'InProgress',
    Completed = 'Completed'
 }
export enum ProductLine {
    ReadyMix = 'ReadyMix',
    Cement = 'Cement',
    Aggregates = 'Aggregates',
 }
export enum QuantityUnit {
    SquareMeters = 'm3',
    ShortTon = 'TN'
 }