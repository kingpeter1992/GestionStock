import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MsgService } from '../../../../Shared/Directives/toast/msg-service';
import { StorageAuth } from '../../../../Core/Storage-auth/storage-auth';
import { Utilisateur } from '../../../../Core/Services/user/utilisateur';

@Component({
  selector: 'app-details',
  standalone: false,
  templateUrl: './details.html',
  styleUrl: './details.css'
})
export class Details implements OnInit {

  username!: string;
  user: any;
  loading = false;
  result: any;

  constructor(private _dao:Utilisateur,
    private tokenStorage:StorageAuth,
    private route: ActivatedRoute,
    private toast:MsgService){
  }
  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username')!;
    this.detailLoarUser()
  }


  detailLoarUser() {
    this.user = this.tokenStorage.getUser()
    console.log(this.user)
    this._dao.getUser(this.user.username).subscribe(resp=>{
      this.user = resp
      this.result = this.user.username.toUpperCase();

    })

  }

}
