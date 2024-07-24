export interface Order {
    id: number,
    productName: string,
    status: OrderStatus | string,
    line: ProductLine | string,
    orderNumber: number,
    quantity: number,
    unit: QuantityUnit | string,
    requestDate: Date | string,
}

export enum OrderStatus {
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