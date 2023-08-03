import {Player} from "../game.interfaces";

export type gameInvitation = {
    gameInfo: Player;
    inviterId: number;
    inviterName: string;
    targetId: number;
}