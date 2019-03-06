import { Router, routePrefix, route, HttpMethods } from 'anux-exchange';
import { IBenefit } from '../../shared/models';

@routePrefix('/benefits')
export class Benefits extends Router {

  @route(HttpMethods.Get, '/')
  public async get() {
    return this.list<IBenefit>([
      { id: Math.uniqueId(), numberOfStars: 1, title: 'One monster game' },
      { id: Math.uniqueId(), numberOfStars: 2, title: 'One monster game' },
      { id: Math.uniqueId(), numberOfStars: 3, title: 'One monster game' },
      { id: Math.uniqueId(), numberOfStars: 3, title: 'Come downstairs after bathtime' },
    ]);
  }

}
