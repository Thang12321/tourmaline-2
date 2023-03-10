import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSong } from '../../services/music';
import * as apis from '../../services';
import * as actions from '../../store/actions';
import { BASE_URL } from '../../utils/constant';
import { icons } from '../../utils/icons';
import { toast } from 'react-toastify';
import { DefaultMenu as SongMenu } from '../Popper';
import Pop from '../../assets/images/Pop.svg';
import moment from 'moment';
import { memo } from 'react';

const {
    BsLink45Deg,
    AiOutlineDownload,
    FaRegComment,
    BsMusicNoteBeamed,
    AiOutlineHeart,
    TfiMicrophoneAlt,
    BsThreeDots,
    AiTwotoneHeart,
    RiShareForwardLine,
    AiFillDelete,
    AiOutlinePlusCircle,
    RiPlayListAddLine,
} = icons;
// TODO: Song list sửa sau
const songMenu = [
    {
        type: 'addToNext',
        icon: <RiPlayListAddLine />,
        title: 'Add to Next up',
        to: '',
    },
    {
        type: '',
        icon: <FaRegComment />,
        title: 'Comments',
        to: '',
    },
    {
        type: '',
        icon: <AiOutlineDownload />,
        title: 'Download',
        to: '',
    },
    {
        type: 'addtoplaylist',

        icon: <AiOutlinePlusCircle />,
        title: 'Add to Playlist',
        to: '',
        // rightIcon: ''
        children: {
            title: 'Playlist',
            data: [
                // Cái này khả năng đưa vào trong component gọi ra thôi
            ],
        },
    },
    {
        icon: <BsLink45Deg />,
        title: 'Copy link',
        to: '',
    },
    {
        icon: <RiShareForwardLine />,
        title: 'Share',
        to: '',
    },
    // {
    //     icon: <AiFillDelete />,
    //     title: 'Delete',
    //     to: '',
    // },
];

function Song({ songData, setSongsUploaded }) {

      const dispatch = useDispatch();
    const { curSongId, isPlaying, curPlaylist } = useSelector((state) => state.music);
    const { token } = useSelector((state) => state.auth);
    const { favoriteSongs } = useSelector((state) => state.favorite);
    const [favorite, setFavorite] = useState(favoriteSongs.indexOf(songData.id) != -1); // lấy trạng thái init từ db truyền vào
    // useEffect(() => {
    //     const fetchCover = async () => {
    //         setSrc(`${BASE_URL}/api/song/getCover?id=${songData.id}`);
    //     };
    //     fetchCover();
    // }, []);
    useEffect(() => {
        curPlaylist.forEach((item) => {
            const obj = {
                id: item.id,
                type: 'playlist',
                to: '',
                icon: '',
                title: item.name,
            };
            !songMenu[3].children.data.some((item) => item.id == obj.id) && songMenu[3].children.data.push(obj);
        });
        const deleteSong = {
            id: songData.id,
            type:'deleteSong',
            to: '',
            icon: <AiFillDelete />,
            title:'Delete'
        }
        songMenu[songMenu.length - 1].type != 'deleteSong' && songMenu.push(deleteSong)
    }, []);
    // Đoạn delete này đưa vào cái songMenu ấy, có phần delete

    const handleAddFavorite = async (e) => {
        e.stopPropagation();
        const prevState = favorite;
        setFavorite((prev) => !prev);
        // Gọi API lưu thông tin favorite song vào db ...
        if (!prevState) {
            const response = await apis.addToFavorite(songData.id, token);
            response.status == 200 && dispatch(actions.setFavorite(songData.id));
        } else {
            const response = await apis.removeFromFavorite(songData.id, token);
            response.status == 200 && dispatch(actions.removeFavorite(songData.id));
        }

        // Show toast
        toast.success(`${!prevState ? 'Added to' : 'Removed form'} favorites`, {
            position: 'top-left',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'dark',
        });
    };

    return (
        <div
            className="group -mx-2 flex w-full cursor-pointer items-center border-b border-solid border-[#ffffff0d] p-[10px] text-[#ffffff80] [&>*]:px-2"
            onClick={() => {
                songData.id !== curSongId && dispatch(actions.setCurSongId(songData.id));
                dispatch(actions.play(true));
            }}
        >
            {/* Left Part */}
            <div className="flex w-1/2 items-center gap-2">
                <div>
                    <BsMusicNoteBeamed />
                </div>
                <div>
                    <img
                        className="h-10 w-10 object-cover"
                        src={`${BASE_URL}/api/song/getCover?id=${songData.id}`}
                        alt="song-cover"
                    />
                </div>
                <div className="flex flex-col gap-[3px]">
                    <span className="text-sm text-white">{songData.name}</span>
                    <span className="text-sm hover:text-[#c273ed] hover:underline">Various artist</span>
                </div>
            </div>
            {/* Content Part */}
            <div className="flex-1 text-sm">
                <p>{songData.description} (Single)</p>
            </div>
            {/* <span className='border border-white p-2' onClick={handleDelete}>
                <AiFillCloseCircle/>
            </span>

            {/* Right Part: time and actions */}
            <div className="flex items-center justify-items-end gap-4 text-sm">
                <span className="hidden items-center justify-center rounded-full p-1.5 text-xl hover:bg-[#ffffff1a] group-hover:flex">
                    <TfiMicrophoneAlt />
                </span>
                <span
                    className="flex items-center justify-center rounded-full p-1.5 text-xl hover:bg-[#ffffff1a]"
                    onClick={handleAddFavorite}
                >
                    {!favorite ? (
                        <AiOutlineHeart className="hidden group-hover:block" />
                    ) : (
                        <AiTwotoneHeart className="text-[#9b4de0] [filter:drop-shadow(0_0_10px_currentColor)]" />
                    )}
                </span>
                <SongMenu menuList={songMenu} songId={songData?.id}>
                    <span
                        onClick={(e) => e.stopPropagation()}
                        className="hidden rounded-full p-1.5 text-xl hover:bg-[#ffffff1a] group-hover:flex"
                    >
                        <BsThreeDots />
                    </span>
                </SongMenu>
                <span className="block items-center justify-center group-hover:hidden">
                    {moment.utc((songData?.duration || 0) * 1000).format('mm:ss')}
                </span>
            </div>
        </div>
    );
}

export default memo(Song);
