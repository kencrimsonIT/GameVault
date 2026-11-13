import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {Game} from '../types/game.types'

export const gameApi = createApi({
    reducerPath: 'gameApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001/',
    }),
    endpoints: (builder) => ({
        getGames: builder.query<Game[], void>({
            query: () => 'games',
        }),
        getGameById: builder.query<Game, number>({
            query: (id) => `games/${id}`,
        }),
    }),
})

export const {useGetGamesQuery, useGetGameByIdQuery} = gameApi