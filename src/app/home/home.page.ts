import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

import { CharacterService } from './../provider/character.service';
import { PaginationComponent } from '../util/pagination/pagination.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public characters = [];

  public filtro = {
    descricao: '',
    bkp: ''
  };


  public pagination = new PaginationComponent();
  public checking = true;

  constructor(private characterServices: CharacterService, private navCtrl: NavController, private storage: Storage){

    this.pagination.setLimit(10);
    this.getAllCharacters();

    this.storage.create().then(_=>{
      this.storage.set('botao-1', 'Primeiro botão');
      this.storage.set('botao-2', 'Segundo botão');
    });
  }

  public getAllCharacters(){

    this.checking = true;

    if(this.filtro.descricao !== this.filtro.bkp){
      this.pagination.reset();
    }

    this.characterServices.getAllCharacters(this.pagination, this.filtro.descricao).then((characters: any) => {
      this.filtro.bkp = this.filtro.descricao;
      this.characters = [];
      this.characters = characters;
      this.checking = false;
    });

  }

  public goDetails(character: any){
    this.navCtrl.navigateForward('character', {
      queryParams: {id : character.id}
    });

  }

    public goFirstPage(){
      this.pagination.setCurrentPage(1);
      this.getAllCharacters();
  }

  public goLastPage(){
      this.pagination.setCurrentPage(this.pagination.getPages()[this.pagination.getPages().length - 1]);
      this.getAllCharacters();
  }

  public goPreviousPage(){
      this.pagination.setCurrentPage(this.pagination.getCurrentPage() - 1);
      this.getAllCharacters();
  }

  public goNextPage(){
      this.pagination.setCurrentPage(this.pagination.getCurrentPage() + 1);
      this.getAllCharacters();
  }

  public goPage(page: number){
      this.pagination.setCurrentPage(page);
      this.getAllCharacters();
  }

  public showPrimeiroBotao(){
    this.storage.get('botao-1').then((val) => {
    alert(val);
    });
    }
    public showSegundoBotao(){
    this.storage.get('botao-2').then((val) => {
    alert(val);
    });
    }
    public removeChave(chave: string){
    this.storage.remove(chave).then(ret => {
    alert('Chave removida com sucesso');
    });
    }
}
