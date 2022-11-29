import Profile from '~/pages/Profile';
import OnlyBodyLayout from '../layouts/OnlyBody';
import Contact from '../pages/Contact';
import Login from '../pages/Login';
import MainScreen from '../pages/MainScreen';
import Player from '../pages/Player';
import Upload from '../pages/Upload';
import Library from '../pages/Library'
import { routesConfigPrivate, routesConfigPublic } from './routesConfig';
export const publicRoutes = [

    {
        path: routesConfigPublic.playerRoute,
        page: Player,
    },

    {
        path: routesConfigPublic.libraryRoute,
        page: Library,
    },


    {
        path: routesConfigPublic.STAR,
        page: MainScreen,
    },
];
export const privateRoute = [
    {
        path: routesConfigPrivate.contact,
        page: Contact,
        layout: OnlyBodyLayout,
    },
    {
        path: routesConfigPrivate.profileRoute,
        page: Profile,
    },
    {
        path: routesConfigPrivate.uploadRoute,
        page: Upload,
    },
];
