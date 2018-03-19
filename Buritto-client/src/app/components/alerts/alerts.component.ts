import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { AlertService } from '../../_services/alert.service';

@Component({
	selector: 'app-alerts',
	templateUrl: './alerts.component.html',
	styleUrls: ['./alerts.component.css']
})

export class AlertsComponent implements OnDestroy {

	private subscription: Subscription;
	message: any;

	constructor( private alertService: AlertService ) { 

		this.subscription = alertService.getMessage()
			.subscribe( 
				message => { 
					this.message = message; 
				}
			);

	}

	ngOnDestroy(): void {

		this.subscription.unsubscribe();

	}

}

