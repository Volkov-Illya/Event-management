import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'ageList'})
export class AgeList implements PipeTransform {

	transform( value, args ) : any {

		let res = [];

		for ( let i = args; i <= value; i ++ ) {

			res.push( i );

		}

		return res;

	}

}
