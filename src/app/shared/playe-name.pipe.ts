import { Pipe, PipeTransform } from '@angular/core';
import { Player } from './player';

@Pipe({
  name: 'playeName',
})
export class PlayeNamePipe implements PipeTransform {
  transform(player: Player): string {
    return player.name;
  }
}
