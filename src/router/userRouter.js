import boardList from "@/views/user/board/boardList.vue";
import boardDetail from "@/views/user/board/boardDetail.vue";
import boardWrite from "@/views/user/board/boardWrite.vue";

export default [
    {
        path: '/user/boardList',
        name: 'boardList',
        component: boardList,
        children: [
            {
                path: 'detail',       
                name: 'boardDetail',
                component: boardDetail
            },
            {
                path: 'write',         
                name: 'boardWrite',
                component: boardWrite
            }
        ]
    }
];
