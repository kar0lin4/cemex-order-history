// In a real app I would have an OrderModel interface with enums 
// (to prepare data for API call), 
// and Order interface dedicated for the application data typing purpose

export interface Order {
    id: number,
    productName: string,
    status: OrderStatus | string,
    line: ProductLine | string,
    orderNumber: number,
    quantity: number,
    unit: QuantityUnit | string,
    requestDate: string,
}

export enum OrderStatus {
    Pending = 'Pending',
    InProgress = 'InProgress',
    Completed = 'Completed'
 }
export enum ProductLine {
    ReadyMix = 'Ready Mix',
    Cement = 'Cement',
    Aggregates = 'Aggregates',
    Gravel = 'Gravel',
    Sand = 'Sand',
 }
export enum QuantityUnit {
    SquareMeters = 'm3',
    ShortTon = 'TN'
 }