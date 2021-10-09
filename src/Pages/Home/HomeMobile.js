import React, { useEffect } from 'react'
import HomeMenu from './HomeMenu/HomeMenu'
import { useSelector, useDispatch } from 'react-redux'
import MovieList from './MovieList/MovieList'
import { getMovieAction } from '../../Redux/actions/getMovieAction';
import { layDanhSachHeThongRapAction } from '../../Redux/actions/QuanLyRapAction';
import Banner from '../../Components/Banner/Banner'
import Events from './Events/Events'
import Subscribe from './Subscribe/Subscribe'
import ScrollToTop from '../../Components/BackToTop/BackToTop'

export default function HomeMobile() {
    const { arrMovie } = useSelector(state => state.MovieReducer);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const action = getMovieAction()
        dispatch(action)
       
    })

    return (
        <div className="home__page" >
            <div >
                <Banner />

            </div>

            <div >
                <div className=" px-5 py-24 mx-auto movie">
                    <div className="container">
                        <MovieList arrMovie={arrMovie} />
                    </div>

                </div>
            </div>


           

            <div >
                <div className=" px-5 pt-24  pb-60 mx-auto movie">
                    <div className="container">
                        <Events arrMovie={arrMovie} />
                    </div>

                </div>
            </div>
            <div className="rapChieu">
                <div className="container">
                    <Subscribe/>
                </div>
            </div>
            <ScrollToTop/>
        </div>
    )
}
