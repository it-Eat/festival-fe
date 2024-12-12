import boardList from "@/views/user/board/boardList.vue"
import boardDetail from "@/views/user/board/boardDetail.vue"

export default [
    {
        path: '/user/boardList',
        name: 'boardList',
        component: boardList,
        children: [
            {
                path: '/user/boardList/detail',
                name: 'detail',
                component: boardDetail
            }
        ]
    }
]
