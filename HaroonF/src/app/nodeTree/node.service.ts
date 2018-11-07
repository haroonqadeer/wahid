import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';
import {TreeNode} from '../nodeTree/TreeNode';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(private http: Http) {}

  getFileSystem() {
    return this.http.get('/assets/mock/data/data-file.json')
    .toPromise()
    .then(res => <TreeNode[]> res.json().data)
    .then(data => { return data; });
  }
}
