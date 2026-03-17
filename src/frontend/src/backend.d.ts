import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Response {
    scores: Array<bigint>;
    group: Group;
}
export interface Averages {
    totalEntries: bigint;
    questionAverages: Array<number>;
}
export enum Group {
    groupA = "groupA",
    groupB = "groupB"
}
export interface backendInterface {
    getAllResponses(): Promise<Array<Response>>;
    getAveragesByGroup(group: Group): Promise<Averages>;
    getResponsesByGroup(group: Group): Promise<Array<Response>>;
    submitResponse(group: Group, scores: Array<bigint>): Promise<void>;
}
