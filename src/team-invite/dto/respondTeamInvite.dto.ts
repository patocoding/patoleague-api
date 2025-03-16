import { IsIn, IsNotEmpty } from 'class-validator';

export class RespondTeamInviteDto {
  @IsNotEmpty()
  @IsIn(['accepted', 'declined'])
  response: 'accepted' | 'declined';
}
