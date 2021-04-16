

export interface Emprunt {
  id: string;
  jours: number;
  /**
   * status = 0 : emrpunté
   * status = 1 : non emrpunté
   */
  status: number;
  type: string;
  marque: string;
  modele: string;
  description: string;
  datedebut: string;
  datefin: string;
}
