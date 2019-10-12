export interface ITwitchGame {
    id: string,
    name: string,
    "box_art_url": string
};

export default interface ITwitchGameResponse {
    data: ITwitchGame[];
}