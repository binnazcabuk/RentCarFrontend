import { ResponceModel } from "./responseModel";

export interface ListResponseModel<T> extends ResponceModel{
    data:T[];
}