import { NgModule, Injectable } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Http, Response} from '@angular/http';
import {dataNodeTree} from '../../nodeTree/dataNodeTree';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: []
})

@Injectable()

export class NodeServiceModule {
  
  constructor(private http: Http) {}

    getFilesystem() {
        return this.http.get('src/app/nodeTree/filesystem.json')
                    .toPromise()
                    .then(res => <dataNodeTree[]> res.json().data);
    }

}


