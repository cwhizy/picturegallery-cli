import { Component, OnInit } from '@angular/core';
import { MediaResponse } from '../_models/mediaresponse';
import { AuthenticationService } from '../_services/authentication.service';
import { PhotosService } from '../_services/photos.service';

@Component({ 
    templateUrl: './mainfeed.component.html',
    //styleUrls: ['./mainfeed.component.css'],
    providers: [PhotosService]
})
export class MainfeedComponent implements OnInit {
    
    mediaResponse: MediaResponse;

    constructor(
        private authenticationService: AuthenticationService,        
        private photosService: PhotosService
    ) { }

    ngOnInit() {        
        this.photosService.getPhotos()
        .subscribe( response => {
            console.log(response);
            this.mediaResponse = response;
        }, error => {
            console.log(error);
        });
    }
}