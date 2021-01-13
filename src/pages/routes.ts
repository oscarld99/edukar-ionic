import { AppPage } from "../interfaces/settings";
import { newspaper, barChart } from 'ionicons/icons';
import Examenes from './examenes/examenes'

export const appPages: AppPage[] = [
  {
    title: 'Examenes',
    url: '/page/examenes',
    mdIcon: newspaper,
    Component: Examenes
  }, {
    title: 'Notas',
    url: '/page/notas',
    mdIcon: barChart,
    Component: Examenes
  }
];
