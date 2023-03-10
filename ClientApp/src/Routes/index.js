import Profile from '~/pages/Profile';
import OnlyBodyLayout from '../layouts/OnlyBody';
import Contact from '../pages/Contact';
import MainScreen from '../pages/MainScreen';
import Upload from '../pages/Upload';
import Library from '../pages/Library';
import { routesConfigPrivate, routesConfigPublic } from './routesConfig';
import AllPlaylist from '~/pages/AllPlaylist';
import Search from '../pages/Search'
import PlaylistDetails from '../pages/PlaylistDetails';
import Favorite from '../pages/Favorite'

export const publicRoutes = [
    {
        path: routesConfigPublic.homeRoute,
        page: MainScreen,
    },
    {
        path: routesConfigPublic.libraryRoute,
        page: Library,
    },
    {
        path: routesConfigPublic.playlist__title__pid,
        page: PlaylistDetails
    },
    {
        path: routesConfigPublic.library__playlist,
        page: AllPlaylist
    },
    {
        path: routesConfigPublic.library__playlist__title__pid,
        page: PlaylistDetails
    },
    {
        path: routesConfigPublic.search,
        page: Search
    },
    {
        path: routesConfigPublic.favoritesRoute,
        page: Favorite
    }
    // {
    //     path: routesConfigPublic.STAR,
    //     page: MainScreen,
    // },
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
