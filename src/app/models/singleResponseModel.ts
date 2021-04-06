import { ResponceModel } from "./responseModel";

export interface SingleResponseModel<T> extends ResponceModel{
    data:T
}