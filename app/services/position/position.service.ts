import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Rx';
import { Http, Headers } from 'angular2/http';
import { POSITIONS } from './mock-positions';

export interface Position {
    id: string;
    symbol: string;
    price: number;
    quantity: number;
    commission: number;
    date: Date;
};


@Injectable()
export class PositionService {
    private positions: Position[];
    
    getPositions() :Promise<Position[]>{      
        
        if (this.positions) {
            return Promise.resolve(this.positions);
        }
        
        this.positions = POSITIONS;
        return Promise.resolve(this.positions);
    }

    addPosition(position:Position) {
        this.positions.push(position);
    }
    
    removePosition(position:Position) {
        var i = this.positions.indexOf(position);
        
        if(i >= 0)
            this.positions.splice(i, 1);
    }
}

